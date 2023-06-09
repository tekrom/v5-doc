<div id="collection-list-popup" v-cloak>
    <div class="is-loading" v-if="!load"></div>
    <div class="p-1" v-if="load">
        <div v-show="step == 0">
            <div class="mb-1">
                <div class="block-title mb-1">{#add_collection#}</div>
                <p class="fw-semibold text-gray">{#collection_description#}</p>
            </div>
            <div class="d-flex mb-1">
                <button class="btn btn-outline-primary" @click="step = 1">
                    <i class="ti-plus mr-1"></i>{#add_new_collection#}
                </button>
            </div>
            <div class="collection-list d-flex flex-wrap gap-1" v-if="collections.length > 0">
                <button class="btn btn-outline-light border-secondary text-gray" @click="addProduct(c._id), collectionName = c.name" v-for="c in collections">
                    {{ c.name }}
                </button>
            </div>
        </div>
        <form action="#" method="POST" enctype="multipart/form-data" novalidate autocomplete="off" @submit.prevent="add" v-show="step == 1">
            <div class="mb-2">
                <div class="block-title no-line d-flex align-items-center justify-content-center">
                    <i class="ti-tags bg-light text-primary border-circle mr-1 collection-icon"></i> {#select_collection_name#}
                </div>
            </div>
            <div class="mb-1 popover-wrapper position-relative">
                <input type="text" class="form-control form-control-md" name="name" placeholder="{#collection_name#}" data-validate="required" v-model="collectionName">
            </div>
            <button type="submit" class="w-100 btn btn-primary text-center fw-bold">{#create_collection#}</button>
        </form>
        <div class="collection-success py-2" v-show="step == 2">
            <div class="d-flex align-items-center justify-content-center collection-success-icon">
                <i class="ti-check bg-light text-success border-circle collection-icon"></i>
            </div>
            <div class="text-center">
                <div class="text-success fw-bold collection-success-title">{#product_added_to_collection#}</div>
                <div class="text-gray collection-success-sub-title"> {{ '{#product_added_this_collection#}'.replace('%collection%', collectionName) }}</div>
            </div>
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

    const PRODUCT = {
        ID : DATA.GET_PRODUCT || DATA.GET_P1.split('-')[0] || 0,
        VARIANT : DATA.GET_VARIANT || DATA.GET_P1.split('-')[1] || 0,
    };

    const collectionListPopup = {
        data() {
            return {
                load: false,
                endpoints: {
                    add : '/srv/service/collection/set',
                    remove: '/srv/service/collection/remove/',
                    get : '/srv/service/collection/get/',
                    addProduct : '/srv/service/collection/set-item/',
                },
                product: {
                    id : PRODUCT.ID,
                    variantId : PRODUCT.VARIANT
                },
                collections : [],
                step : 0,
                collectionName : '',
            }
        },
        methods: {
            async get() {
                const self = this;
                await axios.get(self.endpoints.get).then(response => {
                    const result = response.data;
                    self.collections = result.data;
                });
                self.load = true;
            },
            add(formRef) {
                const self = this,
                      form = formRef.target;

                if (!T.checkValidity(form)) return;
                
                const formData = new FormData(form);
                axios.post(self.endpoints.add, formData).then(response => {
                    const result = response.data;
                    self.addProduct(result.data[0]._id);
                });
            },
            addProduct(collection_id) {
                const self = this;
                
                if (!self.product.id) {
                    T.modal({
                        html: '{#product_not_found#}'
                    });
                    return;
                }

                const formData = new FormData();
                formData.append('collection_id', collection_id);
                formData.append('products[]', `${self.product.id}_${self.product.variantId}`);

                axios.post(self.endpoints.addProduct, formData).then(response => {
                    const result = response.data;
                    if (result.status) self.step = 2;
                });
            },
        },
        watch: {
            'step'(value) {
                const self = this;
                if (value == 1) self.collectionName = '';
                initComponents();
            }
        },
        mounted() {
            this.get();
        }
    };

    Vue.createApp(collectionListPopup).mount('#collection-list-popup');
</script>