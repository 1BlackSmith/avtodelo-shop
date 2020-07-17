<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) {
	die();
}


if (isset($arParams['~GRID_RESPONSIVE_SETTINGS'])){
	$arParams['GRID_RESPONSIVE_SETTINGS'] = CUtil::JsObjectToPhp($arParams['~GRID_RESPONSIVE_SETTINGS']);

	if (is_array($arParams['GRID_RESPONSIVE_SETTINGS']) && count($arParams['GRID_RESPONSIVE_SETTINGS']) > 0) {
		foreach ($arParams['GRID_RESPONSIVE_SETTINGS'] as $key => $val) {
			if (intval($val['items']) > 0) {
				$arParams['GRID_RESPONSIVE_SETTINGS'][$key] = (int) 12 / intval($val['items']);
			}
		}
		unset($key, $val);
	}
} else {
	$arParams['GRID_RESPONSIVE_SETTINGS'] = array();
}

$arParams['IBLOCK_ID'] = 30;


$arSelect = Array("ID", "IBLOCK_ID", "NAME", "DATE_ACTIVE_FROM", "PROPERTY_*");
$arFilter = Array("IBLOCK_ID" => $arParams['IBLOCK_ID'], "ACTIVE" => "Y");
$res = CIBlockElement::GetList(Array(), $arFilter, false, Array(), $arSelect);
while ($ob = $res->GetNextElement()) {
  $arFields = $ob->GetFields();  
  $arProps = $ob->GetProperties();
  
  if (!in_array(SITE_ID, $arProps['SITE']['VALUE_XML_ID'])) {
    continue;
  }
  
  $arResult['BANNERS'][$arFields['ID']] = $arFields;
  $arResult['BANNERS'][$arFields['ID']]['PROPERTIES'] = $arProps;
}

if (isset($arResult['BANNERS'][0])) {
  unset($arResult['BANNERS'][0]);
}


$by = "s_id";
$order = "asc";
$isFiltered = false;
$rsBanners = CAdvBanner::GetList($by, $order, Array('TYPE_SID' => $arParams['TYPE'], 'SITE' => SITE_ID), $isFiltered, "N");
if ($arBanner = $rsBanners->NavNext(true, "f_")) {
  $arParams['BANNER_ID'] = $arBanner['ID'];
}
