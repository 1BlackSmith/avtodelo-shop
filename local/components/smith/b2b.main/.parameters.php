<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

use Bitrix\Main\Localization\Loc;

$arUserFields = array();
foreach (\Bitrix\Main\UserTable::getMap() as $CODE => $field) {
    if ($message = Loc::getMessage('B2B_MAIN_FIELDS_'. $CODE)) 
    {
        $arUserFields[$CODE] = $message;
    }
}

$arComponentParameters = array(
	"GROUPS" => array(
		"ACCOUNT_FIELDS_SETS" => array("NAME" => GetMessage("2B2_ACCOUNT_FIELDS_SETS"), "SORT" => "150")
	),
	"PARAMETERS" => array(
		"ACCOUNT_FIELDS" => Array(
			"NAME" => GetMessage("2B2_ACCOUNT_FIELDS"),
			"PARENT" => "ACCOUNT_FIELDS_SETS",
			"TYPE" => "LIST",
			"DEFAULT" => $arUserFields,
			"VALUES" => $arUserFields,
			"MULTIPLE" => "Y",
			"ADDITIONAL_VALUES" => "N"
		),
		"NOINDEX" => array(
			"NAME" => GetMessage("adv_banner_params_noindex"),
			"PARENT" => "BASE",
			"TYPE" => "CHECKBOX",
			"DEFAULT" => "N",	
		),
		"QUANTITY" => array(
			"NAME" => GetMessage("ADV_QUANTITY"),
			"PARENT" => "BASE",
			"TYPE" => "STRING",
			"DEFAULT" => "1"
		),
		"CACHE_TIME" => Array("DEFAULT"=>"0"),
	)
);
