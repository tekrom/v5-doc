<div class="snap-scroll-container mb-1 d-flex justify-content-center" data-toggle="snap-scroll">
    <div class="snap-scroll">
    {foreach from=$SUB_LIST item=SUB name=variant}
        <a href="javascript:void(0);"
        id="{$SUB.TYPE_ID}"
        data-id="{$SUB.TYPE_ID}"
        data-subproduct-id="{$SUB.ID}"
        data-pid="{$P.ID}"
        data-target="{$P.ID}{$BLOCK.ID}"
        data-type="{$SUB.TYPE}"
        data-code="{$SUB.CODE}"
        data-price="{$SUB.PRICE}"
        data-stock="{$SUB.STOCK}"
        data-barcode="{$SUB.BARCODE}"
        data-mop="{$SUB.MONEY_ORDER_PERCENT}"
        data-vat="{$SUB.VAT}"
        data-not-discounted="{$SUB.PRICE_NOT_DISCOUNTED}"
        data-group-id="{$GRUP_TIP_NO}"
        data-toggle="variant"
        data-callback="variantCallback"
            class="snap-item {if !$smarty.foreach.variant.last} mr-1{/if} border p-1 sub-button-item{if $SUB.TYPE_ID == $SELECTED && $IS_DEFAULT_VARIANT_ACTIVE|default:1 == 1} selected{/if}{if $SUB.IN_STOCK == false && $NEGATIVE_STOCK == 0} passive{/if}">
            <span>{$SUB.TYPE}</span>
        </a>
    {/foreach}
    </div>
    <div class="snap-prev">
        <i class="ti-arrow-left"></i>
    </div>
    <div class="snap-next">
        <i class="ti-arrow-right"></i>
    </div>
</div>
