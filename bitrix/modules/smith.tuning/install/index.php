<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;
use \Bitrix\Main\ModuleManager;
use \Bitrix\Main\Config\Option;
use \Bitrix\Main\IO\Directory;
use \Bitrix\Main\IO\File;
use \Bitrix\Main\Loader;
use \Bitrix\Main\EventManager;

Loc::loadMessages(__FILE__);

Class smith_tuning extends CModule
{
    const MODULE_ID = "smith.tuning";

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
        $this->MODULE_NAME         = Loc::GetMessage("SMITH_TUNING_MODULE_NAME");
        $this->MODULE_DESCRIPTION  = Loc::GetMessage("SMITH_TUNING_MODULE_DESCRIPTION");

        $this->PARTNER_NAME = Loc::GetMessage("SMITH_TUNING_MODULE_PARTNER_NAME");
        $this->PARTNER_URI  = Loc::GetMessage("SMITH_TUNING_MODULE_PARTNER_URI");

        $this->PAYMENT_HANDLER_PATH = $_SERVER["DOCUMENT_ROOT"] . "/bitrix/php_interface/include/sale_payment/" . str_replace(".", "_", $this->MODULE_ID) . "/";
    }

    function DoInstall()
    {
        global $APPLICATION;

        if (!IsModuleInstalled("smith.tuning"))
        {
            ModuleManager::RegisterModule($this->MODULE_ID);

            $APPLICATION->IncludeAdminFile(Loc::getMessage("SMITH_TUNING_INSTALL_TITLE"), $this->getPath()."/install/step.php");
        } else {
            $APPLICATION->ThrowException(Loc::getMessage("SMITH_TUNING_INSTALL_ALREADY_INSTALLED"));
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