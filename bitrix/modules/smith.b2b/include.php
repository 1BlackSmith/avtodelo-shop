<?

$arClasses = array(
    "B2BUser"     => "classes/general/b2buser.php",
    "B2BCompany"  => "classes/general/b2bcompany.php",
    "B2BManager"  => "classes/general/b2bmanager.php",
    "B2BHandlers" => "classes/general/b2bhandlers.php",
);

CModule::AddAutoloadClasses("smith.b2b", $arClasses);