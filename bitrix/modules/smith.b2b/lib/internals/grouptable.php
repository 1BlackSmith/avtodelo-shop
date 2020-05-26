<?
namespace Smith\B2B\Internals;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;
use \Bitrix\Main\ORM\Fields\Relations;
use \Bitrix\Main\ORM\Query\Join;
use \Bitrix\Main\Config\Option;

class GroupTable extends DataManager
{   
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getTableName()
    {
        return "b_smith_b2b_group";
    }

    public static function getUfId()
    {
        return "b_smith_b2b_group";
    }

    public static function getMap()
    {
        return array(
            new Fields\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            (new Relations\OneToMany(
                'PRODUCTS', 
                GroupProductTable::class, 
                'GROUP'
            ))->configureJoinType('inner'),
            new Fields\StringField('NAME', array(
                'required' => true
            )),
        );
    }
}