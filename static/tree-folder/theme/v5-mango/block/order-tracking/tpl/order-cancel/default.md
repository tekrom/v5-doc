<div id="order-cancel-form" class="p-1" v-cloak>
    <h6 class="w-100 fw-regular mb-2">{#order_cancel_text#}</h6>
    <div class="d-flex justify-content-flex-end gap-2">
        <button class="w-100 btn btn-dark" @click="close()">{#no_text#}</button>
        <button class="w-100 btn btn-primary" @click="save()">{#yes_text#}</button>
    </div>
</div>

<script>
    let DATA = {};
    try {
        DATA = {$DATA};
    } catch (ex) {
        DATA = {}
    }

    const orderCancel = {
        data() {
            return {
                orderId: DATA.GET_ORDERID,
                orderType: DATA.GET_ORDERMAIL || DATA.GET_ORDERPHONE,
            }
        },
        methods: {
            close() {
                T.modal.close();
            },
            save() {
                const self = this;
                axios.get(`/srv/service/order-v5/cancel/${self.orderId}-${self.orderType}`).then(response => {
                    const result = response.data || {};
                    T.modal({
                        html: result?.statusText
                    });
                    if(result.status == true){
                        setTimeout(() => window.location.reload(), 2500);
                    }
                });
            }
        },
        mounted() {
            setTimeout(() => initComponents(), 150);
        }
    };

    Vue.createApp(orderCancel).mount('#order-cancel-form');
</script>