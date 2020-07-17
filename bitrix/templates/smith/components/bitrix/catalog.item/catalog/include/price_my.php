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

$showDiscount = $pricesCount > 1;

?>
<div class="" data-entity="price">
  <div class="text-nowrap">
    <span class="product-cat-price-current<?=($showDiscount ? ' discount' : '')?>" id="<?=$itemIds['PRICE']?>" data-entity="price-current">
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
      <span class="product-cat-price-old" style="display: <?=($showDiscount ? 'inline-block' : 'none')?>;" id="<?=$itemIds['PRICE_OLD']?>" data-entity="price-full">
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
    <div class="product-cat-price-economy" style="display: <?=($showDiscount ? 'inline-block' : 'none')?>;" data-entity="price-discount">
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
