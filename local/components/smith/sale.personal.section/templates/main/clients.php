<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;

if ($arResult['SHOW_B2B_CLIENTS'] !== 'Y')
{
    LocalRedirect($arParams['SEF_FOLDER']);
}

$APPLICATION->AddChainItem(Loc::getMessage("SPS_B2B_CLIENTS"), $arParams['PATH_TO_B2B_CLIENTS']);

if ($arParams['SET_TITLE'] == 'Y')
{
    $APPLICATION->SetTitle(Loc::getMessage("SPS_B2B_CLIENTS"));
}

$layout = new \Redsign\MegaMart\Layouts\Section();
$layout
    ->addModifier('bg-white')
    ->addModifier('shadow')
    ->addModifier('inner-spacing')
    ->addModifier('outer-spacing');
    
$layout->start();

$APPLICATION->IncludeComponent(
    "smith:b2b.clients",
    "",
    Array()
);

$layout->end();