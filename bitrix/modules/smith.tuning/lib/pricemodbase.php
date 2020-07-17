<?php
namespace Smith\Tuning;

use \CCurrencyRates;

use \Bitrix\Catalog\GroupTable;
use \Bitrix\Catalog\GroupAccessTable;

use \Smith\B2B\CompanyBase;

class PriceModBase extends Base
{
    protected static function setPriceItem(&$item, $arBasePrice)
    {
        if (count($item['PRICES']) > 1) {
            $selectedPrice = $item['ITEM_PRICE_SELECTED'];
            $arCurPrice =& $item['ITEM_PRICES'][$selectedPrice];
            if (is_set($arCurPrice)) {
                foreach ($arCurPrice as $CODE => &$v) {
                    switch ($CODE) {
                        case 'BASE_PRICE':
                            $v = $arBasePrice['VALUE'];
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
    }

    protected static function getAccessPricesId()
    {
        global $USER;
        $arUserGroups = $USER->GetUserGroupArray();

        $arAccessGroups = array();
        $rsAccessGroups = GroupAccessTable::getList(array(
            'filter' => array('@GROUP_ID' => $arUserGroups)
        ))->fetchAll();
        foreach ($rsAccessGroups as $accessGroup) {
            if (in_array($accessGroup['CATALOG_GROUP_ID'], $arAccessGroups)) {
                continue;
            }
            $arAccessGroups[] = $accessGroup['CATALOG_GROUP_ID'];
        }
        
        return $arAccessGroups;
    }

    protected static function getPriceGroups($arAccessGroups)
    {
        $arGroups = array();
        $rsGroups = GroupTable::getList(array(
            'filter' => array('@ID' => $arAccessGroups),
            'order' => array('ID' => 'ASC'),
        ))->fetchAll();
        foreach ($rsGroups as $group) {
            $arGroups[$group['ID']] = $group;
        }
        
        return $arGroups;
    }

    protected static function getBasePriceCode()
    {
        return GroupTable::getRow(array(
            'select' => array('NAME'),
            'filter' => array('BASE' => 'Y')
        ))['NAME'];
    }

    protected static function setProductPrice($product)
    {
        return array(
            'UNROUND_PRICE' => $product['PRICE'],
            'PRICE' => round($product['PRICE']),
            'ID' => $product['ID'] ? $product['ID'] : 'individual',
            'PRICE_TYPE_ID' => $product['CATALOG_GROUP_ID'] ? $product['CATALOG_GROUP_ID'] : 'individual',
            'CURRENCY' => $product['CURRENCY']
        );
    }

    protected static function getCompany()
    {
        global $USER;
        return CompanyBase::getByID($USER->GetID());
    }
}