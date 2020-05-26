<?
namespace Smith\B2B\Internals;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;

class TradeAgreementGroupTable extends DataManager
{   
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getObjectClass()
    {
        return TradeAgreementGroup::class;
    }

    public static function getCollectionClass()
    {
        return TradeAgreementsGroup::class;
    }

    public static function getTableName()
    {
        return "b_smith_b2b_trade_agreement_grop";
    }

    public static function getUfId()
    {
        return "b_smith_b2b_trade_agreement_grop";
    }

    public static function getMap()
    {
        return array(
            new Fields\IntegerField('ID', array(
                'primary'      => true,
                'autocomplete' => true,
            )),
            new Fields\IntegerField('COMPANY', array(
                'required' => true,
                'column_name' => 'COMPANY_ID'
            )),
            new Fields\IntegerField('CATALOG_GROUP', array(
                'required' => true,
                'column_name' => 'CATALOG_GROUP_ID'
            )),
            new Fields\IntegerField('PRICE_GROUP', array(
                'required' => true,
                'column_name' => 'PRICE_GROUP_ID'
            )),
            new Fields\DateField('BEGIN', array(
                'column_name' => 'DATE_BEGIN'
            )),
            new Fields\DateField('END', array(
                'column_name' => 'DATE_END'
            )),
        );
    }
}