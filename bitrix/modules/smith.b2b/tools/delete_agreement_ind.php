<?
use \Smith\B2B\CompanyBase;

define("NO_KEEP_STATISTIC", true);
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

\Bitrix\Main\Loader::includeModule('smith.b2b');

$request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();

$arResult = array(
    'STATUS' => '',
    'ERRORS' => ''
);

if ($request->isPost()) {
    try {
        CompanyBase::deleteAgreementIndividual($request['id']);
        $arResult['STATUS'] = 'OK';
    } catch (Exception $e) {
        $arResult['ERRORS'] = $e->getMessage();
    }

    echo CUtil::PhpToJSObject($arResult);
}

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");