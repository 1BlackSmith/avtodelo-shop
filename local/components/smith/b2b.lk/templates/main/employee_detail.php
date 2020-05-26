<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

if ($arParams['SHOW_EMPLOYEES_PAGE'] !== 'Y')
{
    LocalRedirect($arParams['SEF_FOLDER']);
}

use Bitrix\Main\Localization\Loc;

if (strlen($arParams["MAIN_CHAIN_NAME"]) > 0)
{
    $APPLICATION->AddChainItem(htmlspecialcharsbx($arParams["MAIN_CHAIN_NAME"]), $arResult['SEF_FOLDER']);
}
$APPLICATION->AddChainItem(Loc::getMessage("SPS_TITLE_MAIN"), $arResult['PATH_TO_EMPLOYEES']);

$layout = new \Redsign\MegaMart\Layouts\Section();
$layout
    ->addModifier('bg-white')
    ->addModifier('shadow')
    ->addModifier('inner-spacing')
    ->addModifier('outer-spacing');
    
$layout->start();

$APPLICATION->IncludeComponent(
    "smith:b2b.lk.employees.detail",
    "",
    array(
        'SET_TITLE' => $arParams['SET_TITLE'],
        'ID' => $arResult['VARIABLES']['ID']
    ),
    $component
);

$layout->end();
?>