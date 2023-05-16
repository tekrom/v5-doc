<div id="order-return-form" v-cloak>
    <form action="/srv/service/order-v5/order-return-save/" 
    ref="orderReturnForm" enctype="multipart/form-data" method="post" @submit.prevent="saveForm" autocomplete="off" class="w-100 p-1 order-return"
    v-if="DATA && DATA.ORDER">
        <input type="hidden" name="order_id"  :value="DATA.ORDER.ID">
        <input type="hidden" name="return_id" :value="DATA.RETURN_DATA.ID">
        <input type="hidden" name="email"     :value="DATA.IS_ACTIVE_RETURN_PROCESS == 1 ? DATA.RETURN_DATA.CUSTOMER_EMAIL : DATA.ORDER.CUSTOMER_EMAIL">
        <div class="row">
            <div class="col-12" v-if="RETURN_PRODUCT">
                <div class="w-100 mb-1">{#return_form_info#}</div>
                <h6>{#products#}</h6>
                <div class="w-100 order-product-list">
                    <div class="w-100 border border-light border-round mb-1" v-show="P.COUNT > 0" v-for="P in DATA.ORDER_PRODUCTS">
                        <div class="d-flex">
                            <div class="col-auto p-0 d-flex">
                                <input type="checkbox" name="product_list[]" :id="'product_list' + P.ID" :value="P.ID" class="form-control order-product-list-select">
                                <label :for="'product_list' + P.ID" class="m-0 fw-regular w-100 d-flex align-items-center p-1">
                                    <span class="input-checkbox flex-shrink-0">
                                        <i class="ti-check"></i>
                                    </span>
                                    <div class="w-100 order-product-list-img">
                                        <div class="image-wrapper border-round overflow-hidden">
                                            <figure class="image-inner">
                                                <img :src="P.IMG" :alt="P.PRODUCT_NAME" class="border-round">
                                            </figure>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <div class="col py-1 d-flex align-items-center">
                                <div class="w-100">
                                    <div class="order-product-list-brand fw-bold" v-if="P.BRAND != ''">{{ P.BRAND }}</div>
                                    <div class="order-product-list-title">{{ P.PRODUCT_NAME }} {{ P.SUBPRODUCT_NAME }}</div>
                                    <div class="order-product-list-count">
                                        <label :for="'product_count_' + P.ID">{#return_amount#}</label>
                                        <select class="form-control w-100" :id="'product_count_' + P.ID" :name="'product_count_' + P.ID">
                                            <option v-for="i in P.COUNT" :value="i">{{ i }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-1">
                            <textarea :id="'product_message_' + P.ID" :name="'product_message_' + P.ID" maxlength="150" placeholder="{#return_description#}" class="form-control order-product-list-message">{{ P.RETURN_DATA.DESCRIPTION }}</textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 order-return-process mb-1" v-if="DATA.RETURN_PROCESS.ID">
                <div class="p-1 bg-light border-round border border-light">
                    <div class="fw-semibold">{{ DATA.RETURN_PROCESS.SUREC }}</div>
                    <div class="text-content">{{ DATA.RETURN_PROCESS.SURECNOTLARI }}</div>
                </div>
            </div>
            <div class="col-12 order-return-form" v-if="RETURN_PRODUCT">
                <div class="row">
                    <div class="col-12 mb-1">
                        <label for="fullname" class="fw-bold">{#fullname#}</label>
                        <div class="w-100 popover-wrapper position-relative">
                            <input id="fullname" type="text" name="fullname" class="form-control form-control-md" :value="DATA.RETURN_DATA.CUSTOMER_NAME" data-validate="required" :value="DATA.RETURN_DATA.CUSTOMER_NAME">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-1">
                        <label for="address" class="fw-bold">{#your_adress#}</label>
                        <div class="w-100 popover-wrapper position-relative">
                            <textarea id="address" name="address" class="form-control form-control-sm" data-validate="required">{{ DATA.RETURN_DATA.CUSTOMER_ADDRESS ? DATA.RETURN_DATA.CUSTOMER_ADDRESS : DATA.ORDER.DELIVERY_ADDRESS.ADDRESS }}</textarea>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-1">
                        <label for="return_reason" class="fw-bold">{#return_iban#}</label>
                        <div class="w-100 popover-wrapper position-relative">
                            <textarea id="return_reason" name="return_reason" class="form-control form-control-sm" data-validate="required"></textarea>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-1" v-if="DATA.RETURN_REASON_TYPES.length > 0">
                        <label for="return_reason_type" class="fw-bold">{#return_reason#}</label>
                        <div class="w-100 popover-wrapper position-relative">
                            <select id="return_reason_type" name="return_reason_type" class="form-control form-control-md" data-validate="required">
                                <option value="">{#choose#}</option>
                                <option v-for="TYPE in DATA.RETURN_REASON_TYPES" :value="TYPE.id" :selected="TYPE.selected == 1">{{ TYPE.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-1" v-if="DATA.SHIPMENT.CARGO_COMPANIES.length > 0 && DATA.SHIPMENT.CREATE_CODE > 0">
                        <label for="cargo_company" class="fw-bold">{#cargo_company#}</label>
                        <div class="w-100 popover-wrapper position-relative">
                            <select id="cargo_company" name="cargo_company" class="form-control form-control-md" data-validate="required">
                                <option value="">{#choose#}</option>
                                <option v-for="CARGO in DATA.SHIPMENT.CARGO_COMPANIES" :value="CARGO.id" :selected="CARGO.id == DATA.RETURN_DATA.CARGO_COMPANY">{{ CARGO.company }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mb-1">
                        <label for="input-file-img" class="fw-bold">{#file#}</label>
                        <div class="w-100 position-relative popover-wrapper">
                            <input type="file" name="img" id="input-file-img" class="form-control" ref="inputfile">
                            <label for="input-file-img" class="form-control form-control-md d-flex align-items-center justify-content-between text-content">
                                <span>{#file#} {#choose#}</span>
                                <i class="ti-picture text-primary"></i>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="w-100 mb-1">
                    <div class="w-100 input-group popover-wrapper">
                        <div class="input-group-prepend">
                            <img :src="CAPTCHA" id="security_code">
                        </div>
                        <input type="text" name="security_code" class="form-control form-control-md" placeholder="{#security_code#}" data-validate="required">
                        <div class="input-group-append" @click="refreshCode">
                            <i class="ti-cw text-primary"></i>
                        </div>
                    </div>
                </div>
                <button type="submit" class="w-100 btn p-md-1 btn-primary">{#return_form_send#}</button>
            </div>
            <div class="col-12" v-else>
                {#order_return_not_product#}
            </div>
        </div>
    </form>
</div>

<script>
    let DATA = {};
    try {
        DATA = {$DATA};
    } catch (ex) {
        DATA = {}
    }

    const orderReturn = {
        data() {
            return {
                DATA:'',
                orderId: DATA.GET_ORDERID,
                orderType: DATA.GET_ORDERMAIL || DATA.GET_ORDERPHONE,
                CAPTCHA: `/SecCode.php?${new Date().getTime()}`,
                RETURN_PRODUCT: '',
            }
        },
        methods: {
            load() {
                const self = this;
                axios.get(`/srv/service/order-v5/order-return/${self.orderId}-${self.orderType}`).then(response => {
                    const result = response.data;
                    self.DATA = result;
                    self.RETURN_PRODUCT = Array.from(self.DATA.ORDER_PRODUCTS).find(x => x.COUNT > 0);
                    setTimeout(() => initComponents(), 150);
                });
            },
            refreshCode() {
                this.CAPTCHA = `/SecCode.php?${new Date().getTime()}`
            },
            saveForm() {
                const self = this;
                const form = self.$refs.orderReturnForm;
    
                if (T('.order-product-list-select:checked').length < 1) {
                    T.notify({
                        text: '{#return_product_select#}',
                        className: 'danger',
                        duration: 3500,
                    });
                    return;
                }
                
                if(!T.checkValidity(form))
                return;
    
                const formData = new FormData(form);
                const type = self.DATA.IS_ACTIVE_RETURN_PROCESS == 1 ? self.DATA.RETURN_DATA.CUSTOMER_EMAIL : self.DATA.ORDER.CUSTOMER_EMAIL;
                axios.post(`${form.action}${self.DATA.ORDER.ID}-${type}`, formData).then(response => {
                    const res = response.data;
                    if(res.status < 1) {
                        if(res.key) {
                            popoverAlert.show(
                                form.querySelector(`input[name="${res.key}"]`), 
                                res.statusText, 
                                3000, 
                                `btn btn-danger no-radius text-left`,
                                true,
                                res.key == 'security_code' ? '' : 'inline'
                            );
                        } else {
                            T.modal({
                                html: res.statusText
                            });
                        }
                    } else {
                        T.notify({
                            text: res.statusText || '{#return_form_ok#}',
                            className: 'success',
                            duration: 3500,
                            iconClass : 'ti-thumbs-up'
                        });
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                    }
                    self.refreshCode();
                });
            }
        },
        mounted() {
            this.load();
        }
    };

    Vue.createApp(orderReturn).mount('#order-return-form');
</script>