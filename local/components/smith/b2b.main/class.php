<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Main,
	\Bitrix\Main\HttpRequest,
	\Bitrix\Main\Localization\Loc,
	\Bitrix\Sale\Order;

Loc::loadMessages(__FILE__);

class B2BMain extends \CBitrixComponent
{
	protected $orders = array();
	protected $statistics = array();
	protected $companies = array();
	protected $companyID = 0;
	protected $userID = 0;

	public function onPrepareComponentParams($params)
	{
		return $params;
	}

	protected function checkModules()
	{
		if (!\Bitrix\Main\Loader::includeModule('smith.b2b'))
		{
			ShowError(Loc::getMessage('MODULE_IS_NOT_INSTALLED'));
			return false;
		}

		return true;
	}

	public function executeComponent()
	{
		if (!$this->checkModules())
			return;
		
		$this->loadUser();
		$this->loadCompanyStatistics();

		$this->arResult['STAT'] = $this->statistics;

		$this->includeComponentTemplate();
	}

	protected function loadCompanyStatistics()
	{
		$this->loadCompanyOrders();

		$stat = array(
			'ORDERS_AMOUNT'     => 0,
			'ORDERS_UNPAID'     => 0,
			'ORDERS_IN_TRANSIT' => 0,
			'ORDERS_EXECUTED'   => 0,
			'COMPANY_SUM_PAID'  => 0,
			'COMPANY_BONUSES'   => 0,
			'COMPANY_DEBIT_SUM' => 0
		);

		// Проход по заказам компании
		foreach ($this->orders as $order) {
			$stat['ORDERS_AMOUNT']++;

			if (!$order->isPaid()) {
				$stat['ORDERS_UNPAID']++;
			}

			if ($order->isShipped()) {
				$stat['ORDERS_IN_TRANSIT']++;
			}

			if ($order->getField('STATUS_ID') == 'F')
			{
				$stat['ORDERS_EXECUTED']++;
			}

			$stat['COMPANY_SUM_PAID'] += $order->getSumPaid();

			if ($order->isShipped()) 
			{
				$stat['COMPANY_DEBIT_SUM'] += $order->getPrice() - $order->getSumPaid();
			}
		}

		$companyAccount = CSaleUserAccount::GetByUserID($COMPANY_ID, 'RUB');
		$stat['COMPANY_BONUSES'] = $companyAccount['CURRENT_BUDGET'] ? $companyAccount['CURRENT_BUDGET'] : 0;

		$stat['COMPANY_SUM_PAID'] = SaleFormatCurrency($stat['COMPANY_SUM_PAID'], "RUB");
		$stat['COMPANY_DEBIT_SUM'] = SaleFormatCurrency($stat['COMPANY_DEBIT_SUM'], "RUB");

		$this->statistics = $stat;
	}

	protected function loadUser()
	{
		global $APPLICATION;
		$this->userID = $APPLICATION->get_cookie('B2B_USER');

		global $USER;
		$this->companyID = $USER->GetID();
	}

	protected function loadCompanyOrders()
	{
		$rsOrders = Order::getList(array(
            'select' => array('ID'),
            'filter' => array('=USER_ID' => $this->companyID)
        ))->fetchAll();

        foreach($rsOrders as $arOrder)
        {
            $this->orders[] = Order::load($arOrder['ID']);
        }
	}


	// формат вывода
	/*160 => [
		"COMPANIES" => [
			5 => [
				"OWNERSHIP_TYPE" => "ООО",
				"NAME" => "Рога и Ко",
				"BRAND" => "Ко-ко пицца",
				"INN" => 123123,
				"OGRN" => 123123,
				"KPP" => 123123,
				"ADDRESS" => "ул. Мира, 5"
				"STORES" => [
					3 => [
						"NAME" => "На Ленина",
						"ADDRESS" => "ул. Ленина, 44",
						"PHONE" => 123123,
						"EMAIL" => "lenina@roga.ru"
						// Детальная статистика по торговой точке
						"STAT" => [
							'ORDERS_AMOUNT'     => 0,
							'ORDERS_UNPAID'     => 0,
							'ORDERS_IN_TRANSIT' => 0,
							'ORDERS_EXECUTED'   => 0,
							'COMPANY_SUM_PAID'  => 0,
							'COMPANY_BONUSES'   => 0,
							'COMPANY_DEBIT_SUM' => 0
						]
					],
					...
				]
			],
			...
		],
		"ORDERS" => [
			334 => [
				"CLASS" => Bitrix\Sale\Order
			]
		],
		// Общая статистика, доступная только директору
		"STAT" => [
			'ORDERS_AMOUNT'     => 0,
			'ORDERS_UNPAID'     => 0,
			'ORDERS_IN_TRANSIT' => 0,
			'ORDERS_EXECUTED'   => 0,
			'COMPANY_SUM_PAID'  => 0,
			'COMPANY_BONUSES'   => 0,
			'COMPANY_DEBIT_SUM' => 0
		]
	]*/
}