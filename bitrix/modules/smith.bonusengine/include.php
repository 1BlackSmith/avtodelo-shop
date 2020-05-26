<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

use \Bitrix\Main\EventManager;

$arClasses = array(
    "SBHandlersCallback"                 => "classes/general/hadlerscallback.php", 
    "SBHandlers"                         => "classes/general/handlers.php",

    "Smith\\Bonusengine\\SBEventManager" => "classes/general/eventmanager.php",
);

CModule::AddAutoloadClasses("smith.bonusengine", $arClasses);

EventManager::getInstance()->addEventHandler(
    "socialservices",
    "OnBindSocialservicesUser",
    function() {}
);