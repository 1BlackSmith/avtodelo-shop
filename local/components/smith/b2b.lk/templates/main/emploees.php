<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

if ($arParams['SPS_SHOW_EMPLOEES_PAGE'] !== 'Y')
{
    LocalRedirect($arParams['SEF_FOLDER']);
}

use Bitrix\Main\Localization\Loc;

if ($arParams['SET_TITLE'] == 'Y')
{
    $APPLICATION->SetTitle(Loc::getMessage("SPS_TITLE_MAIN"));
}

if (strlen($arParams["MAIN_CHAIN_NAME"]) > 0)
{
    $APPLICATION->AddChainItem(htmlspecialcharsbx($arParams["MAIN_CHAIN_NAME"]), $arResult['SEF_FOLDER']);
}
$APPLICATION->AddChainItem(Loc::getMessage("SPS_TITLE_MAIN"));

$layout = new \Redsign\MegaMart\Layouts\Section();
$layout
    ->addModifier('bg-white')
    ->addModifier('shadow')
    ->addModifier('inner-spacing')
    ->addModifier('outer-spacing');
    
$layout->start();
?>

<?$APPLICATION->IncludeComponent(
    "smith:b2b.lk.stores",
    "",
    array(
    ),
    $component
);?>

<?
$layout->end();
?>