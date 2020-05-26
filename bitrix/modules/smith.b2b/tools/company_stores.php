<?

use \Smith\B2B\Company;

define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

\Bitrix\Main\Loader::includeModule('smith.b2b');

$request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();

$arResult = false;

if ($request->isPost()) {

    global $USER;

    $clientId = $APPLICATION->get_cookie("B2B_CLIENT_ID", COption::GetOptionString("main", "cookie_name", "BITRIX_SM"));
    if ($clientId) {
        $company = Company::getByID($clientId);
    } else {
        $company = Company::getByID($USER->GetID());
    }

    if ($company)
    {
        $arResult = $company->getStores();
    }

    echo CUtil::PhpToJSObject($arResult);
}

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");