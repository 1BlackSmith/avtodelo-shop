<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

namespace Smith\Bonusengine;

use \Bitrix\Main\Entity;
use \Bitrix\Main\Config\Option;
use \Bitrix\Main\EventManager;

class EventTable extends Entity\DataManager
{   
    const MODULE_ID = 'smith.bonusengine';
    
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getTableName()
    {
        return "b_smith_bonusengine_event";
    }

    public static function getUfId()
    {
        return "b_smith_bonusengine_event";
    }

    /*public static function getConnectionName()
    {
        return "default";
    }*/

    public static function getMap()
    {
        return array(
            new Entity\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            new Entity\StringField('MODULE_CODE', array(
                'required' => true
            )),
            new Entity\StringField('EVENT_CODE', array(
                'required' => true
            )),
            new Entity\IntegerField('POINTS', array(
                'required' => true
            )),
            new Entity\StringField('SITE_ID', array(
                'required' => true
            ))
        );
    }

    public static function checkEntity($id)
    {
        $rsEvents = self::getList(array(
            'filter' => array('=ID' => $id),
        ));

        if ($arEvent = $rsEvents->fetch()) {
            return true;
        }

        return false;
    }

    public static function onAfterAdd(Entity\Event $event)
    {
        $result = new Entity\EventResult;
        $data = $event->getParameter("fields");

        $eventManager = EventManager::getInstance();

        $eventManager->registerEventHandler(
            $data['MODULE_CODE'],
            $data['EVENT_CODE'],
            self::MODULE_ID,
            "SBHandlersCallback",
            'callback', 100, "",
            array('POINTS' => $data['POINTS'])
        );

        return $result;
    }

    public static function onBeforeUpdate(Entity\Event $event)
    {
        $result = new Entity\EventResult;
        $data = $event->getParameter("fields");
        $id = $event->getParameter("id");
        $curEvent = self::getById($id)->fetch();

        $eventManager = EventManager::getInstance();

        $eventManager->unRegisterEventHandler(
            $curEvent['MODULE_CODE'],
            $curEvent['EVENT_CODE'],
            self::MODULE_ID,
            "SBHandlersCallback",
            'callback', 100, "",
            array('POINTS' => $curEvent['POINTS'])
        ); 

        $eventManager->registerEventHandler(
            $data['MODULE_CODE'],
            $data['EVENT_CODE'],
            self::MODULE_ID,
            "SBHandlersCallback",
            'callback', 100, "",
            array('POINTS' => $data['POINTS'])
        );

        return $result;
    }

    public static function onBeforeDelete(Entity\Event $event)
    {
        $result = new Entity\EventResult;
        $id = $event->getParameter("id");
        $curEvent = self::getById($id)->fetch();

        $eventManager = EventManager::getInstance();

        $eventManager->unRegisterEventHandler(
            $curEvent['MODULE_CODE'],
            $curEvent['EVENT_CODE'],
            self::MODULE_ID,
            "SBHandlersCallback",
            'callback', 100, "",
            array('POINTS' => $curEvent['POINTS'])
        ); 

        return $result;
    }
}