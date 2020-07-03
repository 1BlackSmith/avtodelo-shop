<?

namespace Smith\B2B\Handlers;

use \Bitrix\Main;
use \Bitrix\Sale;
use \Bitrix\Catalog\StoreTable;

use Smith\B2B\Company;
use Smith\B2B\Manager;

\Bitrix\Main\Loader::includeModule('sale');

class OrderSave
{
    /**
     * Наименования полей заказа
     */
    const PICKUP_DATE = 'PICKUP_DATE';
    const DELIVERY_DATE = 'DELIVERY_DATE';
    const STORE_POINT = 'STORE_POINT';

    /**
     * ID Свойств заказа
     */
    const STORE_POINT_ID = 75;

    /**
     * ID типов плательщиков
     */
    const WHOLESALE = 4;

    /**
     * ID платежных систем
     */
    const CASHLESS_PAY_30 = 20;
    const CASHLESS_PAY_14 = 17;
    const CARD_PAY = 12;

    /*
     * Соответствие платежных систем
     */
    const PAYMENTS = [
        self::CASH_PAY     => '',
        self::CARD_PAY => 'Безналичная',
    ];

    /**
     * Обработка свойств заказа после до его сохранения (После нажатия на кнопку "Оформить заказ")
     *
     * @param Main\Event $event
     */
    public function OnSaleOrderSaved(\Bitrix\Main\Event $event)
    {
        if ($event->getParameter('IS_NEW')) {
            /** @var \Bitrix\Sale\Order $order */
            $order = $event->getParameter('ENTITY');

            /** @var Integer $personTypeId ID типа покупателя */
            $personTypeId = $order->getPersonTypeId();

            if (+$personTypeId !== self::WHOLESALE)
                return;

            /** @var Sale\Basket $basket */
            $basket = $order->getBasket();

            /** @var Integer $userId ID пользователя */
            $userId = $order->getUserId(); 

            /** @var Integer $paymentId ID первой оплаты */
            $paymentId = $order->getPaymentSystemId()[0];

            /** @var \Bitrix\Sale\Shipment $shipment */
            $shipment = $order->getShipmentCollection()[0];

            /** @var \Bitrix\Sale\PropertyValueCollection $propertyCollection */
            $propertyCollection = $order->getPropertyCollection();

            /** @var Array $propsData массив значений свойств заказа (символьный код => значение) */
            $propsData = self::getOrderProps($propertyCollection);

            $company = Company::getByID($userId);
            $profileData = $company->getProfile();
            $companyData = $company->getCompanies()[0];
            $userData = \CUser::GetByID($userId)->fetch();

            /**
             * Перебираем свойства и изменяем нужные значения
             *
             * @var \Bitrix\Sale\PropertyValue $propertyItem
             */
            foreach ($propertyCollection as $propertyItem) {
                switch ($propertyItem->getField('CODE')) {
                    case 'COMPANY':
                        $propertyItem->setField('VALUE', $userData['NAME'].' '.$userData['LAST_NAME']);
                        break;
                    case 'BRAND':
                        $propertyItem->setField('VALUE', $companyData['NAME']);
                        break;
                    case 'INN':
                        $propertyItem->setField('VALUE', $companyData['INN']);
                        break;
                    case 'KPP': 
                        $propertyItem->setField('VALUE', $companyData['KPP']);
                        break;
                    case 'MANAGER':
                        $propertyItem->setField('VALUE', Manager::MANAGERS[$profileData['MANAGER_ID']]);
                        break;
                    case 'ADDRESS':
                        $address = self::getAddressString($propsData, $userId);
                        // Если выбран самовывоз то будет записан адрес склада
                        if (!$address) {
                            $address = StoreTable::getRowById($shipment->getStoreId())['ADDRESS'];
                        }
                        $propertyItem->setField('VALUE', $address);
                        break;
                    case 'SHIPPING_DATE':
                        $val = '';
                        if (!empty($propsData[self::PICKUP_DATE])) {
                            $val = $propsData[self::PICKUP_DATE];
                        }
                        if (!empty($propsData[self::DELIVERY_DATE])) {
                            $val = $propsData[self::DELIVERY_DATE];
                        }
                        $val = explode('.', $val);
                        $val = array_reverse($val);
                        $val = implode('-', $val);
                        $propertyItem->setField('VALUE', $val);
                        break;
                    case 'DEAL':
                        switch ($paymentId) {
                            case 12:
                                $deal = "Оплата картой 100%";
                                break;
                            case 15:
                                $deal = "Оплата при получении";
                                break;
                            case 17: 
                                $deal = "Оплата по б/н с отсрочкой 14 дней";
                                break;
                            case 20: 
                                $deal = "Оплата по б/н с отсрочкой 30 дней";
                                break;
                        }
                        if (!empty($deal)) {
                            $propertyItem->setField('VALUE', $deal);
                        }
                        break;
                    case 'PAY_TYPE':
                        switch ($paymentId) {
                            case 12:
                            case 17:
                            case 20:
                                $payType = "Безналичная";
                                break;
                            case 15:
                                $payType = "Наличная";
                                break;
                        }
                        if (!empty($payType)) {
                            $propertyItem->setField('VALUE', $payType);
                        }
                        break;
                    case 'CASHBOX':
                        switch ($paymentId) {
                            case 15:
                                $payType = "Касса Протон";
                                break;
                        }
                        if (!empty($payType)) {
                            $propertyItem->setField('VALUE', $payType);
                        }
                        break;
                    case 'PAYMENT':
                        if (isset(self::PAYMENTS[$paymentId])) {
                            $propertyItem->setField('VALUE', self::PAYMENTS[$paymentId]);
                        }
                        break;
                    case 'EMAIL':
                        $email = '';
                        if (!empty($propsData['PAY_EMAIL'])) {
                            $email = $propsData['PAY_EMAIL'];
                        }
                        $propertyItem->setField('VALUE', $email);
                        break;
                    case 'STOCK':
                        $storeName = StoreTable::getRowById($shipment->getStoreId())['TITLE'];
                        if (empty($storeName)) {
                            $storeName = 'Центральный офис-склад';
                        }
                        $propertyItem->setField('VALUE', $storeName);
                        break;
                }
            }

            $order->save();
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

    /**
     * Возвращает строку адреса
     *
     * @param  Array $propsData
     * @return String | false
     */
    private static function getAddressString($propsData, $userId)
    {
        if (!empty($propsData[self::STORE_POINT])) {
            $storeId = $propsData[self::STORE_POINT];
            $company = Company::getByID($userId);
            
            if ($address = $company->getStoreAddress($storeId)) {
                return $address;
            }
        }

        return false;
    }
}