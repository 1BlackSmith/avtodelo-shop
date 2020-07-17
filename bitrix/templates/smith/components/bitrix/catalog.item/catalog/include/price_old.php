<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();
/**
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $item
 * @var array $actualItem
 * @var array $minOffer
 * @var array $itemIds
 * @var array $price
 * @var array $measureRatio
 * @var bool $haveOffers
 * @var bool $showSubscribe
 * @var array $morePhoto
 * @var bool $showSlider
 * @var string $imgTitle
 * @var string $productTitle
 * @var string $buttonSizeClass
 * @var CatalogSectionComponent $component
 */

use \Bitrix\Main\Localization\Loc;


// Цены в соответствии с группами
// Аминистратору доступны все цены
$arResult['ITEM']['CAT_PRICES'] = array();
$arPrices = CPrice::GetList(array(), array("PRODUCT_ID" => $arResult['ITEM']['ID']));
while ($arPrice = $arPrices->Fetch()) {
  if ($arPrice['CAN_ACCESS'] === 'Y') {
    $arPrice['PRINT_PRICE'] = CurrencyFormat(CCurrencyRates::ConvertCurrency($arPrice['PRICE'], $arPrice['CURRENCY'], "RUB"), "RUB");
    $arResult['ITEM']['CAT_PRICES'][] = $arPrice;
  }
}

?>


<?php
  // no price
  if (count($arResult['ITEM']['CAT_PRICES']) === 0):
  ?>
    <span class="product-cat-price-current" data-entity="price-current">
      <?=Loc::getMessage('RS_MM_BCI_CATALOG_NO_PRICE')?>
    </span>
  <?php
  endif;

  // if admin
  if (count($arResult['ITEM']['CAT_PRICES']) > 2):
    ?>
      <table class="ad-table-dropdown">
    <?php
    foreach ($arResult['ITEM']['CAT_PRICES'] as $i => $price):
      ?>
        <tr class="<?=($i !== 0) ? "ad-table-elem" : ""?>">
          <td style="padding-right: .3rem;"><?=($i + 1)."."?></td>
          <td style="padding-right: 1rem;" class="product-cat-price-current" data-entity="price-current"><?=$price['PRINT_PRICE'] ?></td>
          <?php if ($i == 0): ?>
            <td class="ad-table-dropdown-toggle" data-open="ad-table-elem"><a href="#">Развернуть</a></td>
          <?php endif; ?>
        </tr>
      <?php
    endforeach;
    ?>
      </table>
    <?php
  else:
    ?>
    <table>
      <?php
      if (isset($arResult['ITEM']['CAT_PRICES'][1])):
      ?>
        <tr>
          <td class="product-cat-price-old" data-entity="price-current"><?=$arResult['ITEM']['CAT_PRICES'][0]['PRINT_PRICE']?></td>
        </tr>
        <tr>
          <td class="product-cat-price-current" data-entity="price-current"><?=$arResult['ITEM']['CAT_PRICES'][1]['PRINT_PRICE']?></td>
        </tr>
      <?php else:?>
        <tr>
          <td class="product-cat-price-current" data-entity="price-current"><?=$arResult['ITEM']['CAT_PRICES'][0]['PRINT_PRICE']?></td>
        </tr>
      <?php endif;?>
    </table>
    <?php
  endif;
?>
