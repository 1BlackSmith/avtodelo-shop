<?

namespace Smith\CIMPORT;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;
use \Bitrix\Main\ORM\Fields\Relations;
use \Bitrix\Main\ORM\Query\Join;

use \Bitrix\Main\Config\Option;
use \Bitrix\Main\UserTable;
use \Smith\CIMPORT\CompanyStoreTable;

class ManagerForStoreTable extends DataManager
{   
    const MODULE_ID = 'smith.cimport';
    
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getTableName()
    {
        return "b_smith_b2b_manager_for_store";
    }

    public static function getUfId()
    {
        return "b_smith_b2b_manager_for_store";
    }

    public static function getMap()
    {
        return array(
            new Fields\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            
            new Fields\IntegerField('STORE_ID', array(
                'required' => true
            )),
            (new Relations\Reference(
                'STORE',
                CompanyStoreTable::class,
                Join::on('this.STORE_ID', 'ref.ID')
            ))->configureJoinType('inner'),

            new Fields\IntegerField('USER_ID', array(
                'required' => true
            )),
            (new Relations\Reference(
                'USER',
                UserTable::class,
                Join::on('this.USER_ID', 'ref.ID')
            ))->configureJoinType('inner')
        );
    }

    public static function isUserInStore($userID)
    {
        $user = self::getList(array(
            'select' => array('ID'),
            'filter' => array('=USER_ID' => $userID),
            'limit'  => 1
        ))->fetch();

        if ($user['ID'] > 0)
            return true;

        return false;
    }
}