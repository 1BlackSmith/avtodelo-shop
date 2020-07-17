<?php

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
	die();
}

use \Bitrix\Main\Loader;
use \Bitrix\Main\Localization\Loc;
use \Redsign\MegaMart\ParametersUtils;

if (Loader::includeModule('redsign.megamart'))
{
	ParametersUtils::addCommonParameters($arTemplateParameters, $arCurrentValues, array('gridSettings'));
}

$arTemplateParameters['RS_TEMPLATE'] = array(
	'PARENT' => 'VISUAL',
	'NAME' => Loc::getMessage('RS_ADV_BANNERS_TEMPLATE'),
	'TYPE' => 'LIST',
	'REFRESH' => 'Y',
	'VALUES' => array(
		'index_full' => Loc::getMessage('RS_ADV_BANNERS_TEMPLATE_INDEX_FULL'),
		'index_mini' => Loc::getMessage('RS_ADV_BANNERS_TEMPLATE_INDEX_MINI'),
		'outer_sidebar' => Loc::getMessage('RS_ADV_BANNERS_TEMPLATE_OUTER_SIDEBAR')
	),
	'DEFAULT' => 'index_full',
);
