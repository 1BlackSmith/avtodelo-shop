<?
namespace Smith\Tuning;

use \Bitrix\Main\Loader;
use \CCurrencyRates;

use \Bitrix\Catalog\PriceTable;
use \Bitrix\Catalog\GroupTable;
use \Bitrix\Catalog\GroupAccessTable;

use \Smith\B2B\CompanyBase;
use \Smith\B2B\ProductGroups;

class PriceMod
{   
    protected $arResult;
    protected $arItemPrices;

    protected $arBasePrice;
    protected $selectedPriceId;

    protected $company;
    protected $groupAgreements;
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
            if ($price = $this->getGroupAgreementPrice()) {
                $this->arResult['ITEM_PRICES'][$this->selectedPriceId] = array_merge($this->arResult['ITEM_PRICES'][$this->selectedPriceId], $price);
            }
        }
    }

    public function refreshCurPrice() 
    {
        if (count($this->arResult['PRICES']) > 1) {
            $arCurPrice =& $this->arResult['ITEM_PRICES'][$this->selectedPriceId];
            foreach ($arCurPrice as $CODE => &$v) {
                switch ($CODE) {
                    case 'BASE_PRICE':
                        $v = $this->arBasePrice['VALUE'];
                        break;
                    case 'DISCOUNT':
                        $v = $arCurPrice['BASE_PRICE'] - $arCurPrice['PRICE'];
                        break;
                    case 'PERCENT':
                        $v = 100 - round($arCurPrice['PRICE'] / $arCurPrice['BASE_PRICE'] * 100);
                        break;
                    case 'PRINT_PRICE':
                        $v = CurrencyFormat(CCurrencyRates::ConvertCurrency($arCurPrice['PRICE'], $arCurPrice['CURRENCY'], "RUB"), "RUB");
                        break;
                    case 'RATIO_PRICE':
                        $v = $arCurPrice['PRICE'];
                        break;
                    case 'PRINT_RATIO_PRICE':
                        $v = CurrencyFormat(CCurrencyRates::ConvertCurrency($arCurPrice['RATIO_PRICE'], $arCurPrice['CURRENCY'], "RUB"), "RUB");
                        break;
                    case 'PRINT_BASE_PRICE':
                        $v = CurrencyFormat(CCurrencyRates::ConvertCurrency($arCurPrice['BASE_PRICE'], $arCurPrice['CURRENCY'], "RUB"), "RUB");
                        break;
                    case 'RATIO_BASE_PRICE':
                        $v = $arCurPrice['BASE_PRICE'];
                        break;
                    case 'PRINT_RATIO_BASE_PRICE':
                        $v = CurrencyFormat(CCurrencyRates::ConvertCurrency($arCurPrice['RATIO_BASE_PRICE'], $arCurPrice['CURRENCY'], "RUB"), "RUB");
                        break;
                    case 'PRINT_DISCOUNT':
                        $v = CurrencyFormat(CCurrencyRates::ConvertCurrency($arCurPrice['DISCOUNT'], $arCurPrice['CURRENCY'], "RUB"), "RUB");
                        break;
                    case 'RATIO_DISCOUNT':
                        $v = $arCurPrice['DISCOUNT'];
                        break;
                    case 'PRINT_RATIO_DISCOUNT':
                        $v = CurrencyFormat(CCurrencyRates::ConvertCurrency($arCurPrice['RATIO_DISCOUNT'], $arCurPrice['CURRENCY'], "RUB"), "RUB");
                        break;
                }
            }
        }
    }

    protected function getAccessPrices()
    {
        global $USER;
        $arUserGroups = $USER->GetUserGroupArray();

        $arAccessGroups = array();
        $rsAccessGroups = GroupAccessTable::getList(array(
            'filter' => array('@GROUP_ID' => $arUserGroups),
            'group' => array('CATALOG_GROUP_ID')
        ))->fetchAll();
        foreach ($rsAccessGroups as $accessGroup) {
            if (in_array($accessGroup['CATALOG_GROUP_ID'], $arAccessGroups))
                continue;
            $arAccessGroups[] = $accessGroup['CATALOG_GROUP_ID'];
        }
        unset($rsAccessGroups, $accessGroup);

        $arGroups = array();
        $rsGroups = GroupTable::getList(array(
            'filter' => array('@ID' => $arAccessGroups),
            'order' => array('ID' => 'ASC'),
        ))->fetchAll();
        foreach ($rsGroups as $group) {
            $arGroups[$group['ID']] = $group;
        }
        unset($rsGroups, $group);

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

    protected function getGroupAgreementPrice() 
    {
        if (isset($this->groupAgreements)) {
            $minPriceGroup = 0;
            foreach ($this->groupAgreements as $agreement) {
                if (ProductGroups::hasProduct($agreement['CATALOG_GROUP'], $this->productId) &&
                    $this->checkAgreementDate($agreement) &&
                    $agreement['PRICE_GROUP'] >= $minPriceGroup) {
                    $minPriceGroup = $agreement['PRICE_GROUP'];
                }
            }
            unset($agreement);

            if (is_numeric($minPriceGroup)) {
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
        return array(
            'UNROUND_PRICE' => $rsPrice['PRICE'],
            'PRICE' => round($rsPrice['PRICE']),
            'ID' => $rsPrice['ID'],
            'PRICE_TYPE_ID' => $priceGroup,
            'CURRENCY' => $rsPrice['CURRENCY']
        );
    }

    protected function checkAgreementDate($agreement)
    {
        $begin = $agreement['BEGIN'] instanceof \Bitrix\Main\Type\Date ? $agreement['BEGIN']->getTimestamp() : 0;
        $end = $agreement['END'] instanceof \Bitrix\Main\Type\Date ? $agreement['END']->getTimestamp() : INF;
        return $begin < time() && time() < $end;
    }

    protected function obtainBasePrice()
    {
        $basePriceCode = GroupTable::getRow(array(
            'select' => array('NAME'),
            'filter' => array('BASE' => 'Y')
        ))['NAME'];

        if ($basePriceCode) {
            $this->arBasePrice = $this->arResult['PRICES'][$basePriceCode];
        }
    }

    protected function obtainCompany()
    {
        global $USER;
        $this->company = CompanyBase::getByID($USER->GetID());
    }

    protected function obtainAgreements() 
    {
        if ($this->company instanceof CompanyBase) {
            $this->groupAgreements = $this->company->getGroupAgreements();
        }
    }
}