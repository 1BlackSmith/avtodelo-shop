<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();
/**
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $arResult
 * @var CatalogSectionComponent $component
 * @var CBitrixComponentTemplate $this
 * @var string $templateName
 * @var string $componentPath
 * @var string $templateFolder
 */

use \Bitrix\Main\Localization\Loc;

$showPrice = !empty($price);
?>
<div class="pt-2">
    <div class="mb-3">
        <a href="#prices-<?=$actualItem['XML_ID']?>" class="font-size-m collapsed" data-toggle="collapse" aria-expanded="true" aria-controls="prices">
            <span class="collapsed__in"><?=Loc::getMessage('RS_MM_BCE_CATALOG_ITEM_ALL_PRICES')?></span>
            <span class="collapsed__out"><?=Loc::getMessage('RS_MM_BCE_CATALOG_ITEM_ALL_PRICES_COLLAPSED')?></span>
        </a>
    </div>
    <div class="collapse" id="prices-<?=$actualItem['XML_ID']?>">
        <div class="mb-1">
            <? 
            foreach ($actualItem['PRICES'] as $code => $price):
            ?>
            <div class="card font-size-sm mb--1" data-entity="price" <?=$showPrice ? '' : ' style="display: none;"'?>>
                <div class="card-header py-3 px-4 mb--1">
                    <?=$code?>
                    <span class="float-right text-nowrap" id="<?=$mainId.'_old_price_'.$price['ID']?>">
                        <?=$price['PRINT_VALUE']?>
                    </span>
                </div>
            </div>
            <?
            endforeach;
            ?>
        </div>
    </div>
</div>