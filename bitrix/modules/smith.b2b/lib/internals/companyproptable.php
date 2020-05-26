<?

namespace Smith\B2B\Internals;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;
use \Bitrix\Main\ORM\Fields\Relations;
use \Bitrix\Main\ORM\Query\Join;

class CompanyPropTable extends DataManager
{       
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getObjectClass()
    {
        return CompanyProp::class;
    }

    public static function getCollectionClass()
    {
        return CompaniesProp::class;
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
                CompanyStoreTable::class, 
                'COMPANY'
            ))->configureJoinType('inner'),

            new Fields\IntegerField('COMPANY_LK_ID', array(
                'required' => true
            )),

            new Fields\StringField('OWNERSHIP_TYPE', array(
                'required' => true
            )),

            new Fields\TextField('NAME', array(
            )),

            new Fields\StringField('BRAND', array(
            )),

            new Fields\StringField('INN', array(
                'required' => true
            )),

            new Fields\StringField('OGRN', array(
            )),

            new Fields\StringField('KPP', array(
            )),

            new Fields\StringField('ADDRESS', array(
            )),
        );
    }
}