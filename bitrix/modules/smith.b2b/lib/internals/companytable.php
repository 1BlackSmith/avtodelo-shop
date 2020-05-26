<?
namespace Smith\B2B\Internals;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;

class CompanyTable extends DataManager
{   
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getObjectClass()
    {
        return Profile::class;
    }

    public static function getCollectionClass()
    {
        return Profiles::class;
    }

    public static function getTableName()
    {
        return "b_smith_b2b_company_user";
    }

    public static function getUfId()
    {
        return "b_smith_b2b_company_user";
    }

    public static function getMap()
    {
        return array(
            new Fields\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            new Fields\IntegerField('COMPANY_ID', array(
                'required' => true
            )),
            new Fields\IntegerField('COMPANY_USER_ID', array(
            )),
            new Fields\IntegerField('COMPANY_MANAGER_ID', array(
            )),
        );
    }
}