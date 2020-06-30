<?
namespace Smith\Tuning;

use \Bitrix\Main\Loader;
use \CCurrencyRates;

use \Bitrix\Catalog\PriceTable;

use \Smith\B2B\CompanyBase;
use \Smith\B2B\ProductGroups;

class PriceModList extends PriceModBase
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

        $arResult['PRICES'] = static::getPricesItems($itemsId);

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
                'PRINT_VALUE' => CurrencyFormat(CCurrencyRates::ConvertCurrency($productPrice['PRICE'], $productPrice['CURRENCY'], "RUB"), "RUB"),
            );
        }

        return $res;
    }

    protected static function getAgreementsPrice($company) 
    {
        if ($company instanceof CompanyBase) {
            $products = array();
            $groupAgreements = $company->getGroupAgreements();
            if (count($groupAgreements) > 0) {
                $productAgreements = array();
                foreach($groupAgreements as &$agreement) {
                    if (static::checkAgreementDate($agreement)) {
                        $agreement['PRODUCTS'] = ProductGroups::getProductsId($agreement['CATALOG_GROUP']);
                        foreach ($agreement['PRODUCTS'] as $productId) {
                            $productAgreements[$productId][] = $agreement['PRICE_GROUP'];
                        }
                        unset($productId);
                    }
                }
                unset($groupAgreements, $agreement);

                $productGroupPrices = array();
                foreach ($productAgreements as $productId => $prices) {
                    $minPriceGroup = 0;
                    foreach ($prices as $price) {
                        if ($price >= $minPriceGroup) {
                            $minPriceGroup = $price;
                            $productGroupPrices[$productId] = $minPriceGroup;
                        }
                    }
                    unset($price);
                }
                unset($productAgreements, $productId, $prices);

                if (count($productGroupPrices) > 0) {
                    $products = static::getPriceByGroup($productGroupPrices);
                }
            }

            $individualAgreements = $company->getIndividualAgreements();
            if (count($individualAgreements) > 0) {
                foreach ($individualAgreements as $agreement) {
                    if (static::checkAgreementDate($agreement)) {
                        $products[$agreement['PRODUCT']] = static::setProductPrice($agreement);
                    }
                }
            }

            return $products;
        }

        return false;
    }

    protected static function getPriceByGroup($productGroupPrices)
    {
        $productsId = array_keys($productGroupPrices);
        $priceGroups = array_values($productGroupPrices);
        $rsProductsPrice = PriceTable::getList(array(
            'filter' => array('@PRODUCT_ID' => $productsId, '@CATALOG_GROUP_ID' => $priceGroups)
        ))->fetchAll();

        $res = array();
        foreach ($rsProductsPrice as $productPrice) {
            if ($productGroupPrices[$productPrice['PRODUCT_ID']] == $productPrice['CATALOG_GROUP_ID']) {
                $res[$productPrice['PRODUCT_ID']] = static::setProductPrice($productPrice);
            }
        }

        return $res;
    }
}