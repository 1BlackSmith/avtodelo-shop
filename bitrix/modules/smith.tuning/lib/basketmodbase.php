<?
namespace Smith\Tuning;

use \DiscountCouponsManager;
use \CCurrencyRates;
use \CSaleUserAccount;
use \CModule;
use \CUser;
use \COption;

use \Bitrix\Main\Config\Option;
use \Bitrix\Main\Application;
use \Bitrix\Main\Loader;

use \Bitrix\Sale\Internals\DiscountTable;
use \Bitrix\Sale\Fuser;
use \Bitrix\Catalog\PriceTable;

use \Smith\Bonusengine\BasketTable;

use \Smith\B2B\Manager;
use \Smith\B2B\CompanyBase;
use \Smith\B2B\ProductGroups;

class BasketModBase 
{
    protected $basketStorage;
    protected $arGiftIds = array();

    protected $company;
    protected $companyAgreements;
    protected $clientId;

    protected $request;

    protected function inicialLoadAction()
    {
        $userId = $this->getUserId();
        if ($userId !== null) {
            $this->obtainCompany();
            $this->obtainAgreements();
            $this->refreshPrices();

            if ($points = BasketTable::getBonuses(array('USER_ID' => $userId))) {
                $this->processRecalculateBonuses($points);
            }
        }
    }

    protected function recalculateAjaxAction($postList) 
    {
        global $USER;
        global $APPLICATION;

        if (!empty($postList)) {
            if ($postList['client_select']) {
                $this->clientId = 0;
                if (($clientId = $postList['client_select']) !== 'self' && Manager::getByID($USER->GetID())) 
                {
                    $this->clientId = $clientId;
                }
                $APPLICATION->set_cookie("B2B_CLIENT_ID", $this->clientId);
                \Bitrix\Main\IO\File::putFileContents($_SERVER['DOCUMENT_ROOT'] . '/log.txt', print_r($this->clientId, true));
            }

            $this->obtainCompany();
            $this->obtainAgreements();
            $this->refreshPrices();

            $userId = $this->getUserId();
            if ($userId) {
                if ($postList['bonuses_recalculation'] == 'Y') {
                    $points = $this->getBasketBonuses();
                    BasketTable::changeBonuses(array('USER_ID' => $userId), array('USER_ID' => $userId, 'POINTS' => $points));
                } else {
                    BasketTable::changeBonuses(array('USER_ID' => $userId), array('POINTS' => 0));
                }
            }

            if ($points = BasketTable::getBonuses(array('USER_ID' => $userId))) {
                $this->processRecalculateBonuses($points);
            }
        }
    }

    protected function refreshPrices()
    {
        $basket = &$this->getBasketStorage()->getBasket();

        foreach ($basket as &$basketItem) {
            $basePrice = $basketItem->getBasePrice();
            $price = $this->getProductPrice($basketItem);

            $basketItem->setFields(array(
                'CUSTOM_PRICE' => 'Y',
                'DISCOUNT_PRICE' => $basePrice - $price,
                'PRICE' => $price
            ));
        }
        unset($basketItem);

        $this->setCompanyPrices();
    }

    protected function processRecalculateBonuses($bonuses)
    {
        $basket = &$this->getBasketStorage()->getBasket();
        $salePercent = $bonuses / $basket->getPrice();
        $resIds = array();

        foreach ($basket as &$basketItem) {
            // if ($this->isGift($basketItem))
            //     continue;

            $resIds[] = $basketItem->getId();
            $price = $basketItem->getPrice();
            $quantity = $basketItem->getQuantity();

            $basketItem->setFields(array(
                'CUSTOM_PRICE' => 'Y',
                'DISCOUNT_PRICE' => $basketItem->getBasePrice() - $price * (1 - $salePercent),
                'PRICE' => $price * (1 - $salePercent)
            ));
        }

        return $resIds;
    }

    protected function getBasketBonuses()
    {
        $basket = $this->getBasketStorage()->getBasket();
        $basketPrice = $basket->getPrice();

        $arUserAccount = CSaleUserAccount::GetByUserID($this->getUserId(), 'RUB');
        $currentBudget = $arUserAccount['CURRENT_BUDGET'];

        $writeOfPercent = Option::get('smith.bonusengine', 'WRITE_OF_PERCENT');
        $writeOfPercent = $writeOfPercent ? $writeOfPercent : 30;

        if ($currentBudget >= $basketPrice * $writeOfPercent / 100) {
            $currentBudget = BasketTable::roundPrecision($basketPrice * $writeOfPercent / 100);
        }

        return $currentBudget;
    }

    protected function getProductPrice($basketItem)
    {
        // if ($this->isGift($basketItem))
        //     return 0;

        /** @var Integer $userId ID пользователя */
        $userId = $this->getUserId();

        if ($userId) 
        {
            $priceId = $this->getPersonPriceType($userId);

            $rsPrices = \CPrice::GetList(
                array(),
                array(
                  'PRODUCT_ID' => $basketItem->getProductId(),
                  'CATALOG_GROUP_ID' => $priceId,
                )
            );

            CModule::IncludeModule("currency");
            
            if ($arPrice = $rsPrices->Fetch())
            {
                return CCurrencyRates::ConvertCurrency($arPrice['PRICE'], $arPrice['CURRENCY'], "RUB");
            }
            
            return $basketItem->getField('BASE_PRICE');
        }

        return false;
    }

    protected function getPersonPriceType($userId)
    {
        $personPriceGroups = \Bitrix\Catalog\GroupAccessTable::getList([
            "select" => ["CATALOG_GROUP_ID"],
            "filter" => [
                "=GROUP_ID" => CUser::GetUserGroup($userId),
                "=ACCESS" => 'Y'
            ]
        ])->fetchAll();
        $personPriceGroups = array_map(function($item) {
            return $item['CATALOG_GROUP_ID'];
        }, $personPriceGroups);

        // Самый последний тип цены минимальный
        return array_pop($personPriceGroups);
    }

    protected function setCompanyPrices() 
    {
        $basket = &$this->getBasketStorage()->getBasket();

        if (is_set($this->companyAgreements) && count($this->companyAgreements) > 0) {
            foreach ($basket as $basketItem) {
                if (array_key_exists($itemId = $basketItem->getProductId(), $this->companyAgreements)) {
                    $this->setPriceFromAgreement($basketItem, $this->companyAgreements[$itemId]);
                }
            }
        }
    }

    protected function setPriceFromAgreement($basketItem, $price)
    {
        $basePrice = $basketItem->getBasePrice();
        $basketItem->setFields(array(
            'CUSTOM_PRICE' => 'Y',
            'DISCOUNT_PRICE' => $basePrice - $price,
            'PRICE' => $price
        ));
    }

    protected function obtainCompany()
    {
        $userId = $this->clientId ? $this->clientId : $this->getUserId();
        $this->company = CompanyBase::getByID($userId);
    }

    protected function obtainAgreements() 
    {
        if ($this->company instanceof CompanyBase) {
            $productAgreements = array();
            $groupAgreements = $this->company->getGroupAgreements();
            if (count($groupAgreements) > 0) {
                foreach($groupAgreements as &$agreement) {
                    if ($this->checkAgreementDate($agreement)) {
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

                $productPrices = array();
                $productsId = array_keys($productGroupPrices);
                $priceGroups = array_values($productGroupPrices);
                $rsProductsPrice = PriceTable::getList(array(
                    'filter' => array('@PRODUCT_ID' => $productsId, '@CATALOG_GROUP_ID' => $priceGroups)
                ))->fetchAll();
                foreach ($rsProductsPrice as $row) {
                    if ($productGroupPrices[$row['PRODUCT_ID']] == $row['CATALOG_GROUP_ID']) {
                        $productPrices[$row['PRODUCT_ID']] = CCurrencyRates::ConvertCurrency($row['PRICE'], $row['CURRENCY'], 'RUB');
                    }
                }
                unset($productGroupPrices, $productsId, $priceGroups, $rsProductsPrice, $price);
                
                $this->companyAgreements = $productPrices;
            }
        }
    }

    protected function checkAgreementDate($agreement)
    {
        $begin = $agreement['BEGIN'] instanceof \Bitrix\Main\Type\Date ? $agreement['BEGIN']->getTimestamp() : 0;
        $end = $agreement['END'] instanceof \Bitrix\Main\Type\Date ? $agreement['END']->getTimestamp() : INF;
        return $begin < time() && time() < $end;
    }

    protected function getBasketStorage()
    {
        if (!isset($this->basketStorage))
        {
            $this->basketStorage = \Bitrix\Sale\Basket\Storage::getInstance($this->getFuserId(), $this->getSiteId());
        }

        return $this->basketStorage;
    }

    protected function getFuserId()
    {
        if ($this->fUserId === null)
        {
            $this->fUserId = Fuser::getId();
        }

        return $this->fUserId;
    }

    protected function getSiteId()
    {
        return SITE_ID;
    }

    protected function isGift($basketItem)
    {
        return in_array($basketItem->getProductId(), $this->arGiftIds) && $basketItem->getQuantity() < 2;
    }

    public function loadGifts($couponList)
    {
        if (empty($couponList['COUPON_LIST']))
            return;

        foreach ($couponList['COUPON_LIST'] as $coupon) {
            $rsDiscount = DiscountTable::getRow(array(
                'filter' => array('=ID' => $coupon['DISCOUNT_ID'])
            ));

            $discountActions = $rsDiscount['ACTIONS_LIST'];
            if ($discountActions['CLASS_ID'] == 'CondGroup')
            {
                foreach ($discountActions['CHILDREN'] as $key => $arAction)
                {
                    if (
                        $arAction['CLASS_ID'] == 'GiftCondGroup' && 
                        $arAction['CHILDREN'][$key]['CLASS_ID'] == 'GifterCondIBElement') 
                    {
                        foreach ($arAction['CHILDREN'][$key]['DATA']['Value'] as $id)
                        {
                            $this->arGiftIds[] = $id;
                        }
                    }
                }
            }
        }
    }

    public function getCouponInfo()
    {
        $result = array(
            'COUPON' => '',
            'COUPON_LIST' => array()
        );

        $coupons = DiscountCouponsManager::get(true, array(), true, true);
        if (!empty($coupons))
        {
            foreach ($coupons as &$coupon)
            {
                if ($result['COUPON'] == '')
                {
                    $result['COUPON'] = $coupon['COUPON'];
                }

                if ($coupon['STATUS'] == DiscountCouponsManager::STATUS_NOT_FOUND || $coupon['STATUS'] == DiscountCouponsManager::STATUS_FREEZE)
                {
                    $coupon['JS_STATUS'] = 'BAD';
                }
                elseif ($coupon['STATUS'] == DiscountCouponsManager::STATUS_NOT_APPLYED || $coupon['STATUS'] == DiscountCouponsManager::STATUS_ENTERED)
                {
                    $coupon['JS_STATUS'] = 'ENTERED';

                    if ($coupon['STATUS'] == DiscountCouponsManager::STATUS_NOT_APPLYED)
                    {
                        $coupon['STATUS_TEXT'] = DiscountCouponsManager::getCheckCodeMessage(DiscountCouponsManager::COUPON_CHECK_OK);
                        $coupon['CHECK_CODE_TEXT'] = array($coupon['STATUS_TEXT']);
                    }
                }
                else
                {
                    $coupon['JS_STATUS'] = 'APPLYED';
                }

                $coupon['JS_CHECK_CODE'] = '';

                if (isset($coupon['CHECK_CODE_TEXT']))
                {
                    $coupon['JS_CHECK_CODE'] = is_array($coupon['CHECK_CODE_TEXT'])
                        ? implode(', ', $coupon['CHECK_CODE_TEXT'])
                        : $coupon['CHECK_CODE_TEXT'];
                }

                $result['COUPON_LIST'][] = $coupon;
            }

            unset($coupon);
        }

        return $result;
    }

    protected function getUserId()
    {
        global $USER;

        $userId = $USER instanceof CUser ? $USER->GetID() : null;

        if ($this->clientId) {
            return $this->clientId;
        }

        return $userId;
    }

    protected function saveBasket()
    {
        $basket = $this->getBasketStorage()->getBasket();

        if ($basket->isChanged())
        {
            $res = $basket->save();
            if (!$res->isSuccess())
            {
                $this->errorCollection->add($res->getErrors());
            }
        }
    }
}