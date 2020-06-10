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
    if (is_set($iblock = $request['IBLOCK_ID']) && 
        is_set($id = $request['id']) &&
        is_set($name = $request['name']) &&
        is_set($group = $request['group'])
    ) 
    {
        if ($group) {
            $name = htmlspecialchars_decode($name);
            if (ProductGroups::checkProduct($id, $iblock, $name)) {
                try {
                    ProductGroups::addProduct($group, $id, true);
                    $arResult['STATUS'] = 'OK';
                } catch (Exception $e) {
                    $arResult['ERRORS'] = $e->getMessage();
                }
            }
        } else {
            $arResult['ERRORS'] = 'Ошибка добавления товара, не задана группа!';
        }
    }

    echo CUtil::PhpToJSObject($arResult);
}

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");