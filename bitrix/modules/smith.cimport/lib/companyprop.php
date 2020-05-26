<?

namespace Smith\CIMPORT;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;
use \Bitrix\Main\ORM\Fields\Relations;
use \Bitrix\Main\ORM\Query\Join;

use \Bitrix\Main\Config\Option;
use \Bitrix\Main\UserTable;

class CompanyPropTable extends DataManager
{   
    const MODULE_ID = 'smith.cimport';
    
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getTableName()
    {
        return "b_smith_b2b_company_props";
    }

    public static function getUfId()
    {
        return "b_smith_b2b_company_props";
    }

    public static function getMap()
    {
        return array(
            new Fields\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            (new Relations\OneToMany(
                'STORES', 
                ManagerForStoreTable::class, 
                'COMPANY'
            ))->configureJoinType('inner'),

            new Fields\IntegerField('COMPANY_LK_ID', array(
                'required' => true
            )),

            new Fields\StringField('OWNERSHIP_TYPE', array(
                'required' => true
            )),

            new Fields\StringField('NAME', array(
                'required' => true
            )),

            new Fields\StringField('BRAND', array(
                'required' => true
            )),

            new Fields\IntegerField('INN', array(
                'required' => true
            )),

            new Fields\IntegerField('OGRN', array(
                'required' => true
            )),

            new Fields\IntegerField('KPP', array(
                'required' => true
            )),

            new Fields\StringField('ADDRESS', array(
                'required' => true
            )),
        );
    }
}