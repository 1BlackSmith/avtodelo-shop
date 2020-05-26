<?

$arClasses = array(
    "CompaniesImport"     => "classes/general/companiesimport.php",
    // "CIMPORTCompany"  => "classes/general/b2bcompany.php",
    // "CIMPORTManager"  => "classes/general/b2bmanager.php",
    // "CIMPORTHandlers" => "classes/general/b2bhandlers.php",
);

CModule::AddAutoloadClasses("smith.cimport", $arClasses);