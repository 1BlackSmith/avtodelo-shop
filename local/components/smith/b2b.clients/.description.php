<?php

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

use \Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);

$arComponentDescription = array(
    'NAME' => Loc::getMessage('B2B_CLIENTS_NAME'),
    'DESCRIPTION' => Loc::getMessage('B2B_CLIENTS_NAME_DESCRIPTION'),
    'PATH' => array(
  	),
);
