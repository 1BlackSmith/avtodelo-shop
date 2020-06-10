<?
use \Smith\B2B\ProductGroups;

define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

\Bitrix\Main\Loader::includeModule('smith.b2b');

$request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();

$arResult = array(
    'STATUS' => '',
    'ERRORS' => ''
);

if ($request->isPost()) {
    if (is_set($id = $request['id']))
    {
        try {
            ProductGroups::deleteGroup($id);
            $arResult['STATUS'] = 'OK';
        } catch (Exception $e) {
            $arResult['ERRORS'] = $e->getMessage();
        }
    }

    echo CUtil::PhpToJSObject($arResult);
}

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");