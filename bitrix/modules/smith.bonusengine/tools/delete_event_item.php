<?

use \Smith\Bonusengine\EventTable;

define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

\Bitrix\Main\Loader::includeModule('smith.bonusengine');

$request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();

$arResult = array(
    'STATUS' => '',
    'ERRORS' => ''
);

if ($request->isPost()) {

    $result = EventTable::delete($request['item_id']);

    if ($result->isSuccess())
    {
        $arResult['STATUS'] = 'OK';
    } else {
        $arResult['ERRORS'] = $result->getErrorMessages();
    }

    echo CUtil::PhpToJSObject($arResult);
}

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");