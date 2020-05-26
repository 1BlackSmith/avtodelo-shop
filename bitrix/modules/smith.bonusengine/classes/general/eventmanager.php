<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

namespace Smith\Bonusengine;

use \Bitrix\Main\EventManager;

class SBEventManager extends EventManager
{
    protected static function getAllEventHanglers()
    {
        $eventManager = self::getInstance();

        if (!$eventManager->isHandlersLoaded)
        {
            $eventManager->loadEventHandlers();
        }

        return $eventManager->handlers;
    }

    public static function getModulesList()
    {
        /** @var Array $arModules [0 => modulename] */
        $arModules = array();

        $arrEventsResult = self::getAllEventHanglers();
        foreach ($arrEventsResult as $module => $arEvent) {
            $arModules[] = $module;
        }

        return $arModules;
    }

    public static function getModuleEventsList($module)
    {
        /** @var Array $arEvents [0 => modulename] */
        $arEvents = array();

        $arrEventsResult = self::getAllEventHanglers();

        foreach ($arrEventsResult[strtoupper($module)] as $eventName => $event) {
            $arEvents[] = $eventName;
        }

        return $arEvents;
    }
}