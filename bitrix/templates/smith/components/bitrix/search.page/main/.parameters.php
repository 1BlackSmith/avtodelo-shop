<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

/** @var array $arCurrentValues */


use \Bitrix\Iblock;
use \Bitrix\Main\Loader;
use \Bitrix\Main\ModuleManager;
use \Bitrix\Main\Web\Json;
use \Bitrix\Main\Localization\Loc;
use \Redsign\MegaMart\ParametersUtils;
Loc::loadMessages(__FILE__);

if (!Loader::includeModule('iblock'))
	return;

$boolCatalog = Loader::includeModule('catalog');
$boolLightBasket = Loader::includeModule('redsign.lightbasket');

CBitrixComponent::includeComponentClass('bitrix:catalog.section');

$usePropertyFeatures = Iblock\Model\PropertyFeature::isEnabledFeatures();

$iblockExists = (!empty($arCurrentValues['CATALOG_IBLOCK_ID']) && (int)$arCurrentValues['CATALOG_IBLOCK_ID'] > 0);
$boolIsCatalog = false;
$arSKU = false;
$boolSKU = false;

$arIBlockType = CIBlockParameters::GetIBlockTypes();

$arIBlock = array();
$iblockFilter = !empty($arCurrentValues['CATALOG_IBLOCK_TYPE'])
	? array('TYPE' => $arCurrentValues['CATALOG_IBLOCK_TYPE'], 'ACTIVE' => 'Y')
	: array('ACTIVE' => 'Y');

$rsIBlock = CIBlock::GetList(array('SORT' => 'ASC'), $iblockFilter);
while ($arr = $rsIBlock->Fetch()) {
	$arIBlock[$arr['ID']] = '['.$arr['ID'].'] '.$arr['NAME'];
}
unset($arr, $rsIBlock, $iblockFilter);

if ($boolCatalog && $iblockExists)
{
	$arSKU = CCatalogSKU::GetInfoByProductIBlock($arCurrentValues['CATALOG_IBLOCK_ID']);
	$boolSKU = !empty($arSKU) && is_array($arSKU);

	$arCatalog = CCatalog::GetByIDExt($arCurrentValues['CATALOG_IBLOCK_ID']);
	if (false !== $arCatalog)
	{
		$boolIsCatalog = true;
	}
}

$arSort = CIBlockParameters::GetElementSortFields(
	array('SHOWS', 'SORT', 'TIMESTAMP_X', 'NAME', 'ID', 'ACTIVE_FROM', 'ACTIVE_TO'),
	array('KEY_LOWERCASE' => 'Y')
);

$arPrice = array();
if ($boolCatalog)
{
	$arSort = array_merge($arSort, CCatalogIBlockParameters::GetCatalogSortFields());
	if (isset($arSort['CATALOG_AVAILABLE']))
		unset($arSort['CATALOG_AVAILABLE']);
	$arPrice = CCatalogIBlockParameters::getPriceTypesList(true);
}
else
{
	//$arPrice = $arProperty_N;
}

$defaultValue = array('-' => GetMessage('CP_BC_TPL_PROP_EMPTY'));

$documentRoot = Loader::getDocumentRoot();

$arCSTemplates = $arRCSTemplates = array();

if (Loader::includeModule('redsign.megamart'))
{
	$arCSTemplates = ParametersUtils::getComponentTemplateList('bitrix:catalog.section');
	$arRCSTemplates = ParametersUtils::getComponentTemplateList('redsign:catalog.sorter');
}

$addToBasketActions = array(
	'-' => getMessage('CP_BC_TPL_PROP_EMPTY'),
	'BUY' => GetMessage('ADD_TO_BASKET_ACTION_BUY'),
	'ADD' => GetMessage('ADD_TO_BASKET_ACTION_ADD'),
	'REQUEST' => GetMessage('ADD_TO_BASKET_ACTION_REQUEST'),
);

$arListProductBlocks = array(
	// 'price' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_PRICE'),
	// 'quantity' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_QUANTITY'),
	// 'buttons' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_BUTTONS'),
	'props' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_PROPS'),
	// 'compare' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_COMPARE'),
	'preview' => GetMessage('RS_MM_PRODUCT_BLOCK_PREVIEW'),
);

// if ($arCurrentValues['USE_VOTE_RATING'] == 'Y')
// {
	// $arListProductBlocks['rate'] = GetMessage('RS_MM_PRODUCT_BLOCK_RATE');
// }

if ($boolIsCatalog)
{
	$arListProductBlocks['sku'] = GetMessage('CP_BC_TPL_PRODUCT_BLOCK_SKU');
	// $arListProductBlocks['quantityLimit'] = GetMessage('CP_BC_TPL_PRODUCT_BLOCK_QUANTITY_LIMIT');
}


$arTemplateView = array(
	'default' => 'default',
	'popup' => 'popup',
	// 'scroll' => 'scroll',
);

$arTemplateParameters['CATALOG_IBLOCK_TYPE'] = array(
	'NAME' => Loc::getMessage('IBLOCK_TYPE'),
	'TYPE' => 'LIST',
	'VALUES' => $arIBlockType,
	'REFRESH' => 'Y'
);

$arTemplateParameters['CATALOG_IBLOCK_ID'] = array(
	'NAME' => Loc::getMessage('IBLOCK_IBLOCK'),
	'TYPE' => 'LIST',
	'VALUES' => $arIBlock,
	'REFRESH' => 'Y'
);

$arAllPropList = array();
$arListPropList = array();
$arHighloadPropList = array();
$arLinkElementPropList = array();
$arFilePropList = $defaultValue;

if ($iblockExists)
{
	$rsProps = CIBlockProperty::GetList(
		array('SORT' => 'ASC', 'ID' => 'ASC'),
		array('IBLOCK_ID' => $arCurrentValues['CATALOG_IBLOCK_ID'], 'ACTIVE' => 'Y')
	);
	while ($arProp = $rsProps->Fetch())
	{
		$strPropName = '['.$arProp['ID'].']'.('' != $arProp['CODE'] ? '['.$arProp['CODE'].']' : '').' '.$arProp['NAME'];
		if ('' == $arProp['CODE'])
		{
			$arProp['CODE'] = $arProp['ID'];
		}

		$arAllPropList[$arProp['CODE']] = $strPropName;

		if ($arProp['PROPERTY_TYPE'] == Iblock\PropertyTable::TYPE_FILE)
		{
			$arFilePropList[$arProp['CODE']] = $strPropName;
		}

		if ($arProp['PROPERTY_TYPE'] == Iblock\PropertyTable::TYPE_LIST)
		{
			$arListPropList[$arProp['CODE']] = $strPropName;
		}

		if ($arProp['PROPERTY_TYPE'] == Iblock\PropertyTable::TYPE_STRING && 'directory' == $arProp['USER_TYPE'] && CIBlockPriceTools::checkPropDirectory($arProp))
		{
			$arHighloadPropList[$arProp['CODE']] = $strPropName;
		}

		if ($arProp['PROPERTY_TYPE'] == Iblock\PropertyTable::TYPE_ELEMENT)
		{
			$arLinkElementPropList[$arProp['CODE']] = $strPropName;
		}
	}

	$showedProperties = [];
	if ($usePropertyFeatures)
	{
		if ($iblockExists)
		{
			$showedProperties = Iblock\Model\PropertyFeature::getListPageShowPropertyCodes(
				$arCurrentValues['IBLOCK_ID'],
				['CODE' => 'Y']
			);
			if ($showedProperties === null)
				$showedProperties = [];
		}
	}
	else
	{
		if (!empty($arCurrentValues['CATALOG_PROPERTY_CODE']) && is_array($arCurrentValues['CATALOG_PROPERTY_CODE']))
		{
			$showedProperties = $arCurrentValues['CATALOG_PROPERTY_CODE'];
		}
	}
	if (!empty($showedProperties))
	{
		$selected = array();

		foreach ($showedProperties as $code)
		{
			if (isset($arAllPropList[$code]))
			{
				$selected[$code] = $arAllPropList[$code];
			}
		}

		$arTemplateParameters['CATALOG_PROPERTY_CODE_MOBILE'] = array(
			'PARENT' => 'LIST_SETTINGS',
			'NAME' => GetMessage('CP_BC_TPL_PROPERTY_CODE_MOBILE'),
			'TYPE' => 'LIST',
			'MULTIPLE' => 'Y',
			'VALUES' => $selected
		);
	}
	unset($showedProperties);

	$arListProductBlocks = array(
		// 'price' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_PRICE'),
		// 'quantity' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_QUANTITY'),
		// 'buttons' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_BUTTONS'),
		'props' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_PROPS'),
		// 'compare' => GetMessage('CP_BC_TPL_PRODUCT_BLOCK_COMPARE'),
		'preview' => GetMessage('RS_MM_PRODUCT_BLOCK_PREVIEW'),
	);

	// if ($arCurrentValues['USE_VOTE_RATING'] == 'Y')
	// {
		// $arListProductBlocks['rate'] = GetMessage('RS_MM_PRODUCT_BLOCK_RATE');
	// }

	if ($boolIsCatalog)
	{
		$arListProductBlocks['sku'] = GetMessage('CP_BC_TPL_PRODUCT_BLOCK_SKU');
		// $arListProductBlocks['quantityLimit'] = GetMessage('CP_BC_TPL_PRODUCT_BLOCK_QUANTITY_LIMIT');
	}
/*
	TODO remove if LIST_PRODUCT_BLOCKS not used
	$arTemplateParameters['CATALOG_PRODUCT_BLOCKS'] = array(
		'PARENT' => 'LIST_SETTINGS',
		'NAME' => Loc::getMessage('RS_MM_LIST_PRODUCT_BLOCKS'),
		'TYPE' => 'LIST',
		'VALUES' => $arListProductBlocks,
		'REFRESH' => 'Y',
		'MULTIPLE' => 'Y',
		'DEFAULT' => '-',
	);

	if (is_array($arCurrentValues['CATALOG_PRODUCT_BLOCKS']) && count($arCurrentValues['CATALOG_PRODUCT_BLOCKS']) > 0)
	{
		$selected = array();
		foreach ($arCurrentValues['CATALOG_PRODUCT_BLOCKS'] as $name)
		{
			if (isset($arListProductBlocks[$name]))
			{
				$selected[$name] = $arListProductBlocks[$name];
			}
		}

		$arTemplateParameters['CATALOG_PRODUCT_BLOCKS_ORDER'] = array(
			'PARENT' => 'LIST_SETTINGS',
			'NAME' => GetMessage('CP_BC_TPL_PRODUCT_BLOCKS_ORDER'),
			'TYPE' => 'CUSTOM',
			'JS_FILE' => CatalogSectionComponent::getSettingsScript('/bitrix/components/bitrix/catalog.section', 'dragdrop_order'),
			'JS_EVENT' => 'initDraggableOrderControl',
			'JS_DATA' => Json::encode($selected),
			'DEFAULT' => 'preview,props,sku'
		);
		unset($selected);
	}
*/
	$arTemplateParameters['CATALOG_PRODUCT_BLOCKS_ORDER'] = array(
		'PARENT' => 'LIST_SETTINGS',
		'NAME' => GetMessage('CP_BC_TPL_PRODUCT_BLOCKS_ORDER'),
		'TYPE' => 'CUSTOM',
		'JS_FILE' => CatalogSectionComponent::getSettingsScript('/bitrix/components/bitrix/catalog.section', 'dragdrop_order'),
		'JS_EVENT' => 'initDraggableOrderControl',
		'JS_DATA' => Json::encode($arListProductBlocks),
		'DEFAULT' => 'preview,props,sku'
	);

	$lineElementCount = (int)$arCurrentValues['LINE_ELEMENT_COUNT'] ?: 3;
	$pageElementCount = (int)$arCurrentValues['PAGE_ELEMENT_COUNT'] ?: 30;

	$arTemplateParameters['LIST_PRODUCT_ROW_VARIANTS'] = array(
		'PARENT' => 'LIST_SETTINGS',
		'NAME' => GetMessage('CP_BC_TPL_PRODUCT_ROW_VARIANTS'),
		'TYPE' => 'CUSTOM',
		'BIG_DATA' => 'Y',
		'COUNT_PARAM_NAME' => 'PAGE_ELEMENT_COUNT',
		'JS_FILE' => CatalogSectionComponent::getSettingsScript('/bitrix/components/bitrix/catalog.section', 'dragdrop_add'),
		'JS_EVENT' => 'initDraggableAddControl',
		'JS_MESSAGES' => Json::encode(array(
			'variant' => GetMessage('CP_BC_TPL_SETTINGS_VARIANT'),
			'delete' => GetMessage('CP_BC_TPL_SETTINGS_DELETE'),
			'quantity' => GetMessage('CP_BC_TPL_SETTINGS_QUANTITY'),
			'quantityBigData' => GetMessage('CP_BC_TPL_SETTINGS_QUANTITY_BIG_DATA')
		)),
		'JS_DATA' => Json::encode(CatalogSectionComponent::getTemplateVariantsMap()),
		'DEFAULT' => Json::encode(CatalogSectionComponent::predictRowVariants($lineElementCount, $pageElementCount))
	);

	$arTemplateParameters['CATALOG_ENLARGE_PRODUCT'] = array(
		'PARENT' => 'LIST_SETTINGS',
		'NAME' => GetMessage('CP_BC_TPL_ENLARGE_PRODUCT'),
		'TYPE' => 'LIST',
		'MULTIPLE' => 'N',
		'ADDITIONAL_VALUES' => 'N',
		'REFRESH' => 'Y',
		'DEFAULT' => 'N',
		'VALUES' => array(
			'STRICT' => GetMessage('CP_BC_TPL_ENLARGE_PRODUCT_STRICT'),
			'PROP' => GetMessage('CP_BC_TPL_ENLARGE_PRODUCT_PROP')
		)
	);

	if (isset($arCurrentValues['CATALOG_ENLARGE_PRODUCT']) && $arCurrentValues['CATALOG_ENLARGE_PRODUCT'] === 'PROP')
	{
		$arTemplateParameters['LIST_ENLARGE_PROP'] = array(
			'PARENT' => 'LIST_SETTINGS',
			'NAME' => GetMessage('CP_BC_TPL_ENLARGE_PROP'),
			'TYPE' => 'LIST',
			'MULTIPLE' => 'N',
			'ADDITIONAL_VALUES' => 'N',
			'REFRESH' => 'N',
			'DEFAULT' => '-',
			'VALUES' => $defaultValue + $arListPropList
		);
	}
/*
	$arTemplateParameters['LIST_SHOW_SLIDER'] = array(
		'PARENT' => 'LIST_SETTINGS',
		'NAME' => GetMessage('CP_BC_TPL_SHOW_SLIDER'),
		'TYPE' => 'CHECKBOX',
		'MULTIPLE' => 'N',
		'REFRESH' => 'Y',
		'DEFAULT' => 'Y'
	);

	if (!isset($arCurrentValues['LIST_SHOW_SLIDER']) || $arCurrentValues['LIST_SHOW_SLIDER'] === 'Y')
	{
		$arTemplateParameters['LIST_SLIDER_INTERVAL'] = array(
			'PARENT' => 'LIST_SETTINGS',
			'NAME' => GetMessage('CP_BC_TPL_SLIDER_INTERVAL'),
			'TYPE' => 'TEXT',
			'MULTIPLE' => 'N',
			'REFRESH' => 'N',
			'DEFAULT' => '3000'
		);
		$arTemplateParameters['LIST_SLIDER_PROGRESS'] = array(
			'PARENT' => 'LIST_SETTINGS',
			'NAME' => GetMessage('CP_BC_TPL_SLIDER_PROGRESS'),
			'TYPE' => 'CHECKBOX',
			'MULTIPLE' => 'N',
			'REFRESH' => 'N',
			'DEFAULT' => 'N'
		);
	}
*/

	$arTemplateParameters['CATALOG_ADD_PICT_PROP'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => GetMessage('CP_BC_TPL_ADD_PICT_PROP'),
		'TYPE' => 'LIST',
		'MULTIPLE' => 'N',
		'ADDITIONAL_VALUES' => 'N',
		'REFRESH' => 'N',
		'DEFAULT' => '-',
		'VALUES' => $arFilePropList
	);
	$arTemplateParameters['CATALOG_LABEL_PROP'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => GetMessage('CP_BC_TPL_LABEL_PROP'),
		'TYPE' => 'LIST',
		'MULTIPLE' => 'Y',
		'ADDITIONAL_VALUES' => 'N',
		'REFRESH' => 'Y',
		'VALUES' => $arListPropList
	);

	if (!empty($arCurrentValues['LABEL_PROP']))
	{
		if (!is_array($arCurrentValues['CATALOG_LABEL_PROP']))
		{
			$arCurrentValues['CATALOG_LABEL_PROP'] = array($arCurrentValues['CATALOG_LABEL_PROP']);
		}

		$selected = array();
		foreach ($arCurrentValues['CATALOG_LABEL_PROP'] as $name)
		{
			if (isset($arListPropList[$name]))
			{
				$selected[$name] = $arListPropList[$name];
			}
		}

		$arTemplateParameters['CATALOG_LABEL_PROP_MOBILE'] = array(
			'PARENT' => 'VISUAL',
			'NAME' => GetMessage('CP_BC_TPL_LABEL_PROP_MOBILE'),
			'TYPE' => 'LIST',
			'MULTIPLE' => 'Y',
			'ADDITIONAL_VALUES' => 'N',
			'REFRESH' => 'N',
			'VALUES' => $selected
		);
		unset($selected);
/*
		$arTemplateParameters['CATALOG_LABEL_PROP_POSITION'] = array(
			'PARENT' => 'LIST_SETTINGS',
			'NAME' => GetMessage('CP_BC_TPL_LABEL_PROP_POSITION'),
			'TYPE' => 'CUSTOM',
			'JS_FILE' => CatalogSectionComponent::getSettingsScript('/bitrix/components/bitrix/catalog.section', 'position'),
			'JS_EVENT' => 'initPositionControl',
			'JS_DATA' => Json::encode(
				array(
					'positions' => array(
						'top-left', 'top-center', 'top-right',
						'middle-left', 'middle-center', 'middle-right',
						'bottom-left', 'bottom-center', 'bottom-right'
					),
					'className' => ''
				)
			),
			'DEFAULT' => 'top-left'
		);
*/
	}

	if ($boolSKU)
	{
		$arTemplateParameters['PRODUCT_DISPLAY_MODE'] = array(
			'PARENT' => 'VISUAL',
			'NAME' => GetMessage('CP_BC_TPL_PRODUCT_DISPLAY_MODE'),
			'TYPE' => 'LIST',
			'MULTIPLE' => 'N',
			'ADDITIONAL_VALUES' => 'N',
			'REFRESH' => 'Y',
			'DEFAULT' => 'N',
			'VALUES' => array(
				'N' => GetMessage('CP_BC_TPL_DML_SIMPLE'),
				'Y' => GetMessage('CP_BC_TPL_DML_EXT')
			)
		);
		$arAllOfferPropList = array();
		$arFileOfferPropList = array(
			'-' => GetMessage('CP_BC_TPL_PROP_EMPTY')
		);
		$arTreeOfferPropList = array(
			'-' => GetMessage('CP_BC_TPL_PROP_EMPTY')
		);
		$rsProps = CIBlockProperty::GetList(
			array('SORT' => 'ASC', 'ID' => 'ASC'),
			array('IBLOCK_ID' => $arSKU['IBLOCK_ID'], 'ACTIVE' => 'Y')
		);
		while ($arProp = $rsProps->Fetch())
		{
			if ($arProp['ID'] == $arSKU['SKU_PROPERTY_ID'])
				continue;
			$arProp['USER_TYPE'] = (string)$arProp['USER_TYPE'];
			$strPropName = '['.$arProp['ID'].']'.('' != $arProp['CODE'] ? '['.$arProp['CODE'].']' : '').' '.$arProp['NAME'];
			if ('' == $arProp['CODE'])
				$arProp['CODE'] = $arProp['ID'];
			$arAllOfferPropList[$arProp['CODE']] = $strPropName;
			if ('F' == $arProp['PROPERTY_TYPE'])
				$arFileOfferPropList[$arProp['CODE']] = $strPropName;
			if ('N' != $arProp['MULTIPLE'])
				continue;
			if (
				'L' == $arProp['PROPERTY_TYPE']
				|| 'E' == $arProp['PROPERTY_TYPE']
				|| ('S' == $arProp['PROPERTY_TYPE'] && 'directory' == $arProp['USER_TYPE'] && CIBlockPriceTools::checkPropDirectory($arProp))
			)
				$arTreeOfferPropList[$arProp['CODE']] = $strPropName;
		}

		if (!$usePropertyFeatures)
		{
			$arTemplateParameters['OFFER_TREE_PROPS'] = array(
				'PARENT' => 'OFFERS_SETTINGS',
				'NAME' => GetMessage('CP_BC_TPL_OFFER_TREE_PROPS'),
				'TYPE' => 'LIST',
				'MULTIPLE' => 'Y',
				'ADDITIONAL_VALUES' => 'N',
				'REFRESH' => 'Y',
				'DEFAULT' => '-',
				'VALUES' => $arTreeOfferPropList
			);
		}
		if (!empty($arCurrentValues['OFFER_TREE_PROPS']))
		{
			$selected = array();

			foreach ($arCurrentValues['OFFER_TREE_PROPS'] as $code)
			{
				if (isset($arTreeOfferPropList[$code]))
				{
					$selected[$code] = $arTreeOfferPropList[$code];
				}
			}

			$arTemplateParameters['OFFER_TREE_DROPDOWN_PROPS'] = array(
				'PARENT' => 'OFFERS_SETTINGS',
				'NAME' => getMessage('RS_MM_OFFER_TREE_DROPDOWN_PROPS'),
				'TYPE' => 'LIST',
				'VALUES' => $defaultValue + $selected,
				'MULTIPLE' => 'Y',
				'DEFAULT' => '-',
			);
		}

/*
		if (isset($arCurrentValues['SHOW_ARTNUMBER']) && $arCurrentValues['SHOW_ARTNUMBER'] === 'Y')
		{
			$arTemplateParameters['OFFER_ARTNUMBER_PROP'] = array(
				'PARENT' => 'OFFERS_SETTINGS',
				'NAME' => Loc::getMessage('RS_MM_OFFER_ARTNUMBER_PROP'),
				'TYPE' => 'LIST',
				'MULTIPLE' => 'N',
				'ADDITIONAL_VALUES' => 'N',
				'REFRESH' => 'N',
				'DEFAULT' => '-',
				'VALUES' => $defaultValue + $arAllOfferPropList
			);
		}
*/
/*
		$arTemplateParameters['OFFER_ADD_PICT_PROP'] = array(
			'PARENT' => 'VISUAL',
			'NAME' => GetMessage('CP_BC_TPL_OFFER_ADD_PICT_PROP'),
			'TYPE' => 'LIST',
			'MULTIPLE' => 'N',
			'ADDITIONAL_VALUES' => 'N',
			'REFRESH' => 'N',
			'DEFAULT' => '-',
			'VALUES' => $arFileOfferPropList
		);
*/
	}

if (!$boolIsCatalog && $boolLightBasket)
{
	$arTemplateParameters['CATALOG_IS_USE_CART'] = array(
		'NAME' => Loc::getMessage('RS_MM_IS_USE_CART'),
		'TYPE' => 'CHECKBOX',
		'DEFAULT' => 'Y',
		'REFRESH' => 'Y',
	);
}

if ($boolIsCatalog)
{
	$addToBasketActions['BUY1CLICK'] = GetMessage('RS_MM_BUY1CLICK');

/*
	$arTemplateParameters['USE_COMMON_SETTINGS_BASKET_POPUP'] = array(
		'PARENT' => 'BASKET',
		'NAME' => GetMessage('CP_BC_TPL_USE_COMMON_SETTINGS_BASKET_POPUP'),
		'TYPE' => 'CHECKBOX',
		'DEFAULT' => 'N',
		'REFRESH' => 'Y'
	);
	$useCommonSettingsBasketPopup = (
		isset($arCurrentValues['USE_COMMON_SETTINGS_BASKET_POPUP'])
		&& $arCurrentValues['USE_COMMON_SETTINGS_BASKET_POPUP'] == 'Y'
	);
	$arTemplateParameters['COMMON_ADD_TO_BASKET_ACTION'] = array(
		'PARENT' => 'BASKET',
		'NAME' => GetMessage('CP_BC_TPL_COMMON_ADD_TO_BASKET_ACTION'),
		'TYPE' => 'LIST',
		'VALUES' => $addToBasketActions,
		'DEFAULT' => 'ADD',
		'REFRESH' => 'N',
		'HIDDEN' => ($useCommonSettingsBasketPopup ? 'N' : 'Y')
	);
	$arTemplateParameters['COMMON_SHOW_CLOSE_POPUP'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => GetMessage('CP_BC_TPL_COMMON_SHOW_CLOSE_POPUP'),
		'TYPE' => 'CHECKBOX',
		'DEFAULT' => 'N',
	);
	$arTemplateParameters['MESS_PRICE_RANGES_TITLE'] = array(
		'PARENT' => 'DETAIL_SETTINGS',
		'NAME' => GetMessage('CP_BC_TPL_MESS_PRICE_RANGES_TITLE'),
		'TYPE' => 'STRING',
		'DEFAULT' => GetMessage('CP_BC_TPL_MESS_PRICE_RANGES_TITLE_DEFAULT')
	);
	$arTemplateParameters['TOP_ADD_TO_BASKET_ACTION'] = array(
		'PARENT' => 'BASKET',
		'NAME' => GetMessage('CP_BC_TPL_TOP_ADD_TO_BASKET_ACTION'),
		'TYPE' => 'LIST',
		'VALUES' => $addToBasketActions,
		'DEFAULT' => 'ADD',
		'REFRESH' => 'N',
		'HIDDEN' => (!$useCommonSettingsBasketPopup ? 'N' : 'Y')
	);
*/
	$arTemplateParameters['PRODUCT_SUBSCRIPTION'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => GetMessage('CP_BC_TPL_PRODUCT_SUBSCRIPTION'),
		'TYPE' => 'CHECKBOX',
		'DEFAULT' => 'Y',
	);
	$arTemplateParameters['SHOW_DISCOUNT_PERCENT'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => GetMessage('CP_BC_TPL_SHOW_DISCOUNT_PERCENT'),
		'TYPE' => 'CHECKBOX',
		'DEFAULT' => 'N',
		'REFRESH' => 'Y',
	);

/*
	if (isset($arCurrentValues['SHOW_DISCOUNT_PERCENT']) && $arCurrentValues['SHOW_DISCOUNT_PERCENT'] === 'Y')
	{
		$arTemplateParameters['DISCOUNT_PERCENT_POSITION'] = array(
			'PARENT' => 'VISUAL',
			'NAME' => GetMessage('CP_BC_TPL_DISCOUNT_PERCENT_POSITION'),
			'TYPE' => 'CUSTOM',
			'JS_FILE' => CatalogSectionComponent::getSettingsScript('/bitrix/components/bitrix/catalog.section', 'position'),
			'JS_EVENT' => 'initPositionControl',
			'JS_DATA' => Json::encode(
				array(
					'positions' => array(
						'top-left', 'top-center', 'top-right',
						'middle-left', 'middle-center', 'middle-right',
						'bottom-left', 'bottom-center', 'bottom-right'
					),
					'className' => 'bx-pos-parameter-block-circle'
				)
			),
			'DEFAULT' => 'bottom-right'
		);
	}
*/
	$arTemplateParameters['SHOW_MAX_QUANTITY'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => GetMessage('CP_BC_TPL_SHOW_MAX_QUANTITY'),
		'TYPE' => 'LIST',
		'REFRESH' => 'Y',
		'MULTIPLE' => 'N',
		'VALUES' => array(
			'N' => GetMessage('CP_BC_TPL_SHOW_MAX_QUANTITY_N'),
			'Y' => GetMessage('CP_BC_TPL_SHOW_MAX_QUANTITY_Y'),
			'M' => GetMessage('CP_BC_TPL_SHOW_MAX_QUANTITY_M')
		),
		'DEFAULT' => array('N')
	);

	if (isset($arCurrentValues['SHOW_MAX_QUANTITY']))
	{
		if ($arCurrentValues['SHOW_MAX_QUANTITY'] !== 'N')
		{
			$arTemplateParameters['MESS_SHOW_MAX_QUANTITY'] = array(
				'PARENT' => 'VISUAL',
				'NAME' => GetMessage('CP_BC_TPL_MESS_SHOW_MAX_QUANTITY'),
				'TYPE' => 'STRING',
				'DEFAULT' => GetMessage('CP_BC_TPL_MESS_SHOW_MAX_QUANTITY_DEFAULT')
			);
		}

		if ($arCurrentValues['SHOW_MAX_QUANTITY'] === 'M')
		{
			$arTemplateParameters['RELATIVE_QUANTITY_FACTOR'] = array(
				'PARENT' => 'VISUAL',
				'NAME' => GetMessage('CP_BC_TPL_RELATIVE_QUANTITY_FACTOR'),
				'TYPE' => 'STRING',
				'DEFAULT' => '5'
			);
			$arTemplateParameters['CATALOG_MESS_RELATIVE_QUANTITY_MANY'] = array(
				'PARENT' => 'VISUAL',
				'NAME' => GetMessage('CP_BC_TPL_MESS_RELATIVE_QUANTITY_MANY'),
				'TYPE' => 'STRING',
				'DEFAULT' => GetMessage('CP_BC_TPL_MESS_RELATIVE_QUANTITY_MANY_DEFAULT')
			);
			$arTemplateParameters['CATALOG_MESS_RELATIVE_QUANTITY_FEW'] = array(
				'PARENT' => 'VISUAL',
				'NAME' => GetMessage('CP_BC_TPL_MESS_RELATIVE_QUANTITY_FEW'),
				'TYPE' => 'STRING',
				'DEFAULT' => GetMessage('CP_BC_TPL_MESS_RELATIVE_QUANTITY_FEW_DEFAULT')
			);
		}
	}

	$arTemplateParameters['FILL_ITEM_ALL_PRICES'] = array(
		'PARENT' => 'PRICE',
		'NAME' => Loc::getMessage('RS_MM_FILL_ITEM_ALL_PRICES'),
		"TYPE" => 'CHECKBOX',
		"DEFAULT" => 'N',
	);

	if (Loader::includeModule('redsign.devfunc'))
	{
		$arTemplateParameters = array_merge($arTemplateParameters, RSDevFuncParameters::GetTemplateParamsCatalog($arCurrentValues));
		unset($arTemplateParameters['IBLOCK_ID']);
	}
}
else
{
	$arTemplateParameters['CATALOG_PRICE_PROP'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => Loc::getMessage('RS_MM_PRICE_PROP'),
		'TYPE' => 'LIST',
		'VALUES' => $defaultValue + $arAllPropList,
		'DEFAULT' => '-',
	);
	$arTemplateParameters['CATALOG_DISCOUNT_PROP'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => Loc::getMessage('RS_MM_DISCOUNT_PROP'),
		'TYPE' => 'LIST',
		'VALUES' => $defaultValue + $arAllPropList,
		'DEFAULT' => '-',
	);

	$arTemplateParameters['CATALOG_CURRENCY_PROP'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => Loc::getMessage('RS_MM_CURRENCY_PROP'),
		'TYPE' => 'LIST',
		'VALUES' => $defaultValue + $arAllPropList,
		'DEFAULT' => '-',
	);

	$arTemplateParameters['CATALOG_PRICE_DECIMALS'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => Loc::getMessage('RS_MM_PRICE_DECIMALS'),
		'TYPE' => 'LIST',
		'VALUES' => array(
			'0' => '0',
			'1' => '1',
			'2' => '2',
		),
		'DEFAULT' => '0',
	);
}

$arTemplateParameters['SHOW_OLD_PRICE'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => GetMessage('CP_BC_TPL_SHOW_OLD_PRICE'),
	'TYPE' => 'CHECKBOX',
	'DEFAULT' => 'N',
);

$arTemplateParameters['CATALOG_TEMPLATE_VIEW'] = array(
	'PARENT' => 'LIST_SETTINGS',
	'NAME' => GetMessage('RS_MM_TEMPLATE_VIEW'),
	'TYPE' => 'LIST',
	'MULTIPLE' => 'N',
	'DEFAULT' => current(array_keys($arTemplateView)),
	'VALUES' => $arTemplateView
);

/*
$arTemplateParameters['PRODUCT_PREVIEW'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => GetMessage('RS_MM_PRODUCT_PREVIEW'),
	'TYPE' => 'CHECKBOX',
	'DEFAULT' => 'Y'
);
*/
$arTemplateParameters['CATALOG_ADD_TO_BASKET_ACTION'] = array(
	'PARENT' => 'BASKET',
	'NAME' => GetMessage('CP_BC_TPL_SECTION_ADD_TO_BASKET_ACTION'),
	'TYPE' => 'LIST',
	'VALUES' => array_diff_key($addToBasketActions, array('BUY1CLICK' => '')),
	'DEFAULT' => 'ADD',
	'REFRESH' => 'N',
	//'HIDDEN' => (!$useCommonSettingsBasketPopup ? 'N' : 'Y')
);

/*
$arTemplateParameters['MESS_BTN_BUY'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => GetMessage('CP_BC_TPL_MESS_BTN_BUY'),
	'TYPE' => 'STRING',
	'DEFAULT' => GetMessage('CP_BC_TPL_MESS_BTN_BUY_DEFAULT')
);
*/
$arTemplateParameters['MESS_BTN_ADD_TO_BASKET'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => GetMessage('CP_BC_TPL_MESS_BTN_ADD_TO_BASKET'),
	'TYPE' => 'STRING',
	'DEFAULT' => GetMessage('CP_BC_TPL_MESS_BTN_ADD_TO_BASKET_DEFAULT')
);
$arTemplateParameters['MESS_BTN_COMPARE'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => GetMessage('CP_BC_TPL_MESS_BTN_COMPARE'),
	'TYPE' => 'STRING',
	'DEFAULT' => GetMessage('CP_BC_TPL_MESS_BTN_COMPARE_DEFAULT')
);
$arTemplateParameters['MESS_BTN_DETAIL'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => GetMessage('CP_BC_TPL_MESS_BTN_DETAIL'),
	'TYPE' => 'STRING',
	'DEFAULT' => GetMessage('CP_BC_TPL_MESS_BTN_DETAIL_DEFAULT')
);
$arTemplateParameters['MESS_NOT_AVAILABLE'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => GetMessage('CP_BC_TPL_MESS_NOT_AVAILABLE'),
	'TYPE' => 'STRING',
	'DEFAULT' => GetMessage('CP_BC_TPL_MESS_NOT_AVAILABLE_DEFAULT')
);
$arTemplateParameters['MESS_BTN_SUBSCRIBE'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => Loc::getMessage('CP_BC_TPL_MESS_BTN_SUBSCRIBE'),
	'TYPE' => 'STRING',
	'DEFAULT' => Loc::getMessage('CP_BC_TPL_MESS_BTN_SUBSCRIBE_DEFAULT')
);

	$arTemplateParameters['SHOW_ARTNUMBER'] = array(
		'PARENT' => 'VISUAL',
		'NAME' => GetMessage('RS_MM_SHOW_ARTNUMBER'),
		'TYPE' => 'CHECKBOX',
		'DEFAULT' => 'N',
		'REFRESH' => 'Y'
	);

	if (isset($arCurrentValues['SHOW_ARTNUMBER']) && $arCurrentValues['SHOW_ARTNUMBER'] === 'Y')
	{
		$arTemplateParameters['ARTNUMBER_PROP'] = array(
			'PARENT' => 'VISUAL',
			'NAME' => Loc::getMessage('RS_MM_ARTNUMBER_PROP'),
			'TYPE' => 'LIST',
			'VALUES' => $defaultValue + $arAllPropList,
			'DEFAULT' => '-',
		);
	}
}

$arTemplateParameters['LIST_USE_VOTE_RATING'] = array(
	'PARENT' => 'LIST_SETTINGS',
	'NAME' => GetMessage('CP_BC_TPL_DETAIL_USE_VOTE_RATING'),
	'TYPE' => 'CHECKBOX',
	'DEFAULT' => 'N',
	'REFRESH' => 'Y'
);

if (
	isset($arCurrentValues['LIST_USE_VOTE_RATING']) && 'Y' == $arCurrentValues['LIST_USE_VOTE_RATING']
)
{
	$arTemplateParameters['DETAIL_VOTE_DISPLAY_AS_RATING'] = array(
		'PARENT' => 'DETAIL_SETTINGS',
		'NAME' => GetMessage('CP_BC_TPL_DETAIL_VOTE_DISPLAY_AS_RATING'),
		'TYPE' => 'LIST',
		'VALUES' => array(
			'rating' => GetMessage('CP_BC_TPL_DVDAR_RATING'),
			'vote_avg' => GetMessage('CP_BC_TPL_DVDAR_AVERAGE'),
		),
		'DEFAULT' => 'rating'
	);

	$arTemplateParameters['SHOW_RATING'] = array(
		"NAME" => GetMessage("RS_MM_SHOW_RATING"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "N",
	);
}

$arTemplateParameters['USE_ENHANCED_ECOMMERCE'] = array(
	'PARENT' => 'ANALYTICS_SETTINGS',
	'NAME' => GetMessage('CP_BC_TPL_USE_ENHANCED_ECOMMERCE'),
	'TYPE' => 'CHECKBOX',
	'REFRESH' => 'Y',
	'DEFAULT' => 'N'
);

if (isset($arCurrentValues['USE_ENHANCED_ECOMMERCE']) && $arCurrentValues['USE_ENHANCED_ECOMMERCE'] === 'Y')
{
	$arTemplateParameters['DATA_LAYER_NAME'] = array(
		'PARENT' => 'ANALYTICS_SETTINGS',
		'NAME' => GetMessage('CP_BC_TPL_DATA_LAYER_NAME'),
		'TYPE' => 'STRING',
		'DEFAULT' => 'dataLayer'
	);
	$arTemplateParameters['CATALOG_BRAND_PROPERTY'] = array(
		'PARENT' => 'ANALYTICS_SETTINGS',
		'NAME' => GetMessage('CP_BC_TPL_BRAND_PROPERTY'),
		'TYPE' => 'LIST',
		'MULTIPLE' => 'N',
		'DEFAULT' => '',
		'VALUES' => $defaultValue + $arAllPropList
	);
}

$arTemplateParameters['LIST_DISPLAY_PREVIEW_TEXT'] = array(
	'PARENT' => 'LIST_SETTINGS',
	'NAME' => Loc::getMessage('RS_MM_DISPLAY_PREVIEW_TEXT'),
	'TYPE' => 'CHECKBOX',
	'DEFAULT' => 'Y',
	'REFRESH' => 'Y',
);

if ($arCurrentValues['LIST_DISPLAY_PREVIEW_TEXT'] == 'Y')
{
	$arTemplateParameters['PREVIEW_TRUNCATE_LEN'] = array(
		'PARENT' => 'LIST_SETTINGS',
		'NAME' => GetMessage('RS_MM_PREVIEW_TRUNCATE_LEN'),
		'TYPE' => 'STRING',
		'DEFAULT' => '',
	);
}

// MEGAMART
if (Loader::includeModule('redsign.megamart'))
{
	$arTemplateParameters['LIST_TEMPLATE'] = array(
		'PARENT' => 'LIST_SETTINGS',
		'NAME' => Loc::getMessage('RS_MM_LIST_TEMPLATE'),
		'TYPE' => 'LIST',
		'VALUES' => $arCSTemplates,
		'DEFAULT' => 'catalog', // in_array('catalog', $arCSTemplates) ? 'catalog' : $arCSTemplates[0],
		'REFRESH' => 'Y',
	);
}
	
if (ModuleManager::isModuleInstalled('redsign.favorite'))
{
	$arTemplateParameters['USE_FAVORITE'] = array(
		'NAME' => getMessage('RS_MM_USE_FAVORITE'),
		'TYPE' => 'CHECKBOX',
		'MULTIPLE' => 'N',
		'VALUE' => 'Y',
		'DEFAULT' =>'N',
		'REFRESH'=> 'Y',
	);

	if ($arCurrentValues['USE_FAVORITE'] == 'Y')
	{
		$arTemplateParameters['FAVORITE_COUNT_PROP'] = array(
			'NAME' => getMessage('RS_MM_FAVORITE_COUNT_PROP'),
			'TYPE' => 'LIST',
			'VALUES' => $defaultValue + $arAllPropList,
			'DEFAULT' => '-',
		);
/*
		$arTemplateParameters['MESS_BTN_FAVORITE'] = array(
			'PARENT' => 'VISUAL',
			'NAME' => getMessage('RS_MM_MESS_BTN_FAVORITE'),
			'TYPE' => 'STRING',
			'DEFAULT' => getMessage('RS_MM_MESS_BTN_FAVORITE_DEFAULT'),
		);
*/
	}
}