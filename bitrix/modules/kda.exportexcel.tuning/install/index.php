<?
use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;
use \Bitrix\Main\ModuleManager;
use \Bitrix\Main\Config\Option;
use \Bitrix\Main\IO\Directory;
use \Bitrix\Main\IO\File;
use \Bitrix\Main\Loader;
use \Bitrix\Main\EventManager;

Loc::loadMessages(__FILE__);

Class kda_exportexcel_tuning extends CModule
{
    const MODULE_ID = "kda.exportexcel.tuning";

    var $exclusionAdminFiles;

    function __construct()
    {
        $arModuleVersion = array();
        require(__DIR__."/version.php");

        $this->exclusionAdminFiles = array(
            "..",
            ".",
            "menu.php",
            "operation_description.php",
            "task_description.php"
        );

        $this->MODULE_ID           = self::MODULE_ID;
        $this->MODULE_VERSION      = $arModuleVersion["VERSION"];
        $this->MODULE_VERSION_DATE = $arModuleVersion["VERSION_DATE"];
        $this->MODULE_NAME         = Loc::GetMessage("KDA_EXPORTEXCEL_TUNING_MODULE_NAME");
        $this->MODULE_DESCRIPTION  = Loc::GetMessage("KDA_EXPORTEXCEL_TUNING_MODULE_DESCRIPTION");

        $this->PARTNER_NAME = Loc::GetMessage("KDA_EXPORTEXCEL_TUNING_MODULE_PARTNER_NAME");
        $this->PARTNER_URI  = Loc::GetMessage("KDA_EXPORTEXCEL_TUNING_MODULE_PARTNER_URI");
    }

    function DoInstall()
    {
        global $APPLICATION;

        if (IsModuleInstalled("kda.exportexcel")) {
            if (!IsModuleInstalled("kda.exportexcel.tuning"))
            {
                CopyDirFiles($_SERVER["DOCUMENT_ROOT"].'/bitrix/modules/'.$this->MODULE_ID.'/install/php_interface/', $_SERVER["DOCUMENT_ROOT"].'/bitrix/php_interface/', true, true);
                
                ModuleManager::RegisterModule($this->MODULE_ID);
            } else {
                $APPLICATION->ThrowException(Loc::getMessage("KDA_EXPORTEXCEL_TUNING_INSTALL_ALREADY_INSTALLED"));
            }
        } else {
            $APPLICATION->ThrowException(Loc::getMessage("KDA_EXPORTEXCEL_TUNING_INSTALL_KDA_NOT_ISTALLED"));
        }
    }

    function DoUninstall()
    {
        ModuleManager::UnRegisterModule($this->MODULE_ID);
    }

    function getPath($notDocumetnRoot = false)
    {
        if ($notDocumetnRoot) {
            return str_ireplace($_SERVER["DOCUMENT_ROOT"], "", dirname(__DIR__));
        } else {
            return dirname(__DIR__);
        }
    }
}