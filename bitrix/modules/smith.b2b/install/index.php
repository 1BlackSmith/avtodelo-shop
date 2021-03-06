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

Class SMITH_B2B extends CModule
{
    const MODULE_ID = "smith.b2b";

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
        $this->MODULE_NAME         = Loc::GetMessage("SMITH_B2B_MODULE_NAME");
        $this->MODULE_DESCRIPTION  = Loc::GetMessage("SMITH_B2B_MODULE_DESCRIPTION");

        $this->PARTNER_NAME = Loc::GetMessage("SMITH_B2B_MODULE_PARTNER_NAME");
        $this->PARTNER_URI  = Loc::GetMessage("SMITH_B2B_MODULE_PARTNER_URI");

        $this->PAYMENT_HANDLER_PATH = $_SERVER["DOCUMENT_ROOT"] . "/bitrix/php_interface/include/sale_payment/" . str_replace(".", "_", $this->MODULE_ID) . "/";
    }

    function DoInstall()
    {
        global $APPLICATION;

        if (!IsModuleInstalled("smith.b2b"))
        {
            if (self::isVersionD7()) {
                ModuleManager::RegisterModule($this->MODULE_ID);

                $this->InstallFiles();
                $this->InstallDB();
                $this->InstallSettings();
                $this->InstallEvents();

                $APPLICATION->IncludeAdminFile(Loc::getMessage("SMITH_B2B_INSTALL_TITLE"), $this->getPath()."/install/step.php");
            } else {
                $APPLICATION->ThrowException(Loc::getMessage("SMITH_B2B_INSTALL_ERROR_VERSION"));
            }
        } else {
            $APPLICATION->ThrowException(Loc::getMessage("SMITH_B2B_INSTALL_ALREADY_INSTALLED"));
        }
    }

    function InstallFiles()
    {
        CopyDirFiles($this->getPath().'/install/js', $_SERVER['DOCUMENT_ROOT'].'/bitrix/js', true, true);
        CopyDirFiles($this->getPath().'/install/tools', $_SERVER['DOCUMENT_ROOT'].'/bitrix/tools', true, true);

        if (Directory::isDirectoryExists($path = $this->getPath()."/admin"))
        {
            if ($dir = opendir($path))
            {
                while (false !== $item = readdir($dir))
                {
                    if (in_array($item, $exclusionAdminFiles)) 
                        continue;

                    file_put_contents($file = $_SERVER["DOCUMENT_ROOT"].'/bitrix/admin/'.self::MODULE_ID.'_'.$item,
                    '<'.'? require($_SERVER["DOCUMENT_ROOT"]'.$this->getPath(true).'/admin/'.$item.'");?'.'>');
                }

                closedir($dir);
            }
        }
    }

    function InstallDB()
    {
        global $DB, $DBType, $APPLICATION;

        $errors = false;

        $errors = $DB->RunSQLBatch($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/smith.b2b/install/db/".$DBType."/install.sql");

        if ($errors !== false)
        {
            $APPLICATION->ThrowException(implode("", $errors));
            return false;
        }
    }

    function InstallSettings()
    {
    }

    function InstallEvents()
    {
        $eventManager = EventManager::getInstance();
        $eventManager->registerEventHandler('main', 'OnBeforeProlog', $this->MODULE_ID, '\Smith\B2B\Handlers\Auth', 'OnBeforeProlog');

        $eventManager->registerEventHandler('sale', 'OnSaleOrderSaved', $this->MODULE_ID, '\Smith\B2B\Handlers\OrderSave', 'OnSaleOrderSaved');
        $eventManager->registerEventHandler('sale', 'registerInputTypes', $this->MODULE_ID, '\Smith\B2B\Handlers\InputTypes', 'registerInputTypes');

        $eventManager->registerEventHandler('main', 'OnAdminTabControlBegin', $this->MODULE_ID, '\Smith\B2B\Handlers\User', 'OnAdminTabControlBegin');
        $eventManager->registerEventHandler('main', 'OnAfterUserAdd', $this->MODULE_ID, '\Smith\B2B\Handlers\User', 'OnAfterUserAdd');
        $eventManager->registerEventHandler('main', 'OnAfterUserUpdate', $this->MODULE_ID, '\Smith\B2B\Handlers\User', 'OnAfterUserUpdate');
        $eventManager->registerEventHandler('main', 'OnBeforeUserDelete', $this->MODULE_ID, '\Smith\B2B\Handlers\User', 'OnBeforeUserDelete');
    }

    function DoUninstall()
    {
        global $APPLICATION;

        $context = Application::getInstance()->getContext();
        $request = $context->getRequest();

        if ($request["step"] < 2) {
            $APPLICATION->IncludeAdminFile(Loc::getMessage("SMITH_B2B_UNINSTALL_TITLE"), $this->getPath()."/install/unstep1.php");
        }
        elseif ($request["step"] == 2) 
        {
            $this->UninstallEvents();
            $this->UninstallFiles();
            $this->UninstallSettings();

            if ($request['savedata'] != 'Y') {
                $this->UninstallDB();
            }

            ModuleManager::UnRegisterModule($this->MODULE_ID);

            $APPLICATION->IncludeAdminFile(Loc::getMessage("SMITH_B2B_UNINSTALL_TITLE"), $this->getPath()."/install/unstep2.php");
        }
    }

    function UninstallFiles()
    {
        DeleteDirFilesEx("/bitrix/js/smith.b2b/");
        DeleteDirFilesEx("/bitrix/tools/smith.b2b/");
        
        if (Directory::isDirectoryExists($path = $this->getPath().'/admin'))
        {
            if ($dir = opendir($path))
            {
                while (false !== $item = readdir($dir))
                {
                    if (in_array($item, $this->exclusionAdminFiles)) 
                        continue;

                    File::deleteFile($_SERVER['DOCUMENT_ROOT'].'/bitrix/admin/'.$this->MODULE_ID.'_'.$item);
                }

                closedir($dir);
            }
        }
    }

    function UninstallDB()
    {
        global $APPLICATION, $DB, $DOCUMENT_ROOT;

        $errors = $DB->RunSQLBatch($DOCUMENT_ROOT."/bitrix/modules/smith.b2b/install/db/".strtolower($DB->type)."/uninstall.sql");

        if (!empty($errors))
        {
            $APPLICATION->ThrowException(implode("", $errors));
            return false;
        }

        Option::delete($this->MODULE_ID);
    }

    function UninstallSettings()
    {
    }

    function UninstallEvents()
    {
        $eventManager = EventManager::getInstance();
        $eventManager->unRegisterEventHandler('main', 'OnBeforeProlog', $this->MODULE_ID, '\Smith\B2B\Handlers\Auth', 'OnBeforeProlog');

        $eventManager->unRegisterEventHandler('sale', 'OnSaleOrderSaved', $this->MODULE_ID, '\Smith\B2B\Handlers\OrderSave', 'OnSaleOrderSaved');
        $eventManager->unRegisterEventHandler('sale', 'registerInputTypes', $this->MODULE_ID, '\Smith\B2B\Handlers\InputTypes', 'registerInputTypes');

        $eventManager->unRegisterEventHandler('main', 'OnAdminTabControlBegin', $this->MODULE_ID, '\Smith\B2B\Handlers\User', 'OnAdminTabControlBegin');
        $eventManager->unRegisterEventHandler('main', 'OnAfterUserAdd', $this->MODULE_ID, '\Smith\B2B\Handlers\User', 'OnAfterUserAdd');
        $eventManager->unRegisterEventHandler('main', 'OnAfterUserUpdate', $this->MODULE_ID, '\Smith\B2B\Handlers\User', 'OnAfterUserUpdate');
        $eventManager->unRegisterEventHandler('main', 'OnBeforeUserDelete', $this->MODULE_ID, '\Smith\B2B\Handlers\User', 'OnBeforeUserDelete');

        self::unRegisterEventHandler();
    }

    function GetModuleRightList()
    {
        return array(
            "reference_id" => array("D", "K", "S", "W"),
            "reference" => array(
                "[D] ". Loc::getMessage("SMITH_B2B_DENIED"),
                "[K] ". Loc::getMessage("SMITH_B2B_READ_COMPONENT"),
                "[S] ". Loc::getMessage("SMITH_B2B_WRITE_SETTINGS"),
                "[W] ". Loc::getMessage("SMITH_B2B_FULL"),
            ),
        );
    }

    // Вспомагательные методы /////////////////////////////////////////////////////////

    function getPath($notDocumetnRoot = false)
    {
        if ($notDocumetnRoot) {
            return str_ireplace($_SERVER["DOCUMENT_ROOT"], "", dirname(__DIR__));
        } else {
            return dirname(__DIR__);
        }
    }

    static function isVersionD7()
    {
        return CheckVersion(ModuleManager::getVersion("main"), "14.00.00");
    }

    public static function unRegisterEventHandler()
    {
        $con = Application::getConnection();
        $sqlHelper = $con->getSqlHelper();

        $strSql =
        "DELETE FROM b_module_to_module ".
        "WHERE TO_MODULE_ID='".$sqlHelper->forSql(self::MODULE_ID)."';";

        $con->queryExecute($strSql);
    }
}