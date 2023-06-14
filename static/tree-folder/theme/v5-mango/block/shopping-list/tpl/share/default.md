<div id="shopping-list-share" class="w-100" v-cloak>
    <div class="col-12">
        <form action="#" method="POST" id="shopping-list-share-form" class="row" novalidate autocomplete="off" @submit.prevent="sendForm">
            <div class="w-100 popover-wrapper position-relative mb-1">
                <input type="email" name="share-email" placeholder="{#email_adress#}" class="form-control form-control-md" data-toggle="placeholder"
                        v-model="email" data-validate="required,email">
            </div>
            <div class="w-100 popover-wrapper position-relative mb-1">
                <input type="number" name="share-day" placeholder="{#days_number#}" class="form-control form-control-md no-arrows" 
                        data-toggle="placeholder" data-validate="required" min="1" @blur="dayInput()" v-model="day">
            </div>
            <div class="w-100 popover-wrapper position-relative mb-1">
                <textarea class="form-control form-control-sm" placeholder="{#share_text#}" v-model="content" data-toggle="placeholder" data-validate="required"></textarea>
            </div>
            <div class="w-100 popover-wrapper position-relative mb-1">
                <input type="text" class="form-control form-control-md bg-white" :value="data.SHARE_LINK" placeholder="{#share_link#}" data-toggle="placeholder" readonly>
            </div>
            <div class="w-100">
                <button type="submit" class="w-100 btn btn-primary" id="share-send-btn">{#message_send#}</button>
            </div>
        </form>
    </div>
</div>
<script>
    let DATA = {};
    try {
        DATA = {$DATA};
    } catch (ex) {
        DATA = {}
    }

    const ShoppingListShare = {
        data() {
            return {
                data: DATA,
                email: '',
                day: 30,
                content: '{#share_content#}',
            }
        },
        methods: {
            dayInput() {
                const self = this;
                if (self.day == '' || self.day < 1) self.day = 1;
            },
            sendForm(formRef) {
                const self = this,
                      form = formRef.target,
                      service = `/srv/service/profile/share-shopping-link/${self.email}/${self.data.GET_P1}/${self.day}`;

                if (!T.checkValidity(form)) return;

                var data = new FormData();
                data.append('email', self.email);
                const content = `${self.content} <a href="${self.data.SHARE_LINK}">{#favourites#}</a>`;
                data.append('content', content);

                T.buttonLock.dom = document.getElementById('share-send-btn');
                T.buttonLock.lock();

                axios.post(service, data).then(response => {
                    T.buttonLock.unlock();
                    T.notify({
                        text: response.data.statusText,
                        className: response.data.status == 0 ? 'danger' : 'success',
                        stopOnFocus : true,
                        duration: 2400,
                        iconClass : response.data.status == 0 ? 'ti-thumbs-down' : 'ti-thumbs-up',
                    });
                    if (response.data.status == 1) {
                        setTimeout(function(){ location.reload(); }, 1500);
                    }
                }).catch(error => `Get share error => ${error}`);
            }
        },
        watch: {
            'day'(value) {
                const self = this;
                axios.get(`/srv/service/profile/create-shopping-link/${self.data.GET_P1}/${value}`).then(response => {
                    self.data = response.data;
                }).catch(error => `Get share set error => ${error}`);
            }
        },
        mounted() {
            setTimeout(() => { initComponents(); }, 240);
        },
    };

    Vue.createApp(ShoppingListShare).mount('#shopping-list-share');
</script>