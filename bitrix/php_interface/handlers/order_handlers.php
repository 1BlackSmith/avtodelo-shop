<?php

use Bitrix\Main;
use Bitrix\Sale;
use Bitrix\Catalog\StoreProductTable;

use Smith\B2B\Manager;

CModule::IncludeModule('sale');
CModule::IncludeModule('smith.b2b');

Main\EventManager::getInstance()->AddEventHandler(
	'sale',
	'OnSaleOrderBeforeSaved',
	[
		'OrderHandler',
		'OnSaleOrderBeforeSaved'
	]
);

AddEventHandler(
	'main',
	'OnBeforeEventAdd',
	[
		'OrderHandler',
		'OnBeforeEventAddHandler'
	]
);

class OrderHandler
{
	/**
	 * @const Array ADDRESS_PROPS реквизиты адреса
	 */
	const ADDRESS_PROPS = [
		'DELIVERY_DISTRICT'   => 'р-н.',
		'DELIVERY_STREET'     => 'ул.',
		'DELIVERY_HOUSE'      => 'д.',
		'DELIVERY_FLAT'       => 'кв.',
		'DELIVERY_FLOOR'      => 'этаж',
		'DELIVERY_FRONT_DOOR' => 'п.',
	];

	/**
	 * Наименования полей заказа
	 */
	const DELIVERY_STREET = 'DELIVERY_STREET';
	const PICUP_ADDRESS   = 'PICUP_ADDRESS';
	const ZIP             = 'ZIP';
	const LOCATION        = 'LOCATION';
	const PICKUP_DATE     = 'PICKUP_DATE';
	const DELIVERY_DATE   = 'DELIVERY_DATE';

	/**
	 * ID типов цен
	 */
	const BASE            = 1;
	const RETAIL_SILVER   = 6;
	const RETAIL_GOLD     = 12;
	const RETAIL_PLATINUM = 13;
	const WHOLESALE_PRICE = 14;
	const DILLER1         = 15;
	const DILLER2         = 16;
	const DILLER3         = 17;
	const PARTNER         = 18;

	/**
	 * ID типов плательщиков
	 */
	const RETAIL       = 3;
	const WHOLESALE    = 4;
	const WHOLESALE_IP = 5;

	/**
	 * Соотношение типов плательщиков с типами цен
	 */
	const PRICE_GROUPS = [
		self::RETAIL => [
			self::RETAIL_SILVER,
			self::RETAIL_GOLD,
			self::RETAIL_PLATINUM,
		],
		self::WHOLESALE => [
			self::WHOLESALE_PRICE,
			self::DILLER1,
			self::DILLER2,
			self::DILLER3,
			self::PARTNER,
		],
		self::WHOLESALE_IP => [
			self::WHOLESALE_PRICE,
			self::DILLER1,
			self::DILLER2,
			self::DILLER3,
			self::PARTNER,
		],
	];

	/**
	 * Соответствие видов цен БУС => 1С
	 */
	const DEAL_PRICE_TYPE_REL = [
		'Розничная цена'  => '1. Розничная',
		'Розница серебро' => '2. Серебро розница',
		'Розница золото'  => '3. Золото розница',
		'Розница платина' => '4. Платина розница',
		'Оптовая'         => '5. Оптовая',
		'Диллер 1'        => '6. Диллер 1',
		'Диллер 2'        => '7. Диллер 2',
		'Диллер 3'        => '8. Диллер 3',
		'Партнер'         => '9. Партнер',
	];

	/**
	 * ID платежных систем
	 */
	const CASH_PAY     = 11;
	const CASHLESS_PAY = 12;

	/*
	 * Соответствие платежных систем
	 */
	const PAYMENTS = [
		self::CASH_PAY     => '',
		self::CASHLESS_PAY => 'Безналичная',
	];

	/**
	 * Обработка свойств заказа после до его сохранения (После нажатия на кнопку "Оформить заказ")
	 *
	 * @param Main\Event $event
	 */
	public function OnSaleOrderBeforeSaved(Main\Event $event)
	{
		/** @var \Bitrix\Sale\Order $order */
		$order = $event->getParameter('ENTITY');

		/** @var Sale\Basket $basket */
		$basket = $order->getBasket();

		/** @var Integer $userId ID пользователя */
		$userId = $order->getUserId();

		/** @var Integer $personTypeId ID типа покупателя */
		$personTypeId = $order->getPersonTypeId();

		if (+$personTypeId !== self::RETAIL)
            return;

		/** @var Integer $paymentId ID первой оплаты */
		$paymentId = $order->getPaymentSystemId()[0];

		/** @var \Bitrix\Sale\PropertyValueCollection $propertyCollection */
		$propertyCollection = $order->getPropertyCollection();

		/** @var Array $propsData массив значений свойств заказа (символьный код => значение) */
		$propsData = self::getOrderProps($propertyCollection);

		$userData = CUser::GetByID($userId)->fetch();

		/**
		 * Изменение полей пользователя
		 */
	  	self::setUserFields(
		  	$userId,
		  	[
		   	   'EMAIL'          => $propsData['EMAIL'],
		   	   'PERSONAL_PHONE' => $propsData['PHONE'],
		  	]
	  	);

	    /**
		 * Перебираем свойства и изменяем нужные значения
		 *
		 * @var \Bitrix\Sale\PropertyValue $propertyItem
		 */
		foreach ($propertyCollection as $propertyItem) {
			switch ($propertyItem->getField('CODE')) {
				case 'MANAGER':
					$managerId = $userData['UF_MANAGER'];
					if (is_numeric($managerId)) {
						$propertyItem->setField('VALUE', Manager::MANAGERS[$managerId]);
					}
					break;
				case 'ADDRESS':
					$address = self::getAddressString($propsData);
					/**
					 * Если выбран самовывоз 
					 * то будет записан адрес склада
					 */
					if (!$address) {
						/** @var \Bitrix\Sale\Shipment $shipment */
			            $shipment = $order->getShipmentCollection()[0];
			            $store = StoreProductTable::getRow(array(
			            	'filter' => array('=STORE.ID' => $shipment->getStoreId(), 'STORE.ACTIVE' => 'Y'),
    						'select' => array('STORE_ADDRESS' => 'STORE.ADDRESS'),
			            ));
            			$address = $store['STORE_ADDRESS'];
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
					if ($paymentId == 12) {
						$deal = 'Оплата картой 100%';
					} elseif ($paymentId == 11) {
						$deal = 'Оплата при получении';
					}
					if (!empty($deal)) {
				 		$propertyItem->setField('VALUE', $deal);
				 	}
					break;
				case 'PAYMENT':
					$propertyItem->setField('VALUE', self::PAYMENTS[$paymentId]);
					break;
			}
		}
	}

	public function OnBeforeEventAddHandler(&$event, &$lid, &$arFields)
    {
   	    if ($event === 'SALE_NEW_ORDER') {

	    	/** @var Integer $orderId */
	    	$orderId = $arFields['ORDER_ID'];

	    	/** @var \Bitrix\Sale\Order $order */
		    $order = Sale\Order::load($orderId);

		    /** @var Integer $personTypeId ID типа покупателя */
			$personTypeId = $order->getPersonTypeId();

			if (+$personTypeId !== self::RETAIL)
	            return;

			/** @var \Bitrix\Sale\PropertyValueCollection $propertyCollection */
			$propertyCollection = $order->getPropertyCollection();

			/** @var Array $propsData массив значений свойств заказа (символьный код => значение) */
			$propsData = self::getOrderProps($propertyCollection);

			/**
			 * Перебираем свойства и изменяем нужные значения
			 *
			 * @var \Bitrix\Sale\PropertyValue $propertyItem
			 */
			foreach ($propertyCollection as $propertyItem) {
				switch ($propertyItem->getField('CODE')) {
					case 'STOCK':
						/** @var \Bitrix\Sale\Shipment $shipment */
			            $shipment = $order->getShipmentCollection()[0];
			            $store = StoreProductTable::getRow(array(
			            	'filter' => array('=STORE.ID' => $shipment->getStoreId(), 'STORE.ACTIVE' => 'Y'),
							'select' => array('STORE_TITLE' => 'STORE.TITLE'),
			            ));
	        			$storeName = $store['STORE_TITLE'];
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
	 * Изменяет поля в профиле пользователя на заданные
	 *
	 * @param Integer $userId
	 * @param Array $fields поля, которые нужно изменить в формате (наименование => значение)
	 */
	private static function setUserFields($userId, $fields)
	{
		$user = new CUser;
		$user->Update($userId, $fields);
	}

	/**
	 * Возвращает строку адреса
	 * Если задан ПВЗ, вернуть адрес ПВЗ
	 * Если и ПВЗ не задан, вернуть пустую строку
	 *
	 * @param  Array $propsData
	 * @return String | false
	 */
	private static function getAddressString($propsData)
	{
		if (!empty($propsData[self::DELIVERY_STREET])) {
			/** @var String $adress <Индекс>, <Район>, <Город> */
			$address = self::getLocation($propsData[self::LOCATION]);

			/**
			 * Перебор всех свойств заказа с поиском только тех свойств, которые заданы в реквизитах адреса
			 * Если свойство задано в реквизитах и оно не пустое, записать значение в адресную строку
			 */
			foreach ($propsData as $code => $val) {
				if (isset(self::ADDRESS_PROPS[$code]) && !empty($val)) {
					$address .= ", " . self::ADDRESS_PROPS[$code] . " $val";
				}
			}

			return trim($address);
		} elseif (!empty($propsData[self::PICUP_ADDRESS])) {
			return trim($propsData[self::PICUP_ADDRESS]);
		} else {
			return false;
		}
	}

	/**
	 * Возвращает строку "<Регион>, <Город>"
	 *
	 * @param  Integer $locationId ID местоположения, выбранного в свойствах заказа
	 * @return String $locationStr "<Регион>, <Город>"
	 */
	private static function getLocation($locationId)
	{
		$locationStr = '';

		/** @var CDBResult $rsLocation */
		$rsLocation = Bitrix\Sale\Location\LocationTable::getPathToNodeByCode(
			$locationId,
			[
				'select' => [
					'ID'        => 'ID',
					'REGION_ID' => 'REGION_ID',
					'LNAME'     => 'NAME.NAME',
					'TYPE_CODE' => 'TYPE.CODE',
				],

				'filter' => [
					'TYPE_CODE'        => ['REGION', 'CITY'],
					'NAME.LANGUAGE_ID' => LANGUAGE_ID,
				],
			]
		);

		/**
		 * Записываем "<Регион>, <Город>" в строку
		 *
		 * @var Array $arLocation
		 */
		while ($arLocation = $rsLocation->Fetch()) {
			$locationStr .= $arLocation['LNAME'] . ', ';
		}

		/**
		 * Убираем последнюю запятую
		 */
		$locationStr = substr($locationStr, 0, -2);

		return $locationStr;
	}

	/**
	 * Возвращает тип цены в соответствии с типом плательщика
	 * Если у пользователя одна цена задана для физ. лица, другая - для юр. лица, то
	 * возвращает свойства типа цены, которая соответсвует выбранному типу плательщика
	 *
	 * @param  Integer $userId
	 * @param  Integer $personTypeId
	 * @return Array свойства типа цены
	 */
	private static function getPersonPriceType($userId, $personTypeId)
	{
		/**
		 * Получаем массив ценовых групп плательщика
		 *
		 * @var Array $personPriceGroups
		 */
		$personPriceGroups = self::PRICE_GROUPS[$personTypeId];

		/**
		 * Получаем ID ценовой группы пользователя в соответствии с выбранным типом плательщика
		 *
		 * @var Array $arUserGroups все группы пользователя
		 * @var Array $arPersonPrice (должен иметь только один элемент) ID ценовой группы
		 */
		$arUserGroups = CUser::GetUserGroup($userId);
		$arPersonPrice = array_intersect($personPriceGroups, $arUserGroups);

		/**
		 * Получаем тип цен пользователя с учетом типа плательщика
		 *
		 * @var CDBResult $rsPrices
		 * @var Array $arPrice (должен иметь только один элемент) ID ценовой группы
		 * @var Array $priceType информация по найденному типу цены
		 */
		$rsPrices = CCatalogGroup::GetGroupsList(['GROUP_ID' => array_pop($arPersonPrice), 'BUY' => 'Y']);
		if ($arPrice = $rsPrices->Fetch()) {
		  $priceType = CCatalogGroup::GetByID($arPrice['CATALOG_GROUP_ID']);
		  return $priceType;
		}
	}

	/**
	 * Возвращает название выбранного склада, либо склад "Центральный офис-склад"
	 *
	 * @param  Integer $orderId
	 * @return String
	 */
	private static function getSelectedStock($orderId)
	{
		global $DB;
		$query = "SELECT b_sale_order_delivery_es.VALUE
		FROM b_sale_order INNER JOIN b_sale_order_delivery ON b_sale_order.ID = b_sale_order_delivery.ORDER_ID
		INNER JOIN b_sale_order_delivery_es ON b_sale_order_delivery.ID = b_sale_order_delivery_es.SHIPMENT_ID
		WHERE b_sale_order.ID=".$orderId;
		$dbResult = $DB->Query($query);

		// Если выбран склад
		if ($dbResult->SelectedRowsCount()) { // Записать в поле Склад выбранный склад
			if ($row = $dbResult->Fetch()) {
				$rs = CCatalogStore::GetList(
				  array('ID' => 'ASC'),
				  array('ACTIVE' => 'Y','ID' => $row['VALUE']),
				  false,
				  false,
				  array('TITLE')
				);

				if ($arStore = $rs->Fetch()) {
					return $arStore['TITLE'];
				}
			}
		}

		// Записать в поле Склад "Центральный офис-склад" (не Самовывоз)
		return 'Центральный офис-склад';
	}
}
