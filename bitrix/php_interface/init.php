<?php;
define("LOG_FILENAME", $_SERVER["DOCUMENT_ROOT"]."bxlog.txt");

include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/php_interface/handlers/order_handlers.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/php_interface/handlers/mail_handlers.php');
include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/php_interface/handlers/register_handlers.php');

//Bitrix\Main\IO\File::putFileContents($_SERVER['DOCUMENT_ROOT'] . '/log.txt', print_r(123, true));
