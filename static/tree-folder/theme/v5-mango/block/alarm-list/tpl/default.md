<div id="page-my-price-alarms" class="col-12 my-1" v-cloak>
    <div class="row" v-if="!LOADING">
        <div class="col-12 mb-2">
            <div class="d-flex align-items-flex-start justify-content-between gap-1 pb-1 border-bottom">
                <h1 class="d-flex align-items-center">
                    <i class="ti-bell-o ti-alert-list d-flex align-items-center justify-content-center text-white member-menu-icon"></i>
                    {#block_title#}
                </h1>
                <a href="javascript:void(0);" onclick="window.history.back();" class="btn btn-light border border-light text-uppercase flex-shrink-0">
                    <i class="ti-arrow-left"></i> {#back#}
                </a>
            </div>
        </div>
        <div class="col-12 price-alarm-list" v-if="DATA.PRODUCTS.length > 0">
            <div class="w-100 px-1 mb-1 bg-white border border-round price-alarm-item" v-for="(PRODUCT, index) in DATA.PRODUCTS">
                <div class="row align-items-center">
                    <div class="col-12 col-md-2 py-1 d-flex align-items-center">
                        <div class="col-auto p-0">
                            <input type="checkbox" :id="'price-alarm-' + index" class="form-control price-alarms-input" :data-alarm="PRODUCT.ALARM_ID" :data-id="PRODUCT.ID"
                                :data-variant="PRODUCT.VARIANT_ID">
                            <label :for="'price-alarm-' + index">
                                <div class="input-checkbox">
                                    <i class="ti-check"></i>
                                </div>
                            </label>
                        </div>
                        <div>
                            <a :href="`/` + PRODUCT.URL" class="text-body"><strong>{{ PRODUCT.TITLE }}</strong></a>
                            <div>
                                <span v-if="PRODUCT.VARIANT_DATA1 && PRODUCT.VARIANT_DATA1.TYPE">{{ PRODUCT.VARIANT_DATA1.TYPE }} &nbsp</span>
                                <span v-if="PRODUCT.VARIANT_DATA2 && PRODUCT.VARIANT_DATA2.TYPE">{{ PRODUCT.VARIANT_DATA2.TYPE }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md py-1">
                        <div class="fw-medium mb-10">{#first_price#}</div>
                        <div><strong>{{ price(PRODUCT.PRICE_FIRST) }}</strong> {{ PRODUCT.TARGET_CURRENCY }}</div>
                    </div>
                    <div class="col-6 col-md py-1">
                        <div class="fw-medium mb-10">{#price_sell#}</div>
                        <div><strong>{{ price(PRODUCT.PRICE_SELL) }}</strong> {{ PRODUCT.TARGET_CURRENCY }}</div>
                    </div>
                    <div class="col-6 col-md py-1">
                        <div class="fw-medium mb-10">{#alarm_price#}</div>
                        <div><strong>{{ price(PRODUCT.PRICE_ALARM) }}</strong> {{ PRODUCT.TARGET_CURRENCY }}</div>
                    </div>
                    <div class="col-6 col-md py-1">
                        <div class="fw-medium mb-10">{#remaining_day#}</div>
                        <div><strong>{{ PRODUCT.REMAINING_DAY }}</strong></div>
                    </div>
                    <div class="col-6 col-md py-1">
                        <div class="fw-medium mb-10">{#add_date#}</div>
                        <div><strong>{{ PRODUCT.DATE }}</strong></div>
                    </div>
                    <div class="col-4 col-md d-flex align-items-center p-0">
                        <div class="col py-1">
                            <input type="hidden" :id="'ProductCount' + PRODUCT.ID" :name="'ProductCount' + PRODUCT.ID" value="1">
                            <a href="javascript:void(0);" @click="addToCart(PRODUCT.ID, PRODUCT.VARIANT_ID, 1)" class="btn btn-primary fw-bold price-alarm-add-btn d-flex justify-content-center">
                                <i class="ti-basket"></i>{#add#}
                            </a>
                        </div>
                        <div class="col-auto pl-0">
                            <a href="javascript:void(0);" @click="remove(PRODUCT.ALARM_ID)" class="price-alarm-delete-btn text-body d-flex align-items-center justify-content-center"><i class="ti-trash-o"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-1">
                <div class="col-6 col-md-4 col-lg-3">
                    <a href="javascript:void(0);" class="btn btn-primary w-100" @click="addToCart()"><i class="ti-basket"></i> {#add_selected#}</a>
                </div>
                <div class="col-6 col-md-4 col-lg-3">
                    <a href="javascript:void(0);" class="btn btn-light border border-light w-100" @click="remove()"><i class="ti-trash-o"></i> {#delete_selected#}</a>
                </div>
            </div>
        </div>
        <div class="col-12" v-else>
            <div class="col-12 p-1 border border-round">{#no_result#}</div>
        </div>
    </div>
</div>