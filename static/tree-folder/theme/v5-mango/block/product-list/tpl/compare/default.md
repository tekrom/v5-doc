<div id="product-compare-list" class="w-100 d-flex flex-wrap" v-cloak>
    <div class="col-12 p-1" v-if="!LOADING">
        <div class="p-1 bg-light" v-if="data.PRODUCT_COUNT < 1">{#no_product2#}</div>
        <div class="p-1 bg-light" v-else-if="data.PRODUCT_COUNT < 2">{#must_choose1#}</div>
        <div class="p-1 bg-light" v-else-if="data.PRODUCT_COUNT > 4">{#must_choose2#}</div>
        <div class="w-100" v-else>
            <div class="w-100 border-bottom border-secondary">
                <div class="block-title">{#compare#}</div>
            </div>
            <div class="w-100 mt-1">
                <div class="w-100 bg-white compare-filter-item-header position-sticky">
                    <div class="d-flex w-100 compare-product-line">
                        <div class="col-4 pr-0"></div>
                        <div class="col-4" v-for="(P, pi) in data.PRODUCT_LIST">
                            <div class="w-100 h-100 border border-bottom-0">
                                <div class="image-wrapper border-bottom">
                                    <picture class="image-inner">
                                        <source :srcset="P.IMAGE.SMALL" v-if="P.IMAGE.MEDIUM_WEBP_JPG != null">
                                        <img :src="P.IMAGE.MEDIUM_WEBP_JPG" :alt="P.TITLE + '-' + P.BRAND"  v-if="P.IMAGE.MEDIUM_WEBP_JPG != null">
                                        <img :src="P.IMAGE.SMALL" :alt="P.TITLE + '-' + P.BRAND" v-else>
                                    </picture>
                                </div>
                                <div class="w-100 px-1 compare-text-line text-body fw-bold" v-if="P.BRAND != ''">{{ P.BRAND }}</div>
                                <div class="w-100 px-1 compare-text-line text-body">{{ P.TITLE }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex w-100 compare-product-line">
                        <div class="col-4 pr-0 compare-filter-item-title">
                            <div class="row ml-0">
                                <div class="w-100 h-100 bg-light px-1 border-top border-left d-flex align-items-center compare-text-line text-black fw-bold">{#price#}</div>
                            </div>
                        </div>
                        <div class="col-4 compare-filter-item-value" v-for="(P, pi) in data.PRODUCT_LIST">
                            <div class="w-100 h-100 bg-light px-1 border border-bottom-0 d-flex align-items-center compare-text-line text-black fw-bold">{{ vat(P.PRICE_SELL, P.VAT) }} {{ data.TARGET_CURRENCY }}</div>
                        </div>
                    </div>
                </div>
                <div class="w-100 d-flex compare-filter-item" v-for="(F, fi) in data.FILTER_LIST">
                    <div class="col-4 pr-0 compare-filter-item-title">
                        <div class="row ml-0">
                            <div class="w-100 h-100 px-1 border border-right-0 d-flex align-items-center compare-text-line text-body fw-bold" :class="{ 'border-bottom-0' : (fi + 1) < data.FILTER_LIST.length, 'bg-light' : (fi + 1) % 2 == 0 }">{{ F.NAME }}</div>
                        </div>
                    </div>
                    <div class="col-4 compare-filter-item-value" v-for="(VALUE, vi) in F.VALUE_LIST">
                        <div class="w-100 h-100 px-1 border d-flex align-items-center compare-text-line text-body" :class="{ 'border-bottom-0' : (fi + 1) < data.FILTER_LIST.length, 'bg-light' : (fi + 1) % 2 == 0 }">{{ VALUE }}</div>
                    </div>
                </div>
            </div>
            <div class="row mt-1">
                <div class="col-12">
                    <div class="w-100 d-flex border-top">
                        <div class="col-4 pr-0"></div>
                        <div class="col-4" v-for="(P, pi) in data.PRODUCT_LIST">
                            <div class="w-100 h-100 py-1 d-flex align-items-center justify-content-center">
                                <a :href="'/' + P.URL" class="btn btn-primary px-3 text-uppercase">{#review#}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    let DATA = {};
    try {
        DATA = {$DATA};
    } catch (ex) {
        DATA = {};
    }

    const CompareList = {
        data() {
            return {
                data: DATA
            }
        },
        methods: {
            vat(p, vat) {
                return T.vat(p, vat);
            }
        }
    };

    Vue.createApp(CompareList).mount('#product-compare-list');
</script>