<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

use Bitrix\Main\Localization\Loc;

if ($arParams['SHOW_PRIVATE_PAGE'] !== 'Y')
{
	LocalRedirect($arParams['SEF_FOLDER']);
}

if (strlen($arParams["MAIN_CHAIN_NAME"]) > 0)
{
	$APPLICATION->AddChainItem(htmlspecialcharsbx($arParams["MAIN_CHAIN_NAME"]), $arResult['SEF_FOLDER']);
}
$APPLICATION->AddChainItem(Loc::getMessage("SPS_CHAIN_PRIVATE"));
if ($arParams['SET_TITLE'] == 'Y')
{
	$APPLICATION->SetTitle(Loc::getMessage("SPS_TITLE_PRIVATE"));
}

$layout = new \Redsign\MegaMart\Layouts\Section();
$layout
    ->addModifier('bg-white')
    ->addModifier('shadow')
    ->addModifier('inner-spacing')
    ->addModifier('outer-spacing');
    
$layout->start();

$APPLICATION->IncludeComponent(
	"smith:main.profile",
	"",
	Array(
        "USER_PROPERTY" => array(
            'UF_COMPANY_NAME',
            'UF_COMPANY_ADDRESS',
            'UF_COMPANY_OGRN',
            'UF_COMPANY_INN',
            'UF_COMPANY_KPP',
            'UF_STORES'
        ),
		"SET_TITLE"     => $arParams["SET_TITLE"],
		"AJAX_MODE"     => $arParams['AJAX_MODE_PRIVATE'],
		"SEND_INFO"     => $arParams["SEND_INFO_PRIVATE"],
		"CHECK_RIGHTS"  => $arParams['CHECK_RIGHTS_PRIVATE']
	),
	$component
);

$layout->end();
