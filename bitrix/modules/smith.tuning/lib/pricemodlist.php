<?
namespace Smith\Tuning;

use \Bitrix\Main\Loader;
use \CCurrencyRates;

use \Bitrix\Catalog\PriceTable;
use \Bitrix\Catalog\GroupTable;
use \Bitrix\Catalog\GroupAccessTable;

use \Smith\B2B\CompanyBase;
use \Smith\B2B\ProductGroups;

class PriceModList
{   
    public static function modificateAllItems(&$arResult)
    {
        static::includeModules();

        $itemsId = array();
        $items = $arResult['ITEMS'];

        $arResult['BASE_PRICE_CODE'] = static::getBasePriceCode();

        foreach ($items as &$item) {
            $itemsId[] = $item['ID'];
            $item['BASE_PRICE_CODE'] = $arResult['BASE_PRICE_CODE'];
        }

        if (!is_set($arResult['PRICES'])) {
            $arResult['PRICES'] = static::getPricesItems($itemsId);
        }

        $company = static::getCompany();
        if ($company) {
            $arResult['B2B_AGREEMENTS'] = static::getAgreementsPrice($company);

            foreach ($items as &$item) {
                if (is_set($price = $arResult['B2B_AGREEMENTS'][$item['ID']]))
                $item['B2B_AGREEMENTS'] = $price;
            }
        }
    }

    public static function modificateItem(&$item, $arPrices)
    {
        static::includeModules();

        $itemId = $item['ID'];

        if (!is_set($item['PRICES'])) {
            $item['PRICES'] = $arPrices;
        }

        if (is_set($item['BASE_PRICE_CODE'])) {
            $arBasePrice = $item['PRICES'][$item['BASE_PRICE_CODE']];

            if (is_set($item['B2B_AGREEMENTS'])) {
                $selectedPrice = $item['ITEM_PRICE_SELECTED'];
                $arCurPrice =& $item['ITEM_PRICES'][$selectedPrice];
                $arCurPrice = array_merge($arCurPrice, $item['B2B_AGREEMENTS']);
            }

            static::setPriceItem($item, $arBasePrice);
        }
    }

    protected static function includeModules() 
    {
        Loader::IncludeModule('currency');
    }

    protected static function setPriceItem(&$item, $arBasePrice)
    {
        if (count($item['PRICES']) > 1) {
            $selectedPrice = $item['ITEM_PRICE_SELECTED'];
            $arCurPrice =& $item['ITEM_PRICES'][$selectedPrice];
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

    protected static function getPricesItems($itemsId)
    {
        $arAccessGroups = static::getAccessPricesId();
        $arGroups = static::getPriceGroups($arAccessGroups);

        $rsProductsPrices = PriceTable::getList(array(
            'filter' => array('@PRODUCT_ID' => $itemsId, '@CATALOG_GROUP_ID' => $arAccessGroups),
        ))->fetchAll();
        unset($arAccessGroups);

        $res = array();
        foreach ($rsProductsPrices as $productPrice) {
            $priceId = $productPrice['CATALOG_GROUP_ID'];
            $productId = $productPrice['PRODUCT_ID'];
            $group = $arGroups[$priceId];

            $res[$productId][$group['NAME']] = array(
                'PRICE_ID' => $group['ID'],
                'VALUE' => $productPrice['PRICE'],
            );
        }

        return $res;
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

    protected static function getAgreementsPrice($company) 
    {
        if ($company instanceof CompanyBase) {
            $productAgreements = array();
            $groupAgreements = $company->getGroupAgreements();
            if (count($groupAgreements) > 0) {
                foreach($groupAgreements as &$agreement) {
                    if (static::checkAgreementDate($agreement)) {
                        $agreement['PRODUCTS'] = ProductGroups::getProductsId($agreement['CATALOG_GROUP']);
                        foreach ($agreement['PRODUCTS'] as $productId) {
                            $productAgreements[$productId]['GROUP'][] = $agreement['PRICE_GROUP'];
                        }
                        unset($productId);
                    }
                }
                unset($groupAgreements, $agreement);

                $productGroupPrices = array();
                foreach ($productAgreements as $productId => $prices) {
                    $minPriceGroup = 0;
                    foreach ($prices['GROUP'] as $price) {
                        if ($price >= $minPriceGroup) {
                            $minPriceGroup = $price;
                            $productGroupPrices[$productId] = $minPriceGroup;
                        }
                    }
                    unset($price);
                }
                unset($productAgreements, $productId, $prices);
                
                if (count($productGroupPrices) > 0) {
                    return static::getPriceByGroup($productGroupPrices);
                }
            }
        }

        return false;
    }

    protected static function getPriceByGroup($products)
    {
        $productsId = array_keys($products);
        $priceGroups = array_values($products);
        $rsProductsPrice = PriceTable::getList(array(
            'filter' => array('@PRODUCT_ID' => $productsId, '@CATALOG_GROUP_ID' => $priceGroups)
        ))->fetchAll();

        $res = array();
        foreach ($rsProductsPrice as $productPrice) {
            if ($products[$productPrice['PRODUCT_ID']] == $productPrice['CATALOG_GROUP_ID']) {
                $res[$productPrice['PRODUCT_ID']] = array(
                    'UNROUND_PRICE' => $productPrice['PRICE'],
                    'PRICE' => round($productPrice['PRICE']),
                    'ID' => $productPrice['ID'],
                    'PRICE_TYPE_ID' => $productPrice['CATALOG_GROUP_ID'],
                    'CURRENCY' => $productPrice['CURRENCY']
                );
            }
        }

        return $res;
    }

    protected static function checkAgreementDate($agreement)
    {
        $begin = $agreement['BEGIN'] instanceof \Bitrix\Main\Type\Date ? $agreement['BEGIN']->getTimestamp() : 0;
        $end = $agreement['END'] instanceof \Bitrix\Main\Type\Date ? $agreement['END']->getTimestamp() : INF;
        return $begin < time() && time() < $end;
    }

    protected static function getCompany()
    {
        global $USER;
        return CompanyBase::getByID($USER->GetID());
    }
}