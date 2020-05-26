<?php

use Bitrix\Main;
use Bitrix\Sale;

CModule::IncludeModule('sale');

AddEventHandler('main', 'OnBeforeEventAdd', array('MailHandler', 'OnBeforeEventAddHandler'));

class MailHandler
{
    /**
     * Изменение параметров почтового шаблона до отправки письма
     *
     * @param String $event
     * @param String $lid
     * @param Array &$arFields
     */
    function OnBeforeEventAddHandler($event, $lid, &$arFields)
    {   
        switch ($event) {

            case 'SALE_NEW_ORDER':

                /** @var \Bitrix\Sale\Order $order */
                $order = Sale\Order::load($arFields['ORDER_ID']);

                /** @var \Bitrix\Sale\Shipment $shipment */
                $shipment = $order->getShipmentCollection()[0];

                /** @var \Bitrix\Sale\PropertyValueCollection $propertyCollection */
                $propertyCollection = $order->getPropertyCollection();

                /** @var Array $propsData массив значений свойств заказа (символьный код => значение) */
                $propsData = self::getOrderProps($propertyCollection);

                /** @var \Bitrix\Sale\Basket $basket */
                $basket = $order->getBasket();


                /**
                 * Формирование информации о доставке
                 */

                // Если выбран самовывоз, то будет записан адрес склада
                if (!$propsData['ADDRESS']) {
                    $rsStore = CCatalogStoreProduct::GetList(array(), array('STORE_ID' => $shipment->getStoreId()), false, false, array('STORE_ADDR'));
                    if ($arStore = $rsStore->Fetch()) {
                        $propsData['ADDRESS'] = $arStore['STORE_ADDR'];
                    }
                }

                $arFields['DELIVERY'] = "Заказ будет доставлен {$propsData['SHIPPING_DATE']} по адресу: {$propsData['ADDRESS']}.";

                $shipmentPrice = $shipment->getPrice();
                if (!$shipment->getStoreId()) {
                    $shipmentPrice = (int)$shipmentPrice;
                    $arFields['DELIVERY'] .= "<br>Стоимость доставки: <b>{$shipmentPrice} руб.</b>";
                }


                /**
                 * Добавление таблицы товаров
                 */
                $arFields['ORDER_LIST'] = '';

                foreach ($basket as $basketItem) {
                    $rsProduct = CIBlockElement::GetByID($basketItem->getProductId());
                    $rsProduct = $rsProduct->GetNextElement(); 
                    $arProduct = $rsProduct->GetFields();

                    $price = $basketItem->getPrice();
                    $quantity = $basketItem->getQuantity();

                    $arFields['ORDER_LIST'] .= '<tr class="product">
                                                    <td width="380px">
                                                        <table>
                                                            <tr>
                                                                <td>
                                                                    <div class="product__img-container">
                                                                        <img src="https://chistota-shop.ru/' . CFile::GetPath($arProduct['DETAIL_PICTURE']) . '" alt="">
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p class="product__name">' . $arProduct['NAME'] . '</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td>
                                                        <div class="product__price">' . $price . ' руб.</div>
                                                    </td>
                                                    <td>
                                                        <div class="product__quantity">' . $quantity . '</div>
                                                    </td>
                                                    <td>
                                                        <div class="product__sum">' . $price * $quantity . ' руб.</div>
                                                    </td>
                                                </tr>';
                }

                break;

            case 'SALE_STATUS_CHANGED_P':

                /** @var \Bitrix\Sale\Order $order */
                $order = Sale\Order::load($arFields['ORDER_ID']);

                /** @var \Bitrix\Sale\Shipment $shipment */
                $shipment = $order->getShipmentCollection()[0];

                // Если доставка курьером, то передать d-none, т.е. скрыть сообщение о получение заказа на ПВЗ
                $arFields['IN_PVZ'] = ($shipment->getStoreId() === 0) ? 'd-none' : false;

                break;

            case 'B2B_UPDATE_COMPANY':

                global $USER;
                global $APPLICATION;

                $arFields['COMPANY_ID'] = $USER->GetID();
                $arFields['EMPLOEE_ID'] = $APPLICATION->get_cookie('B2B_USER');

                break;
        }
    }

    // Вспомогательные методы ///////////////////////////////////////////////////////////////////////////////////////

    /**
     * Возвращает массив свойств заказа в формате (символьный код => значение)
     *
     * @param  \Bitrix\Sale\PropertyValueCollection $propertyCollection
     * @return Array массив свойств
     */
    private static function getOrderProps(\Bitrix\Sale\PropertyValueCollection $propertyCollection)
    {
        $propsData = [];

        /**
         * Собираем все свойства и их значения в массив
         *
         * @var \Bitrix\Sale\PropertyValue $propertyItem
         */
        foreach ($propertyCollection as $propertyItem) {
            if (!empty($propertyItem->getField('CODE'))) {
                $propsData[$propertyItem->getField('CODE')] = trim($propertyItem->getValue());
            }
        }

        return $propsData;
    }
}
