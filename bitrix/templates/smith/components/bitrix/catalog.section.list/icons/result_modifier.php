<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

if (is_array($arResult['SECTIONS']) && count($arResult['SECTIONS']))
{
	foreach ($arResult['SECTIONS'] as $iSectionKey => $arSection)
	{
		$arResult['SECTIONS'][$iSectionKey]['IS_PARENT'] = false;
		$arResult['SECTIONS'][$iSectionKey]['HAVE_SUBSECTIONS'] = false;
		if (
			intval($arSection['RIGHT_MARGIN']) - IntVal($arSection['LEFT_MARGIN']) > 1
			&& $arSection['RELATIVE_DEPTH_LEVEL'] < $arParams['TOP_DEPTH']
		)
		{
			$arResult['SECTIONS'][$iSectionKey]['HAVE_SUBSECTIONS'] = true;
			if ($arResult['SECTIONS'][$iSectionKey]['DEPTH_LEVEL'] == 1)
			{
				$arResult['SECTIONS'][$iSectionKey]['IS_PARENT'] = true;
			}
		}
	}
}

if (is_array($arParams['FILTER_IDS']) && count($arParams['FILTER_IDS']) > 0)
{
	$prevLevel = -1;
	for ($i = $arResult['SECTIONS_COUNT'] - 1; $i >= 0; --$i)
	{
		if (in_array($arResult['SECTIONS'][$i]['ID'], $arParams['FILTER_IDS']))
		{
			$prevLevel = $arResult['SECTIONS'][$i]['DEPTH_LEVEL'];
		}
		else
		{
			if ($prevLevel != -1 && $prevLevel > $arResult['SECTIONS'][$i]['DEPTH_LEVEL'])
			{
				$prevLevel = $arResult['SECTIONS'][$i]['DEPTH_LEVEL'];
			}
			elseif ($prevLevel == $arResult['SECTIONS'][$i]['DEPTH_LEVEL'])
			{
				$prevLevel = $arResult['SECTIONS'][$i]['DEPTH_LEVEL'];
				unset($arResult['SECTIONS'][$i]);
			}
			else
			{
				unset($arResult['SECTIONS'][$i]);
				if ($arResult['SECTIONS'][$i]['DEPTH_LEVEL'] == $arResult['SECTION']['DEPTH_LEVEL'] + 1)
				{
					$prevLevel = -1;
				}
			}

		}
	}

	$arResult['SECTIONS'] = array_values($arResult['SECTIONS']);
}

// $arResultTmp = $arResult["SECTIONS"];
// $mainDepthLevel = $arResultTmp[0]["DEPTH_LEVEL"];
// if ($arParams["SECTION_TYPE"] == "section") {
//     // Разграничение вывода элементов каталога для каждого сайта
//     if (!function_exists('catalog_sub_filter')) {
//             function catalog_sub_filter($section)
//             {
//                     $rsResult = CIBlockSection::GetList(
//                         array("SORT" => "ASC"), 
//                         array("IBLOCK_ID" => $section['IBLOCK_ID'], "ID" => $section['ID']), 
//                         false, 
//                         $arSelect = array("UF_*")
//                     );
                    
//                     if ($arItem = $rsResult->GetNext()) {
//                             $siteID = (SITE_ID == 's1') ? 8 : 9; // Сопоставим id сайта c id в пользовательском поле
//                             return in_array($siteID, $arItem['UF_DISPLAY']);
//                     }

//             }
//     }
//     $arResultTmp = array_filter($arResult['SECTIONS'], "catalog_sub_filter");
// }

// // Упорядочивание элементов массива
// $arResult['SECTIONS'] = array();
// foreach ($arResultTmp as $item) {
//         // Убрать дочерние элементы
//         if ($item["DEPTH_LEVEL"] > $mainDepthLevel) continue;

//         $arResult['SECTIONS'][] = $item;
// }

