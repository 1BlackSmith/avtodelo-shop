<?php

use Bitrix\Main;
use Bitrix\Sale;

use Smith\Tuning\BasketMod;
use Smith\Tuning\BasketModAdd;

CModule::IncludeModule('sale');
CModule::IncludeModule('smith.tuning');

Main\EventManager::getInstance()->AddEventHandler(
    'sale',
    'OnBeforeBasketUpdate',
    [
        'CartHandler',
        'OnBeforeBasketUpdate'
    ]
);

class CartHandler
{
    public function OnBeforeBasketUpdate()
    {
        $bmod = new BasketMod();
    }
}
