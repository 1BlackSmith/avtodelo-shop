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

class BasketTable extends Entity\DataManager
{   
    const MODULE_ID = 'smith.bonusengine';
    
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getTableName()
    {
        return "b_smith_bonusengine_basket";
    }

    public static function getUfId()
    {
        return "b_smith_bonusengine_basket";
    }

    public static function getMap()
    {
        return array(
            new Entity\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            new Entity\IntegerField('USER_ID', array(
                'required' => true
            )),
            new Entity\IntegerField('ORDER_ID'),
            new Entity\FloatField('POINTS', array(
                'required' => true
            )),
            new Entity\StringField('SITE_ID')
        );
    }

    public static function roundPrecision($val)
    {
        $precision = Option::get(self::MODULE_ID, 'POINTS_PRECISION');
        $precision = $precision ? $precision : 1;

        return round($val, $precision);
    }

    public static function isBonusesDebited($fields)
    {
        $result = self::getEntityByFilter($fields);

        if ($result === false) 
            return false;

        if ($result->fetch()) {
            return true;
        }

        return false;
    }

    public static function changeBonuses($filter, $fields)
    {
        if ($id = self::getId($filter)) {
            self::update($id, $fields);
        } else {
            $addResult = self::add($fields);

            if ($addResult->isSuccess())
            {
                return $addResult->getId();
            }
        }
    }

    public static function deleteByFilter($filter)
    {
        if ($id = self::getId($filter))
        {
            self::delete($id);
            return true;
        }

        return false;
    }

    public static function getId($fields)
    {
        $result = self::getEntityByFilter($fields);

        if ($result === false) 
            return false;

        if ($arBasket = $result->fetch()) {
            return $arBasket['ID'];
        }

        return false;
    }

    public static function getBonuses($fields)
    {
        $result = self::getEntityByFilter($fields);

        if ($result === false) 
            return false;

        if ($arBasket = $result->fetch()) {
            return $arBasket['POINTS'];
        }

        return false;
    }

    private static function getEntityByFilter($fields)
    {
        if (is_array($fields)) {
            $filter = array();

            foreach ($fields as $key => $value) {
                switch ($key) {
                    case 'ID':
                        $filter['=ID'] = $value;
                        break;
                    case 'USER_ID':
                        $filter['=USER_ID'] = $value;
                        break;
                    case 'ORDER_ID':
                        $filter['=ORDER_ID'] = $value;
                        break;
                    default:
                        continue;
                }
            }

            if (!isset($filter['=ORDER_ID']))
                $filter['=ORDER_ID'] = null;

            $rsEvents = self::getList(array(
                'filter' => $filter,
            ));

            return $rsEvents;
        }

        return false;
    }
}