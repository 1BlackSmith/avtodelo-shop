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

$priceTitle = $price['CATALOG_GROUP_NAME'];
$showDiscount = $pricesCount > 1;
?>
<div class="product-detail-price mb-4" data-entity="price">
  <div class="product-detail-price-title small text-extra w-100 mb--2">
    <?=Loc::getMessage('RS_MM_BCE_PREVIEW_PRICE')?>:
  </div>

  <div class="text-nowrap">
    <span class="product-cat-price-current<?=($showDiscount ? ' discount' : '')?>"<?/*id="<?=$mainId.'_old_price_'.$price['PRICE_TYPE_ID']?>"*/?> data-entity="">
      <?php
      if (!empty($price)) {
        echo $price['PRINT_PRICE'];
      } else {
        echo Loc::getMessage('RS_MM_BCE_CATALOG_NO_PRICE');
      }
      ?>
    </span>

    <?
    if ($arParams['SHOW_OLD_PRICE'] === 'Y')
    {
      ?>
      <span class="product-cat-price-old"<?/*id="<?=$mainId.'_price_'.$price['PRICE_TYPE_ID']?>"*/?>
        style="display: <?=($showDiscount ? '' : 'none')?>;" data-entity="">
        <?=($showDiscount ? $basePrice['PRINT_PRICE'] : '')?>
      </span>
      <?
    }
    ?>
  </div>

  <?
  if ($arParams['SHOW_OLD_PRICE'] === 'Y')
  {
    ?>
    <div class="product-cat-price-economy"<?/* id="<?=$mainId.'_price_discount_'.$price['PRICE_TYPE_ID']?>"*/?>
      style="display: <?=($showDiscount ? '' : 'none')?>;" data-entity="">
      <?
      if ($showDiscount)
      {
        echo Loc::getMessage('CT_BCE_CATALOG_ECONOMY_INFO2') . ': ' . (100 - round($price['PRICE'] / $basePrice['PRICE'] * 100)) . '%';
      }
      ?>
    </div>
    <?
  }
  ?>
</div>
<?
