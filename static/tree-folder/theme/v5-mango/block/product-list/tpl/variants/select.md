<select id="subPro{$GRUP_TIP_NO}" name="subPro{$GRUP_TIP_NO}" class="form-control form-control-md mb-1 sub-select-item" data-group-id="{$GRUP_TIP_NO}" data-toggle="variant" data-callback="variantCallback">
    <option value="0" data-pid="{$P.ID}" class="opt-title">{$VARIANT_TITLE|default:{#choose#}}</option>
    {foreach from=$SUB_LIST item=SUB name=variant}
        <option value="{$SUB.TYPE_ID}" 
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
        class="{if $SUB.TYPE_ID == $SELECTED && $IS_DEFAULT_VARIANT_ACTIVE|default:1 == 1}selected{/if} {if $SUB.IN_STOCK == false}passive {/if}"
        {if $SUB.TYPE_ID == $SELECTED && $IS_DEFAULT_VARIANT_ACTIVE|default:1 == 1} selected {/if}>
            {$SUB.TYPE}
        </option>
    {/foreach}
</select>