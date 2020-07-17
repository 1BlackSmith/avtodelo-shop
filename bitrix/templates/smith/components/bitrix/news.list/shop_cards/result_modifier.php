<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
	die();
}


// Разграничение вывода магазинов для каждого сайта
$arResultTmp = $arResult['ITEMS'];
$arResult['ITEMS'] = array();

foreach ($arResultTmp as $item) {
        if (!in_array(SITE_ID, $item['PROPERTIES']['DISPLAY']['VALUE_XML_ID'])) continue;
	$arResult['ITEMS'][] = $item;
}
