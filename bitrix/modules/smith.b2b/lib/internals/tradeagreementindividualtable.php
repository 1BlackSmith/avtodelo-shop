<?
namespace Smith\B2B\Internals;

use \Bitrix\Main\ORM\Data\DataManager;
use \Bitrix\Main\ORM\Fields;

class TradeAgreementIndividualTable extends DataManager
{   
    public static function getFilePath()
    {
        return __FILE__;
    }

    public static function getObjectClass()
    {
        return TradeAgreementIndividual::class;
    }

    public static function getCollectionClass()
    {
        return TradeAgreementsIndividual::class;
    }

    public static function getTableName()
    {
        return "b_smith_b2b_trade_agreement_individual";
    }

    public static function getUfId()
    {
        return "b_smith_b2b_trade_agreement_individual";
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
            new Fields\IntegerField('PRODUCT', array(
                'required' => true,
                'column_name' => 'PRODUCT_ID'
            )),
            new Fields\FloatField('PRICE', array(
                'required' => true,
            )),
            new Fields\StringField('CURRENCY', array(
                'required' => true,
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