<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

use \Smith\CIMPORT\SBEventManager;

define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

\Bitrix\Main\Loader::includeModule('smith.cimport');

$request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();

$arResult = array(
    'STATUS' => '',
    'RESULT' => ''
);

if ($request->isPost()) 
{
    $arResult['RESULT'] = SBEventManager::getModuleEventsList($request['module']);
    $arResult['STATUS'] = 'OK';

    echo CUtil::PhpToJSObject($arResult);
}

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");