<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Redsign\MegaMart\MyTemplate;

$arResult['CAT_PRICES'] = array();
$arPrices = CPrice::GetList(array(), array("PRODUCT_ID" => $arResult['ITEM']['ID']));
while ($arPrice = $arPrices->Fetch()) {
  if ($arPrice['CAN_ACCESS'] === 'Y') {
    $arPrice['PRINT_PRICE'] = CurrencyFormat(CCurrencyRates::ConvertCurrency($arPrice['PRICE'], $arPrice['CURRENCY'], "RUB"), "RUB");

    $arResult['CAT_PRICES'][] = $arPrice;
  }
}


define('GROUP_IDS', [
    'manager' => 8,
    'admin' => 1
  ]
);

global $USER;
$arGroups = CUser::GetUserGroup($USER->GetID());
$res = array_intersect(GROUP_IDS, $arGroups);

// Отображение наличия на складе в виде цифр для заданных групп
$arParams['SHOW_MAX_QUANTITY'] = count($res) ? 'Y' : 'M';
