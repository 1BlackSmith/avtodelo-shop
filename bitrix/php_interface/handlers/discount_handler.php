<?php
use Bitrix\Main;
use Bitrix\Sale;

CModule::IncludeModule('sale');

Main\EventManager::getInstance()->AddEventHandler(
    'sale',
    'OnSaleDiscountPresetBuildList',
    [
        'DiscountHandler',
        'OnSaleDiscountPresetBuildList'
    ]
);

class DiscountHandler
{
    public static function OnSaleDiscountPresetBuildList()
    {
        \Bitrix\Main\IO\File::putFileContents($_SERVER['DOCUMENT_ROOT'] . '/log3.txt', print_r(123123, true));
    }
}
