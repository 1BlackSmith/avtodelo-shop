<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;

if ($arParams['SET_TITLE'] == 'Y')
{
    $APPLICATION->SetTitle(Loc::getMessage("SPS_TITLE_MAIN"));
}

$APPLICATION->AddChainItem(Loc::getMessage("SPS_TITLE_MAIN"));

$layout = new \Redsign\MegaMart\Layouts\Section();
$layout
    ->addModifier('bg-white')
    ->addModifier('shadow')
    ->addModifier('inner-spacing')
    ->addModifier('outer-spacing');
    
$layout->start();

?><?$APPLICATION->IncludeComponent(
    "smith:b2b.lk.main",
    "",
    Array(),
    $component
);?>

<?
$layout->end();
?>