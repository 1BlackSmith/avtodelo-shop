<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

use Bitrix\Main\Localization\Loc;

$arComponentParameters = array(
	"GROUPS" => array(
	),
	"PARAMETERS" => array(
		"BACKURL" => Array(
			"NAME" => GetMessage("SPS_2B2_RIGHTS_CHECK_BACKURL"),
			"TYPE" => "STRING",
			"MULTIPLE" => "N",
			"DEFAULT" => "",
			"PARENT" => "BASE",
		),
		"GO_AUTH" => array(
			"NAME" => GetMessage("SPS_2B2_RIGHTS_CHECK_GO_AUTH"),
			"TYPE" => "CHECKBOX",
			"DEFAULT" => "Y",
			"PARENT" => "BASE",
			"REFRESH" => "Y"
		),
		"SHOW_EXIT_BTN" => array(
			"NAME" => GetMessage("SPS_2B2_RIGHTS_CHECK_SHOW_EXIT_BTN"),
			"TYPE" => "CHECKBOX",
			"DEFAULT" => "N",
			"PARENT" => "BASE",
			"REFRESH" => "Y"
		),
	),
);
