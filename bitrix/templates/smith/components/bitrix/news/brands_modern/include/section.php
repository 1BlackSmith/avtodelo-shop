<?php 
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) {
    die();
}

use \Redsign\MegaMart\BrandTools;

$APPLICATION->SetPageProperty("hide_section", "Y");
$APPLICATION->SetPageProperty('wide_page', 'N');
$APPLICATION->SetPageProperty('hide_inner_sidebar', 'Y');
$APPLICATION->SetPageProperty('hide_outer_sidebar', 'N');

$arBrandInfo = BrandTools::getInfo($nBrandId);

if (isset($arBrandInfo['DETAIL_PAGE_URL']))
{
    $APPLICATION->AddChainItem($arBrandInfo['NAME'], $arBrandInfo['DETAIL_PAGE_URL']);
}
else
{
    $APPLICATION->AddChainItem($arBrandInfo['NAME'], $arBrandInfo['NAME']);
}

if (isset($arSection['NAME']))
{
    $APPLICATION->AddChainItem($arSection['NAME']);
}

$APPLICATION->SetTitle($arSection['NAME'].' '.$arBrandInfo['NAME']);

if (strlen($arParams["CATALOG_FILTER_NAME"])<=0 || !preg_match("/^[A-Za-z_][A-Za-z01-9_]*$/", $arParams["CATALOG_FILTER_NAME"]))
{
    $arParams["CATALOG_FILTER_NAME"] = "arrFilter";
}

if (empty($arParams['AJAX_ID']) || strlen($arParams['AJAX_ID']) < 1)
{
	$arParams['AJAX_ID'] = CAjax::GetComponentID(
        $component->componentName, 
        $component->componentTemplate,
        $arParams['AJAX_OPTION_ADDITIONAL']
    );
}

global ${$arParams['CATALOG_FILTER_NAME']};
${$arParams['CATALOG_FILTER_NAME']}['=PROPERTY_'.$arParams['CATALOG_BRAND_PROP']] = $sBrandValue;

$arCatalogParams = array(
    'IBLOCK_TYPE' => $arParams['CATALOG_IBLOCK_TYPE'],
    'IBLOCK_ID' => $arParams['CATALOG_IBLOCK_ID'],
    'PRICE_CODE' => $arParams['CATALOG_PRICE_CODE'],
    'FILTER_NAME' => $arParams['CATALOG_FILTER_NAME'],
    'BRAND_PROP' => $arParams['CATALOG_BRAND_PROP'],
    'BRAND_VALUE' => $sBrandValue,
    'AJAX_ID' => $arParams['AJAX_ID']
); 

ob_start();
$APPLICATION->IncludeFile(
    SITE_DIR.'include/templates/brands/filter.php',
    $arCatalogParams
);
$sHtmlContent = ob_get_clean();
$APPLICATION->AddViewContent('site_sidebar_outer', $sHtmlContent, 500);
unset($sHtmlContent);


$arBasePrice = Bitrix\Catalog\GroupTable::getRow(array(
    'filter' => array(
        'BASE' => 'Y'
    ),
    'select' => array(
        'ID'
    ),
    "cache" => array(
        "ttl" => 3600
    )
));


$APPLICATION->IncludeFile(
    SITE_DIR.'include/templates/brands/sorter.php',
    $arCatalogParams + array(
        'SORT_BY_NAME' => array('sort', 'name', 'CATALOG_PRICE_'.$arBasePrice['ID'])
    )
);

global $alfaCTemplate, $alfaCSortType, $alfaCSortToo, $alfaCOutput;

$sTemplateRows = false;
switch ($alfaCTemplate)
{
    case 'view-list':
        $arTemplateRows = array_fill(
            0,
            $alfaCOutput,
            array(
                'VARIANT' => '0',
                'BIG_DATA' => false
            )
        );

        $sTemplateRows = Bitrix\Main\Web\Json::encode($arTemplateRows);
        break;

    case 'view-line':
        $arTemplateRows = array_fill(
            0,
            $alfaCOutput,
            array(
                'VARIANT' => '9',
                'BIG_DATA' => false
            )
        );

        $sTemplateRows = Bitrix\Main\Web\Json::encode($arTemplateRows);
        break;

    default:
        $arTemplateRows = array_fill(
            0,
            $alfaCOutput,
            array(
                'VARIANT' => '3',
                'BIG_DATA' => false
            )
        );

        $sTemplateRows = Bitrix\Main\Web\Json::encode($arTemplateRows);
        break;
}

unset($arTemplateRows);


$APPLICATION->IncludeFile(
    SITE_DIR.'include/templates/brands/section.php',
    $arCatalogParams + array(
        'SORT_FIELD' => isset($alfaCSortType) ? $alfaCSortType : 'sort',
        'SORT_ORDER' => isset($alfaCSortToo) ? $alfaCSortToo : 'asc',
        'TEMPLATE_ROWS' => $sTemplateRows,
        'PAGE_ELEMENT_COUNT' => $alfaCOutput,
        'SORT_FIELD2' => 'id',
        'SORT_ORDER2' => 'desc'
    )
);