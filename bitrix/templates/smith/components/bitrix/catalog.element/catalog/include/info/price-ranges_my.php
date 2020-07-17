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

$useRatio = $arParams['USE_RATIO_IN_RANGES'] === 'Y';
$showPrice = !empty($price);

foreach ($arResult['CAT_PRICES'] as $price):
?>
<div class="card font-size-sm mb--1" data-entity="price" data-price-id="<?=$arCatPrice['ID']?>"<?=$showPrice ? '' : ' style="display: none;"'?>>
	<div class="card-header py-3 px-4 mb--1">
		<?=$price['CATALOG_GROUP_NAME']?>
			<span class="float-right text-nowrap"<?/*id="<?=$mainId.'_old_price_'.$arCatPrice['ID']?>"*/?> data-entity="price-current">
				<?php
				if (!empty($price) && count($actualItem['ITEM_QUANTITY_RANGES']) <= 1)
				{
					echo $price['PRINT_PRICE'];
				}
				?>
			</span>
	</div>
</div>
<?
endforeach;
