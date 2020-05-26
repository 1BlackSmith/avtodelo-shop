<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

use \Bitrix\Main;
use \Bitrix\Main\Config\Option;
use \Bitrix\Sale;
use \Smith\Bonusengine\BasketTable;

class SBHandlers
{
    const MODULE_ID = "smith.bonusengine";

    public static function OnSalePayOrder($id, $val)
    {
        if ($val == 'Y')
        {
            /** @var \Bitrix\Sale\Order $order */
            $order = Sale\Order::load($id);

            /** @var Integer $userId */
            $userId = $order->getUserId();

            if ($avardedSum = self::getAwardedSum($order)) {
                if (CModule::IncludeModule('sale')) {
                    CSaleUserAccount::UpdateAccount($userId, $avardedSum, 'RUB', 'sale_avard');
                }
            }
        }
    }

    public static function OnSaleOrderSaved($event = null)
    {
        if ($event) 
        {
            // Только если заказ только что создан
            if ($event->getParameter('IS_NEW')) 
            {
                /** @var \Bitrix\Sale\Order $order */
                $order = $event->getParameter('ENTITY');

                /** @var Integer $orderId */
                $orderId = $order->getId();
                /** @var Integer $userId */
                $userId = $order->getUserId();

                $basketPoints = BasketTable::getBonuses(array('USER_ID' => $userId));
                if ($basketPoints) {
                    BasketTable::changeBonuses(array('USER_ID' => $userId), array('ORDER_ID' => $orderId));

                    if (CModule::IncludeModule('sale')) {
                        CSaleUserAccount::UpdateAccount($userId, -$basketPoints, 'RUB', 'sale_deducted');
                    }
                }
            }
        }
    }

    public static function OnSaleOrderDeleted($event)
    {
        /** @var \Bitrix\Sale\Order $order */
        $order = $event->getParameter('ENTITY');

        $filter = array(
            'USER_ID' => $order->getUserId(),
            'ORDER_ID' => $order->getId()
        );

        BasketTable::deleteByFilter($filter);
    }

    public static function getAwardedSum($order)
    {
        /** @var Integer $userId */
        $userId = $order->getUserId();

        $arProducts = self::getProductsData($order);

        $basketPoints = BasketTable::getBonuses(array('USER_ID' => $userId));
        if (!$basketPoints) {
            if ($userRate = self::getUserRate($userId)) {
                return self::getPointsSum($arProducts, $userRate);
            }
        }

        return false;
    }

    // Вспомагательные методы /////////////////////////////////////////////////////////

    /**
     * Возвращает информацию по товарам (ID, цену и ставку по тарифам)
     * @param  \Bitrix\Sale\Order $order
     * @return Array $arProducts
     */
    public static function getProductsData($order)
    {
        /** @var Sale\Basket $basket */
        $basket = $order->getBasket();

        /** 
         * @var Array $arProducts
         * ID => [
         *      'BONUS1' => integer
         *      'BONUS2' => integer
         *      'PRICE'  => float
         * ]
         */
        $arProducts = array();
        $ids = array();

        foreach ($basket as $basketItem) {
            $ids[] = $id = $basketItem->getProductId();
            $arProducts[$id]['PRICE'] = $basketItem->getPrice();
        }

        $rsProducts = CIBlockElement::GetPropertyValues(3, array("ID" => $ids), false);
        while ($arProduct = $rsProducts->Fetch()) {
            $id = $arProduct['IBLOCK_ELEMENT_ID'];
            $arProducts[$id]['BONUS1'] = $arProduct[744];
            $arProducts[$id]['BONUS2'] = $arProduct[745];
        }

        return $arProducts;
    }

    /**
     * Возвращает тариф начисления баллов пользователя
     * @param  Integer $userId - ID пользователя
     * @return false - пользователь не найден | 'BONUS1' - первый тариф | 'BONUS2' - второй тариф
     */
    public static function getUserRate($userId)
    {
        if ($userId > 0) {
            /** @var Array $arUserGroups */
            $arUserGroups = CUser::GetUserGroup($userId);

            /** @var Array $arGroupsFirstRate */
            $arGroupsFirstRate = unserialize(Option::get(self::MODULE_ID, 'GROUP_POINTS1'));
            if (self::arr_in_arr($arUserGroups, $arGroupsFirstRate)) 
                return 'BONUS1';

            /** @var Array $arGroupsSecondRate */
            $arGroupsSecondRate = unserialize(Option::get(self::MODULE_ID, 'GROUP_POINTS2'));
            if (self::arr_in_arr($arUserGroups, $arGroupsSecondRate)) 
                return 'BONUS2';
        } else {
            return false;
        }
    }

    /**
     * Возвращает сумму баллов, которые начислятся пользователю по определенному тарифу
     */
    public static function getPointsSum($arProducts, $userRate)
    {
        $sum = 0;

        foreach ($arProducts as $arProduct) {
            $price = $arProduct['PRICE'];
            $bonus = $arProduct[$userRate];
            $sum += BasketTable::roundPrecision($price * $bonus / 100);
        }

        return $sum;
    }

    /**
     * Ищет схождения значений в двух массивах
     */
    protected static function arr_in_arr($arr1, $arr2)
    {
        return count(array_intersect($arr1, $arr2)) > 0;
    }
}
