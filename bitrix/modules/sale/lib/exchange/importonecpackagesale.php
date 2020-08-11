<?php

namespace Bitrix\Sale\Exchange;


use Bitrix\Main\Error;
use Bitrix\Sale\Cashbox\Cashbox1C;
use Bitrix\Sale\Cashbox\Internals\CashboxCheckTable;
use Bitrix\Sale\Exchange\Entity\OrderImport;
use Bitrix\Sale\Exchange\Entity\PaymentImport;
use Bitrix\Sale\Exchange\OneC\DocumentType;
use Bitrix\Sale\Exchange\OneC\OrderDocument;
use Bitrix\Sale\Exchange\OneC\ShipmentDocument;
use Bitrix\Sale\Result;
use Bitrix\Sale\Order;

final class ImportOneCPackageSale extends ImportOneCPackage
{
	/**
	 * @author Кузнецов Павел
	 */
	const RETAIL    = 3;
	const WHOLESALE = 4;
	const PAY_ERROR = 19;
	const SBER_PAY = 12;
	const PAY_DEALS = [
		self::RETAIL => [
			'Оплата при получении' => 11,
			'Оплата картой 100%' => self::SBER_PAY
		],
		self::WHOLESALE => [
			'Оплата при получении' => 15,
			'Оплата картой 100%' => self::SBER_PAY,
			'Оплата по б/н с отсрочкой 14 дней' => 17,
			'Оплата по б/н с отсрочкой 30 дней' => 20
		]
	];

	protected function convert(array $documents)
	{
		$documentOrder = $this->getDocumentByTypeId(DocumentType::ORDER, $documents);

		if($documentOrder instanceof OrderDocument)
		{
			/**
			 * @author Кузнецов Павел
			 */
			$orderAmount = $this->getOrderAmount($documentOrder);

			//region Presset - create Shipment if Service in the Order by information from 1C
			$documentShipment = $this->getDocumentByTypeId(DocumentType::SHIPMENT, $documents);
			if($documentShipment == null)
			{
				$fieldsOrder = $documentOrder->getFieldValues();
				$items = $this->getProductsItems($fieldsOrder);

				if($this->deliveryServiceExists($items))
				{
					$shipment['ID_1C'] = $documentOrder->getField('ID_1C');
					$shipment['VERSION_1C'] = $documentOrder->getField('VERSION_1C');
					$shipment['ITEMS'] = $items;
					$shipment['REK_VALUES']['1C_TRACKING_NUMBER'] = $this->getDefaultTrackingNumber($documentOrder);

					$documentShipment = new ShipmentDocument();
					$documentShipment->setFields($shipment);
					$documents[] = $documentShipment;
				}
			}
			//endregion

			foreach($documents as $document)
			{
				if($document instanceof OneC\PaymentDocument)
				{
					$paymentFields = $document->getFieldValues();
					
					/**
					 * Изменил логику подстановки ID платежной системы
					 * @author Кузнецов Павел
					 */
					$paymentFields['REK_VALUES']['PAY_SYSTEM_ID'] = $this->getPaySystem($documentOrder);

					$paymentFields['REK_VALUES']['PAY_SYSTEM_ID_DEFAULT'] = $this->getDefaultPaySystem($documentOrder);

					/**
					 * Не проставлять оплату по платежной системе Сбербанк, если не было оплаты на сайте
					 * @author Кузнецов Павел
					 */
					if (!$this->isOrderPaid($documentOrder) && 
						$paymentFields['REK_VALUES']['1C_PAYED'] == 'Y' &&
						$paymentFields['REK_VALUES']['PAY_SYSTEM_ID'] === self::SBER_PAY) 
					{
						$paymentFields['REK_VALUES']['1C_PAYED_NUM'] = false;
						$paymentFields['REK_VALUES']['1C_PAYED'] = 'N';
						$paymentFields['REK_VALUES']['1C_PAYED_DATE'] = false;
					}

					/**
					 * Не добавляет оплату, превышающую сумму заказа
					 * @author Кузнецов Павел
					 */
					if ($this->checkOrderAmount((float)$paymentFields['AMOUNT'], $orderAmount)) {
						$document->setFields($paymentFields);
					}
				}

				if($document instanceof OneC\ShipmentDocument)
				{
					$shimpentFields = $document->getFieldValues();

					/**
					 * Проверка на отгруженный заказ (не срабатывает стандартный функционал)
					 * @author Кузнецов Павел
					 */
					if ($this->isDeducted($documentOrder)) {
						$shimpentFields['REK_VALUES']['DEDUCTED'] = 'Y';
					}
					$shimpentFields['REK_VALUES']['DELIVERY_SYSTEM_ID_DEFAULT'] = $this->getDefaultDeliverySystem($documentOrder);
					$document->setFields($shimpentFields);
				}
			}
		}
		else
		{
			$settingsShipment = ManagerImport::getSettingsByType(static::getShipmentEntityTypeId());

			if($settingsShipment->canCreateOrder(static::getShipmentEntityTypeId())=='Y')
			{
				$documentShipment = $this->getDocumentByTypeId(DocumentType::SHIPMENT, $documents);
				if($documentShipment !== null)
				{
					$order['ID_1C'] = $documentShipment->getField('ID_1C');
					$order['VERSION_1C'] = $documentShipment->getField('VERSION_1C');
					$order['AMOUNT'] = $documentShipment->getField('AMOUNT');
					$order['ITEMS'] = $documentShipment->getField('ITEMS');
					$order['TAXES'] = $documentShipment->getField('TAXES');
					$order['AGENT'] = $documentShipment->getField('AGENT');

					$documentOrder = new OrderDocument();
					$documentOrder->setFields($order);
					$documents[] = $documentOrder;
				}
			}
		}

		return parent::convert($documents);
	}

	/**
	 * @param OneC\OrderDocument $document
	 * @return null|string
	 */
	protected function getDefaultTrackingNumber(OneC\OrderDocument $document)
	{
		$fields = $document->getFieldValues();
		return isset($fields['REK_VALUES']['1C_TRACKING_NUMBER'])?$fields['REK_VALUES']['1C_TRACKING_NUMBER']:null;
	}

	/**
	 * @author Кузнецов Павел
	 * @param float $paymentAmount - сумма в оплате
	 * @param float $orderAmount - сумма в заказе
	 * @return true если сумма не превысила сумму заказа
	 */
	protected function checkOrderAmount($paymentAmount, &$orderAmount)
	{
		$orderAmount -= $paymentAmount;
		if ($orderAmount < 0) {
			return false;
		}
		return true;
	}

	/**
	 * @author Кузнецов Павел
	 * @param OneC\OrderDocument $document
	 * @return float сумма в заказе
	 */
	protected function getOrderAmount(OneC\OrderDocument $document)
	{
		$fields = $document->getFieldValues();
		return (float)$fields['AMOUNT'];
	}

	/**
	 * @author Кузнецов Павел
	 * @param OneC\OrderDocument $document
	 * @return true если заказ оплачен
	 */
	protected function isOrderPaid(OneC\OrderDocument $document) 
	{
		$fields = $document->getFieldValues();
		
		if ($fields['ID'] > 0) {
			$order = Order::load($fields['ID']);
			return $order->isPaid();
		}

		return false;
	}

	/**
	 * @author Кузнецов Павел
	 * @param OneC\OrderDocument $document
	 * @return true если заказ отгружен
	 */
	protected function isDeducted(OneC\OrderDocument $document)
	{
		$fields = $document->getFieldValues();

		if (is_set($fields['REK_VALUES']['1C_DELIVERY_DATE']) && 
			is_set($fields['REK_VALUES']['DELIVERY_SYSTEM_ID'])) {
			return true;
		}

		return false;
	}

	/**
	 * Подставляет ID платежной системы в соответсвии с соглашениями
	 * @author Кузнецов Павел
	 * @param OneC\OrderDocument $document
	 * @return null|int
	 */
	protected function getPaySystem(OneC\OrderDocument $document)
	{
		$fields = $document->getFieldValues();
		
		if ($fields['ID'] > 0) {
			$order = Order::load($fields['ID']);
			$personTypeId = $order->getPersonTypeId();
			$paymentCollection = $order->getPaymentCollection();
			$deal = null;

			$propertyCollection = $order->getPropertyCollection();
			$arProps = $propertyCollection->getArray();
			foreach ($arProps['properties'] as $prop) {
				if ($prop['CODE'] == 'DEAL') {
					$deal = $prop['VALUE'][0];
					break;
				}
			}

			if (isset(self::PAY_DEALS[$personTypeId][$deal])) {
				return self::PAY_DEALS[$personTypeId][$deal];
			} else {
				return self::PAY_ERROR;
			}
		}

		return self::PAY_ERROR;
	}

	/**
	 * @param OneC\OrderDocument $document
	 * @return null|int
	 */
	protected function getDefaultPaySystem(OneC\OrderDocument $document)
	{
		$fields = $document->getFieldValues();
		return isset($fields['REK_VALUES']['PAY_SYSTEM_ID'])?$fields['REK_VALUES']['PAY_SYSTEM_ID']:null;
	}

	/**
	 * @param OneC\OrderDocument $document
	 * @return null|int
	 */
	protected function getDefaultDeliverySystem(OneC\OrderDocument $document)
	{
		$fields = $document->getFieldValues();
		return isset($fields['REK_VALUES']['DELIVERY_SYSTEM_ID'])?$fields['REK_VALUES']['DELIVERY_SYSTEM_ID']:null;
	}

	/**
	 * @param OrderImport $orderImport
	 * @param array $items
	 * @return Result
	 * @deprecated
	 */
	protected function UpdateCashBoxChecks(OrderImport $orderImport, array $items)
	{
		$result = new Result();
		$bCheckUpdated = false;

		$order = $orderImport->getEntity();

		foreach ($items as $item)
		{
			/** @var PaymentImport $item */

			if($item->getOwnerTypeId() == static::getPaymentCashEntityTypeId() ||
				$item->getOwnerTypeId() == static::getPaymentCashLessEntityTypeId() ||
				$item->getOwnerTypeId() == static::getPaymentCardEntityTypeId()
			)
			{
				/** @var  $params */
				$params = $item->getFieldValues();
				static::load($item, $params['TRAITS'], $order);

				if($item->getEntityId()>0)
				{
					$entity = $item->getEntity();

					if(isset($params['CASH_BOX_CHECKS']))
					{
						$fields = $params['CASH_BOX_CHECKS'];

						if($fields['ID']>0)
						{
							$res = CashboxCheckTable::getById($fields['ID']);
							if ($data = $res->fetch())
							{
								if($data['STATUS']<>'Y')
								{
									$applyResult = Cashbox1C::applyCheckResult($params['CASH_BOX_CHECKS']);
									$bCheckUpdated = $applyResult->isSuccess();
								}
							}
							else
							{
								$item->setCollisions(EntityCollisionType::PaymentCashBoxCheckNotFound, $entity);
							}
						}
					}
				}
			}
		}

		/** @var OneC\CollisionOrder $collision */
		$collision = $orderImport->getCurrentCollision(EntityType::ORDER);
		$collisionTypes = $collision->getCollision($orderImport);

		if(count($collisionTypes)>0 && $bCheckUpdated)
		{
			return $result;
		}
		else
		{
			$result->addError(new Error('', 'CASH_BOX_CHECK_IGNORE'));
		}

		return $result;
	}

}