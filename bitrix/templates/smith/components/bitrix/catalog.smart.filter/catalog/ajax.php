<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

use \Bitrix\Main;

if (intval($this->__component->SECTION_ID) < 1)
{
    $FILTER_NAME = (string)$arParams["FILTER_NAME"];

    global ${$FILTER_NAME};
    if(!is_array(${$FILTER_NAME}))
        ${$FILTER_NAME} = array();

    $arFilter = $this->__component->makeFilter($FILTER_NAME);

    unset($arFilter['INCLUDE_SUBSECTIONS']);
    unset($arFilter['FACET_OPTIONS']);

    $resElements = CIBlockElement::GetList(array(), $arFilter, array('ID'), false);
    $arResult["ELEMENT_COUNT"] = $resElements->SelectedRowsCount();
}

if ($arParams['INSTANT_RELOAD'] == 'Y' && $arParams['TARGET_ID'])
{
	$arResult['COMPONENT_CONTAINER_ID'] = $arParams['TARGET_ID'];
	$arResult['INSTANT_RELOAD'] = true;
}

$APPLICATION->RestartBuffer();
unset($arResult["COMBO"]);

if (!empty($arResult))
{
    $arResult['JS'] = Main\Page\Asset::getInstance()->getJs();
}

// echo Main\Web\Json::encode($arResult);
echo CUtil::PHPToJSObject($arResult, true);