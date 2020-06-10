<?
namespace Smith\B2B\Internals;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;
use \Bitrix\Main\ORM\Fields\Relations;
use \Bitrix\Main\ORM\Query\Join;
use \Bitrix\Main\Config\Option;

class GroupProductTable extends DataManager
{   
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getTableName()
    {
        return "b_smith_b2b_group_product";
    }

    public static function getUfId()
    {
        return "b_smith_b2b_group_product";
    }

    public static function getMap()
    {
        return array(
            new Fields\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            new Fields\IntegerField('GROUP_ID', array(
                'required' => true
            )),
            (new Relations\Reference(
                'GROUP',
                '\Smith\B2B\Internals\GroupTable', 
                Join::on('this.GROUP_ID', 'ref.ID')
            ))->configureJoinType('inner'),

            new Fields\IntegerField('PRODUCT_ID', array(
                'required' => true
            ))
        );
    }
}