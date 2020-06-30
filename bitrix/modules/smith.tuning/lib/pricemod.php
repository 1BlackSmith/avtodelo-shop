<?
namespace Smith\Tuning;

use \Bitrix\Main\Loader;
use \CCurrencyRates;

use \Bitrix\Catalog\PriceTable;

use \Smith\B2B\CompanyBase;
use \Smith\B2B\ProductGroups;

class PriceMod extends PriceModBase
{   
    protected $arResult;
    protected $arItemPrices;

    protected $arBasePrice;
    protected $selectedPriceId;

    protected $company;
    protected $groupAgreements;
    protected $individualAgreements;
    protected $productId;

    const SELECTED_PRICE_CODE = 'ITEM_PRICE_SELECTED';

    function __construct(&$arResult)
    {
        Loader::IncludeModule("currency");
        $this->arResult =& $arResult;
        $this->productId = (int)$this->arResult['ID'];

        if (count($this->arResult['PRICES'] > 1)) {
            $this->obtainBasePrice();
            $this->selectedPriceId = $arResult[self::SELECTED_PRICE_CODE];

            $this->obtainCompany();
            $this->obtainAgreements();
            if ($price = $this->getAgreementPrice()) {
                $this->arResult['ITEM_PRICES'][$this->selectedPriceId] = array_merge($this->arResult['ITEM_PRICES'][$this->selectedPriceId], $price);
            }
        }
    }

    public function refreshCurPrice() 
    {
        static::setPriceItem($this->arResult, $this->arBasePrice);
    }

    protected function getAccessPrices()
    {
        $arAccessGroups = static::getAccessPricesId();
        $arGroups = static::getPriceGroups($arAccessGroups);

        $arPrices = array();
        $rsPrices = PriceTable::getList(array(
            'filter' => array('=PRODUCT_ID' => $this->productId, '@CATALOG_GROUP_ID' => $arAccessGroups),
            'order' => array('CATALOG_GROUP_ID' => 'ASC'),
        ))->fetchAll();
        foreach ($rsPrices as $price) {
            $arPrices[$price['CATALOG_GROUP_ID']] = $price;
        }
        unset($rsPrices, $price);

        $res = array();
        foreach ($arAccessGroups as $id) {
            $group = $arGroups[$id];
            $price = $arPrices[$id];

            $res[$group['NAME']] = array(
                'ID' => $price['PRICE'], 
                'PRICE_ID' => $group['ID'],
                'VALUE' => $price['PRICE'],
                'CURRENCY' => $price['CURRENCY'],
                'PRINT_VALUE' => CurrencyFormat(CCurrencyRates::ConvertCurrency($price['PRICE'], $price['CURRENCY'], "RUB"), "RUB")
            );
        }

        return $res;
    }

    protected function getAgreementPrice() 
    {
        if (is_set($agreement = $this->individualAgreements[$this->productId])) {
            if (static::checkAgreementDate($agreement)) {
                return static::setProductPrice($agreement);
            }
        }

        if (is_set($this->groupAgreements)) {
            $minPriceGroup = 0;
            foreach ($this->groupAgreements as $agreement) {
                if (ProductGroups::hasProduct($agreement['CATALOG_GROUP'], $this->productId) &&
                    static::checkAgreementDate($agreement) &&
                    $agreement['PRICE_GROUP'] >= $minPriceGroup) {
                    $minPriceGroup = $agreement['PRICE_GROUP'];
                }
            }
            unset($agreement);

            if ($minPriceGroup) {
                return $this->getPriceByGroup($minPriceGroup);
            }
        }

        return false;
    }

    protected function getPriceByGroup($priceGroup)
    {
        $rsPrice = PriceTable::getRow(array(
            'filter' => array('=PRODUCT_ID' => $this->productId, '=CATALOG_GROUP_ID' => $priceGroup)
        ));
        return static::setProductPrice($rsPrice);
    }

    protected function obtainBasePrice()
    {
        $basePriceCode = static::getBasePriceCode();

        if ($basePriceCode) {
            $this->arBasePrice = $this->arResult['PRICES'][$basePriceCode];
        }
    }

    protected function obtainCompany()
    {
        $this->company = static::getCompany();
    }

    protected function obtainAgreements() 
    {
        if ($this->company instanceof CompanyBase) {
            $this->groupAgreements = $this->company->getGroupAgreements();

            $individualAgreements = $this->company->getIndividualAgreements();
            foreach ($individualAgreements as $agreement) {
                $this->individualAgreements[$agreement['PRODUCT']] = $agreement;
            }
        }
    }
}