<div id="shopping-list-popup" class="col-12 p-1" v-cloak>
    <div class="col-12 border border-round mb-1 py-8">
        <div class="row align-items-center">
            <div class="col-2" v-if="product.IMAGE">
                <div class="image-wrapper">
                    <figure class="image-inner">
                        <img :src="product.IMAGE.SMALL" :alt="product.TITLE">
                    </figure>
                </div>
            </div>
            <div class="col">
                <div>{{ product.TITLE }}</div>
                <div class="small-text fw-bold text-gray mt-8" v-if="product.VARIANT_NAME">{{ product.VARIANT_NAME }}</div>
            </div>
            <div class="col-4 text-right" v-if="product.IS_DISPLAY_PRODUCT == 0">
                <div class="text-delete text-gray fw-light" v-if="product.IS_DISCOUNT_ACTIVE == 1 && product.IS_DISPLAY_DISCOUNTED_ACTIVE == 1">
                    <span v-if="product.DISPLAY_VAT == 1">{{ vat(product.PRICE_NOT_DISCOUNTED, product.VAT) }} {{ product.TARGET_CURRENCY }}</span>
                    <span v-else>{{ format(product.PRICE_NOT_DISCOUNTED) }} {{ product.TARGET_CURRENCY }} + KDV</span>
                </div>
                <div class="fw-bold text-primary">
                    <span v-if="product.DISPLAY_VAT == 1">{{ vat(product.PRICE_SELL, product.VAT) }} {{ product.TARGET_CURRENCY }}</span>
                    <span v-else>{{ format(product.PRICE_SELL) }} {{ product.TARGET_CURRENCY }} + KDV</span>
                </div>
            </div>
        </div>
    </div>
    <div class="shopping-list-title mb-1">
        {#add_list#}
    </div>
    <div class="d-flex flex-wrap gap-1">
        <div class="col p-0" v-for="c in categories">
            <input type="checkbox" :id="'shopping-list-' + c.ID" class="form-control shopping-list-check" :checked="c.ADDED == true" @change="change($event, c.ID, product.ID, c.NAME)">
            <label :for="'shopping-list-' + c.ID" :id="'shopping-list-label-' + c.ID" class="d-flex align-items-center fw-regular border border-light bg-light border-round h-100 shopping-list-select">
                <span class="input-checkbox"><i class="ti-check"></i></span>
                {{ c.NAME }}
            </label>
        </div>
    </div>
</div>

<script>
    let DATA = {};
    try {
        DATA = {$DATA};
    } catch (ex) {
        DATA = {}
    }
    const PARAMS = DATA.GET_PRODUCT || DATA.GET_VARIANT ? `${DATA.GET_PRODUCT}-${DATA.GET_VARIANT}` : `${DATA.GET_P1}`;

    const shoppingListPopup = {
        data() {
            return {
                endpoints: {
                    getList: `/srv/service/profile/get-shopping-list/${PARAMS}`,
                    add: '/srv/service/profile/add-to-shopping-list',
                    delete: '/srv/service/profile/delete-shopping-products',
                },
                categories: {},
                product: {},
                data: {},
            }
        },
        methods: {
            format(p) {
                return T.format(p);
            },
            vat(p, vat) {
                return T.vat(p, vat);
            },
            load() {
                const self = this;
                axios.get(self.endpoints.getList).then(response => {
                    const result = response.data;
                    self.data = result;
                    self.categories = result.CATEGORIES;
                    self.product = result.PRODUCTS[0];
                    Array.from(self.categories).forEach(item => {
                        const product = Array.from(item.PRODUCTS).find(x => x.ID == self.product.ID);
                        item.ADDED = product ? true : false;
                    });
                    initComponents();
                }).catch(error => { console.log(error); });
            },
            change(event, catid, pid, name) {
                const self = this,
                      element = event.target;

                if (catid == 1) {
                    favouriteProducts.add(self.product.ID);
                } else {
                    element.checked == true ? self.add(catid, pid, name) : self.delete(catid, pid, name);
                }
            },
            add(catid, pid, name) {
                const self = this,
                      data = new FormData();

                data.append('ids[]', pid + '-' + (DATA.GET_VARIANT ? DATA.GET_VARIANT : 0));
                data.append('fetch', true);
                data.append('cat_id', catid);

                axios.post(self.endpoints.add, data).then(response => {
                    const result = response.data;

                    for(let i=0; i < callbacks.product.wishList.add.length; i++){
                        if(typeof callbacks.product.wishList.add[i] === 'function'){
                            try {
                                callbacks.product.wishList.add[i]?.(result);
                            } catch (error) { console.log(`Product Wishlist Add Callback Error => ${error}`); }
                        }
                    }

                    if (result.status) {
                        T.notify({
                            text: '{#product_added_this_list#}'.replace('%list%', name),
                            className: 'success add-favourite-added-notify',
                            duration: 2500,
                            iconClass : 'ti-thumbs-up',
                        });
                        self.load();
                    } else if (result.statusText == 'NO_MEMBER_SESSION') {
                        window.location.reload();
                    } else {
                        T.modal({
                            html: result.statusText || 'Hata oluştu',
                            width: '300px'
                        })
                    }
                }).catch(error => console.error(`Failed to add product to favorite => ${error}`));

            },
            delete(catid, pid, name) {
                const self = this,
                      category = Array.from(self.data.CATEGORIES).find(x => x.ID == catid),
                      product = Array.from(category.PRODUCTS).find(x => x.ID == pid);

                if (product) {
                    const data = new FormData();
                    data.append('products[]', product.LIST_ID);

                    axios.post(self.endpoints.delete, data).then(response => {
                        const result = response.data;

                        for(let i=0; i < callbacks.product.wishList.remove.length; i++){
                            if(typeof callbacks.product.wishList.remove[i] === 'function'){
                                try {
                                    callbacks.product.wishList.remove[i]?.(result.ids);
                                } catch (error) { console.log(`Product Wishlist Remove Callback Error => ${error}`); }
                            }
                        }

                        if (result.status) {
                            T.notify({
                                text: '{#product_removed_this_list#}'.replace('%list%', name),
                                className: 'danger remove-favourite-product-notify',
                                duration: 2500,
                                iconClass : 'ti-thumbs-up',
                            });
                            self.load();
                        } else if (result.statusText == 'NO_MEMBER_SESSION') {
                            window.location.reload();
                        } else {
                            T.modal({
                                html: result.statusText || 'Hata oluştu',
                                width: '300px'
                            })
                        }
                    }).catch(error => console.error(`Failed to delete product to favorite => ${error}`));
                }
            },
        },
        mounted() {
            this.load();
            initComponents();
        }
    };

    Vue.createApp(shoppingListPopup).mount('#shopping-list-popup');
</script>