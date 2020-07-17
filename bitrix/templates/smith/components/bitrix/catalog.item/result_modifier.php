<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

echo 123;

$arResult['CAT_PRICES'] = array();
$arPrices = CPrice::GetList(array(), array("PRODUCT_ID" => $arResult['ID']));
while ($arPrice = $arPrices->Fetch()) {
  if ($arPrice['CAN_ACCESS'] === 'Y') {
    $arPrice['PRINT_PRICE'] = CurrencyFormat(CCurrencyRates::ConvertCurrency($arPrice['PRICE'], $arPrice['CURRENCY'], "RUB"), "RUB");

    $arResult['CAT_PRICES'][] = $arPrice;
  }
}
