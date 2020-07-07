<?php if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Main\Loader;
use \Redsign\MegaMart\MyTemplate;

define('GROUP_IDS', [
    'manager' => 27,
    'admin' => 1
  ]
);

$arGroups = CUser::GetUserGroup($USER->GetID());
$res = array_intersect(GROUP_IDS, $arGroups);

// Отображение наличия на складе в виде цифр для заданных групп
$arParams['SHOW_MAX_QUANTITY'] = count($res) ? 'Y' : 'M';