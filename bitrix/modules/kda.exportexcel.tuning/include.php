<?
\Bitrix\Main\Loader::includeModule("kda.exportexcel");

$arClasses = array(
    "CKDAExportExcelTuning" => "classes/general/exportexcel.php",
    "CKDAExportExcelRunnerTuning" => "classes/general/exportexcelrunner.php",
);

CModule::AddAutoloadClasses("kda.exportexcel.tuning", $arClasses);