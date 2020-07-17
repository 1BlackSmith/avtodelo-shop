<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
	die();
}

/*// Разграничение вывода элементов каталога для каждого сайта
if (!function_exists('catalog_menu_filter')) {
	function catalog_menu_filter($section) 
	{
		$rsResult = CIBlockSection::GetList(array("SORT" => "ASC"), array("IBLOCK_ID" => 3, "ID" => $section['PARAMS']['SECTION_ID']), false, $arSelect = array("UF_*"));
		if ($arItem = $rsResult->GetNext()) {
			$siteID = (SITE_ID == 's1') ? 8 : 9; // Сопоставим id сайта c id в пользовательском поле
			return in_array($siteID, $arItem['UF_DISPLAY']);
		}
	
	}
}

// Упорядочивание элементов массива
$arResultTmp = array_filter($arResult, "catalog_menu_filter");
$arResult = array();
foreach ($arResultTmp as $item) {
	$arResult[] = $item;
}


if (!function_exists('recursiveAlignItems')) {
	function recursiveAlignItems(&$arItems, $level = 1, &$i = 0)
	{
		$returnArray = array();

		if (!is_array($arItems)) {
			return $returnArray;
		}

		for (
			$currentItemKey = 0, $countItems = count($arItems);
			$i < $countItems;
			++$i
		) {
			$arItem = $arItems[$i];

			if ($arItem['DEPTH_LEVEL'] == $level) {
				$returnArray[$currentItemKey++] = $arItem;
			} elseif ($arItem['DEPTH_LEVEL'] > $level) {
				$returnArray[$currentItemKey - 1]['SUB_ITEMS'] = recursiveAlignItems(
					$arItems,
					$level + 1,
					$i
				);
			} elseif ($level > $arItem['DEPTH_LEVEL']) {
				--$i;
				break;
			}
		}

		return $returnArray;
	}
}


$arResult = recursiveAlignItems($arResult);

// Если элемент - родитель, но дочерние элементы не будут выводиться, сделать его не родительским
if (!function_exists('recursiveChangeItems')) {
	function recursiveChangeItems(&$arItems)
	{
		$returnArray = array();

		foreach($arItems as $key => $item) {
			$returnArray[$key] = $item;

			if ($item['IS_PARENT'] == 1 && isset($item['SUB_ITEMS'])) {
				$returnArray[$key]['SUB_ITEMS'] = recursiveChangeItems($item['SUB_ITEMS']);
			} elseif ($item['IS_PARENT'] == 1 && !isset($item['SUB_ITEMS'])) {
				$returnArray[$key]['IS_PARENT'] = false;
				$returnArray[$key]['PARAMS']['IS_PARENT'] = false;
			}
		}

		return $returnArray;
	}
}
$arResult = recursiveChangeItems($arResult);
*/

$arParams['OPEN_CATALOG'] = $arParams['HEAD_TYPE'] == 'type6' || $arParams['HEAD_TYPE'] == 'type7';
