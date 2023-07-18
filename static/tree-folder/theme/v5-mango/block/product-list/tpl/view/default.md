{foreach from=$PRODUCTS item=P}
    <div class="col-{12 / $SETTING.PERVIEW.ALL} col-sm-{12 / $SETTING.PERVIEW.SM} col-md-{12 / $SETTING.PERVIEW.MD} col-lg-{12 / $SETTING.PERVIEW.LG} col-xl-{$LAYOUT} mb-2 product-item">
        <div class="w-100 h-100 d-flex flex-direction-column justify-content-between bg-white ease border border-2 border-round">
            <div class="w-100 position-relative">                            
                <a href="/{$P.URL}" class="image-wrapper {if $P.IMAGE_LIST.1.SMALL != ''}image-animate{else}image-animate-zoom{/if}">
                    <picture class="image-inner">
                        {if $P.IMAGE.MEDIUM_WEBP_JPG != null}
                            <source srcset="{$P.IMAGE.SMALL}">
                            <img {if $IS_LAZY_LOAD_ACTIVE == '1'}src="{$LAZY_LOAD_LOADING_IMAGE}" data-src="{$P.IMAGE.MEDIUM_WEBP_JPG}" class="lazyload" loading="lazy"{else}src="{$P.IMAGE.MEDIUM_WEBP_JPG}"{/if} alt="{$P.TITLE} - {$P.BRAND}">
                        {else}
                            <img {if $IS_LAZY_LOAD_ACTIVE == '1'}src="{$LAZY_LOAD_LOADING_IMAGE}" data-src="{$P.IMAGE.SMALL}" class="lazyload" loading="lazy"{else}src="{$P.IMAGE.SMALL}"{/if} alt="{$P.TITLE} - {$P.BRAND}">
                        {/if}
                    </picture>
                    {if $P.IMAGE_LIST.1.SMALL != ''}
                        <picture class="image-inner">
                            <img {if $IS_LAZY_LOAD_ACTIVE == '1'}src="{$LAZY_LOAD_LOADING_IMAGE}" data-src="{$P.IMAGE_LIST.1.SMALL}" class="lazyload image-nd" loading="lazy"{else}src="{$P.IMAGE_LIST.1.SMALL}" class="image-nd"{/if} alt="{$P.TITLE} - {$P.BRAND} (1)">
                        </picture>
                    {/if}
                    {if $P.IS_DISPLAY_DISCOUNTED_ACTIVE == 1}
                        <span class="discounted-badge position-absolute bg-primary text-white text-center border-round {if $P.DISCOUNT_PERCENT <= 0}d-none{/if}">
                            <span><small>%</small><span class="product-discount">{$P.DISCOUNT_PERCENT}</span></span>{#discount#}
                        </span>
                    {/if}
                    {if $P.IS_NEW_PRODUCT == true}
                        <span class="new-badge position-absolute bg-gray text-white text-center border-round">
                            <span>{#new#}</span>{#product#}
                        </span>
                    {/if}
                    {if $P.IN_STOCK == false}
                        <span class="out-of-stock position-absolute bg-gray text-white text-center border-round">{#out_of_stock#}</span>
                    {/if}
                </a>
                {if $IS_SELECTABLE_PRODUCT == 1}
                    <input type="checkbox" id="select-and-add-to-cart-input-{$P.ID}{$BLOCK.ID}" value="{$P.ID}" data-target="{$P.ID}{$BLOCK.ID}" class="form-control multiple-ids-cart">
                    <label id="select-and-add-to-cart-{$P.ID}{$BLOCK.ID}" for="select-and-add-to-cart-input-{$P.ID}{$BLOCK.ID}" class="p-1 m-0 select-and-add-to-cart-input">
                        <span class="input-checkbox">
                            <i class="ti-check"></i>
                        </span>
                    </label>
                {/if}
            </div>
            <div class="col-12 py-1 product-detail-card{if $P.IS_DISPLAY_PRODUCT == 0 && $P.HAS_VARIANT == true && ($P.VARIANT_FEATURE1_LIST|@count > 0 || $P.VARIANT_FEATURE2_LIST|@count > 0)} large{/if}">
                <div class="row">
                    {if $DISPLAY_BRAND == 1 && $P.BRAND != ''}
                        <a id="brand-title-{$P.ID}{$BLOCK.ID}" href="/{$P.BRAND_URL}" class="col-12 fw-bold text-body brand-title">{$P.BRAND}</a>
                    {/if}
                    <a id="product-title-{$P.ID}{$BLOCK.ID}" href="/{$P.URL}" class="col-12 product-title">{$P.TITLE}</a>
                    {if $P.SHOW_VENDOR == 1 && $P.IS_DISPLAY_PRODUCT == 1}
                        <div class="col-12 pb-1 product-bottom-line">
                            {capture assign=vendor_login}<a href="/{url type='page' id='21'}" class="fw-bold text-primary text-underline">{#vendor_login#}</a>{/capture}
                            {{#vendor_message#}|replace:'%LINK%':$vendor_login}
                            <div class="row">
                                <div class="col-12 pt-1 product-buttons d-flex">
                                    {if $SETTING.IS_QUICK_VIEW_ACTIVE == 1}
                                        <a id="product-quickview-button-{$BLOCK.ID}{$P.ID}" class="d-block border border-round popupwin quick-view-btn" href="/srv/service/content-v5/sub-folder/3/1004/quick-view/{$P.ID}/{$P.SERVICE_CODE}" data-width="768" title="{#quick_view#}"><i class="ti-search"></i></a>
                                    {/if}
                                    {if $SETTING.DISPLAY_FAVOURITE_BUTTON == 1}
                                        <a id="product-favourite-button-{$BLOCK.ID}{$P.ID}" class="d-block border border-round add-favourite-btn" href="javascript:void(0);" data-id="{$P.ID}" title="{#add_favourite#}"><i class="ti-heart-o"></i></a>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/if}
                    {if $P.IS_DISPLAY_PRODUCT == 0}
                        <div class="col-12 pb-1 product-bottom-line">
                            <div class="row">
                                <input type="hidden" name="subPro{$P.ID}{$BLOCK.ID}" id="subPro{$P.ID}{$BLOCK.ID}" value="0" />
                                <input type="number" id="ProductCount{$P.ID}{$BLOCK.ID}" class="d-none" name="ProductCount{$P.ID}{$BLOCK.ID}" min="{$P.MIN_ORDER_COUNT}" step="{$P.STOCK_INCREMENT}" value="{$P.MIN_ORDER_COUNT}">
                                {if $P.HAS_VARIANT == true}
                                    <div class="col-12 pr-0 d-flex flex-wrap variant-wrapper">
                                        {if $P.VARIANT_FEATURE1_LIST|@count > 0}
                                            <div class="sub-one {if $P.VARIANT_FEATURE2_LIST|@count > 0}col-6{else}col-12{/if} pl-0">
                                                {include file='block/product-list/tpl/variants/select.tpl' SUB_LIST=$P.VARIANT_FEATURE1_LIST SELECTED=$P.VARIANT_FEATURE1_SELECTED GRUP_TIP_NO=1 VARIANT_TITLE=$P.VARIANT_FEATURE1_TITLE}
                                            </div>
                                        {/if}
                                        {if $P.VARIANT_FEATURE2_LIST|@count > 0}
                                            <div class="sub-two {if $P.VARIANT_FEATURE1_LIST|@count > 0}col-6{else}col-12{/if} pl-0">
                                                {include file='block/product-list/tpl/variants/select.tpl' SUB_LIST=$P.VARIANT_FEATURE2_LIST SELECTED=$P.VARIANT_FEATURE2_SELECTED GRUP_TIP_NO=2 VARIANT_TITLE=$P.VARIANT_FEATURE2_TITLE}
                                            </div>
                                        {/if}
                                    </div>
                                {/if}
                                <div class="col-12 product-price-wrapper d-flex flex-wrap">
                                    {if $P.IS_DISPLAY_DISCOUNTED_ACTIVE == 1}
                                        <div class="mr-1 product-discounted-price text-delete {if $P.DISCOUNT_PERCENT <= 0}d-none{/if}">
                                            {if $P.DISPLAY_VAT === "1"}
                                                <span class="product-price-not-discounted">{vat price=$P.PRICE_NOT_DISCOUNTED vat=$P.VAT}</span> {$P.TARGET_CURRENCY}
                                            {else}
                                                <span class="product-price-not-discounted-not-vat">{format price=$P.PRICE_NOT_DISCOUNTED}</span> {$P.TARGET_CURRENCY} <i class="ti-plus"></i> {#vat#}
                                            {/if}
                                        </div>
                                    {/if}
                                    <div class="fw-black current-price">
                                        {if $P.DISPLAY_VAT === "1"}
                                            <span class="product-price">{vat price=$P.PRICE_SELL vat=$P.VAT}</span> {$P.TARGET_CURRENCY}
                                        {else}
                                            <span class="product-price-not-vat">{format price=$P.PRICE_SELL}</span> {$P.TARGET_CURRENCY} <i class="ti-plus"></i> {#vat#}
                                        {/if}
                                    </div>
                                </div>
                                <div class="col-12 pt-1 product-buttons d-flex">
                                    {if $SETTING.DISPLAY_CART_BUTTON == 1}
                                        <a id="product-addcart-button-{$BLOCK.ID}{$P.ID}" class="d-block border border-round add-to-cart-btn" href="javascript:void(0);" title="{#add_cart#}" onclick="addToCart({$P.ID}, document.getElementById('subPro{$P.ID}{$BLOCK.ID}').value, document.getElementById('ProductCount{$P.ID}{$BLOCK.ID}').value)"><i class="ti-basket"></i></a>
                                    {/if}
                                    {if $SETTING.IS_QUICK_VIEW_ACTIVE == 1}
                                        <a id="product-quickview-button-{$BLOCK.ID}{$P.ID}" class="d-block border border-round popupwin quick-view-btn" href="/srv/service/content-v5/sub-folder/3/1004/quick-view/{$P.ID}/{$P.SERVICE_CODE}" data-width="768" title="{#quick_view#}"><i class="ti-search"></i></a>
                                    {/if}
                                    {if $SETTING.DISPLAY_COMPARISON_BUTTON==1}
                                        <a id="product-compare-button-{$BLOCK.ID}{$P.ID}" class="d-none d-md-block border border-round add-to-compare-btn" href="javascript:void(0);" data-id="{$P.ID}" onclick="return addToCompare(this);" title="{#add_compare#}"><i class="ti-shuffle"></i></a>
                                    {/if}
                                    {if $SETTING.DISPLAY_FAVOURITE_BUTTON == 1}
                                        <a id="product-favourite-button-{$BLOCK.ID}{$P.ID}" class="d-block border border-round add-favourite-btn" href="javascript:void(0);" data-id="{$P.ID}" title="{#add_favourite#}"><i class="ti-heart-o"></i></a>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/foreach}