<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;
?>

<?$APPLICATION->IncludeComponent(
    "smith:b2b.forms", 
    "main", 
    array(
        "AJAX_MODE" => "Y",
        "AJAX_OPTION_ADDITIONAL" => "",
        "AJAX_OPTION_HISTORY" => "N",
        "AJAX_OPTION_JUMP" => "N",
        "AJAX_OPTION_STYLE" => "Y",
        "COMPONENT_TEMPLATE" => "product",
        "COMPOSITE_FRAME_MODE" => "A",
        "COMPOSITE_FRAME_TYPE" => "AUTO",
        "EMAIL_TO" => "sale@chistota-shop.ru",
        "EVENT_TYPE" => "B2B_UPDATE_COMPANY",
        "FIELD_PARAMS" => "",
        "IBLOCK_ID" => "46",
        "IBLOCK_TYPE" => "forms",
        "SUCCESS_MESSAGE" => "Заявка успешно отправлена",
        "USER_CONSENT" => "Y",
        "USER_CONSENT_ID" => "1",
        "USER_CONSENT_IS_CHECKED" => "Y",
        "USER_CONSENT_IS_LOADED" => "N",
        "USE_CAPTCHA" => "Y",
        "VALUES" => $arResult['VALUES']
    ),
    false
);?>