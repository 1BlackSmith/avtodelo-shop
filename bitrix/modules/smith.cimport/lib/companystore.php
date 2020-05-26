<?

namespace Smith\CIMPORT;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;
use \Bitrix\Main\ORM\Fields\Relations;
use \Bitrix\Main\ORM\Query\Join;

use \Bitrix\Main\Config\Option;
use \Bitrix\Main\UserTable;
use \Smith\CIMPORT\CompanyPropTable;
use \Smith\CIMPORT\ManagerForStoreTable;

class CompanyStoreTable extends DataManager
{   
    const MODULE_ID = 'smith.cimport';
    
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getTableName()
    {
        return "b_smith_b2b_company_store";
    }

    public static function getUfId()
    {
        return "b_smith_b2b_company_store";
    }

    public static function getMap()
    {
        return array(
            new Fields\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            (new Relations\OneToMany(
                'MANAGERS', 
                ManagerForStoreTable::class, 
                'STORE'
            ))->configureJoinType('inner'),

            new Fields\IntegerField('COMPANY_ID', array(
                'required' => true
            )),
            (new Relations\Reference(
                'COMPANY',
                CompanyPropTable::class,
                Join::on('this.COMPANY_ID', 'ref.ID')
            ))->configureJoinType('inner'),

            new Fields\StringField('ADDRESS', array(
                'required' => true
            )),

            new Fields\StringField('NAME', array(
                'required' => true
            )),

            new Fields\IntegerField('PHONE', array(
                'required' => true
            )),

            new Fields\StringField('EMAIL', array(
                'required' => true
            )),
        );
    }
}