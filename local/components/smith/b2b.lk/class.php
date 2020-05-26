<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Main,
	\Bitrix\Main\HttpRequest,
	\Bitrix\Main\Localization\Loc,
	\Bitrix\Sale,
	\Bitrix\Sale\Order,
	\Bitrix\Main\Loader;

Loc::loadMessages(__FILE__);

class B2BLK extends \CBitrixComponent
{
	public function onPrepareComponentParams($params)
	{
		if (!isset($params["MAIN_CHAIN_NAME"]))
		{
			$params["MAIN_CHAIN_NAME"] = Loc::getMessage("SPS_CHAIN_MAIN");
		}
		return $params;
	}

	protected function checkModules()
	{
		if (!Loader::includeModule('smith.b2b'))
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

		$defaultUrlTemplates404 = array(
			"index" => "index.php",
			"props" => "props/",
			"stores" => "stores/",
			"employees" => "employees/",
			"employee_new" => "employees/new",
			"employee_detail" => "employees/#ID#",
			"orders" => "orders/",
			"order_detail" => "orders/#ID#",
			"order_detail_old" => "order/detail/#ID#/",
			"order_cancel" => "orders/order_cancel.php?ID=#ID#",
			"staitstics" => "stat/"
		);

		$componentVariables = array("CANCEL", "COPY_ORDER", "ID");
		$variables = array();

		$request = Bitrix\Main\Application::getInstance()->getContext()->getRequest();

		if ($this->arParams["SEF_MODE"] == "Y")
		{
			$templatesUrls = CComponentEngine::makeComponentUrlTemplates($defaultUrlTemplates404, $this->arParams["SEF_URL_TEMPLATES"]);

			foreach ($templatesUrls as $url => $value)
			{
				$this->arResult["PATH_TO_".ToUpper($url)] = $this->arParams["SEF_FOLDER"].$value;
			}

			$this->arResult["PATH_TO_ORDER_COPY"] = $this->arResult["PATH_TO_ORDERS"]."?COPY_ORDER=Y&ID=#ID#";

			$variableAliases = CComponentEngine::makeComponentVariableAliases(array(), $this->arParams["VARIABLE_ALIASES"]);

			$componentPage = CComponentEngine::parseComponentPath(
				$this->arParams["SEF_FOLDER"],
				$templatesUrls,
				$variables
			);

			if ($componentPage === "order_detail_old")
			{
				$componentPage = "order_detail";
			}

			CComponentEngine::initComponentVariables($componentPage, $componentVariables, $variableAliases, $variables);

			if (empty($componentPage))
			{
				$componentPage = 'index';
			}

			$this->arResult = array_merge(
				Array(
					"SEF_FOLDER" => $this->arParams["SEF_FOLDER"],
					"URL_TEMPLATES" => $templatesUrls,
					"VARIABLES" => $variables,
					"ALIASES" => $variableAliases,
				),
				$this->arResult
			);
		}
		else
		{
			$variableAliases = CComponentEngine::makeComponentVariableAliases(array(), $this->arParams["VARIABLE_ALIASES"]);
			CComponentEngine::initComponentVariables(false, $componentVariables, $variableAliases, $variables);

			$componentPage = $request->get('SECTION');

			if ($componentPage === "orders"
				&& $request->get('ID')
				&& !$request->get('COPY_ORDER'))
			{
				if ($request->get('CANCEL') === "Y")
				{
					$componentPage = "order_cancel";
				}
				else
				{
					$componentPage = "order_detail";
				}
			}

			if (empty($componentPage))
			{
				if ($request->get('ID') && $request->get('COPY_ORDER') === 'Y')
				{
					$componentPage = "orders";
				}
				else
				{
					$componentPage = "index";
				}
			}

			$currentPage = $request->getRequestedPage();

			$this->arResult = array(
				"VARIABLES" => $variables,
				"ALIASES" => $variableAliases,
				"SEF_FOLDER" => $currentPage,
				""
			);
		}

		if ($componentPage == "order_detail")
		{
			Loader::includeModule('sale');
			$id = urldecode(urldecode($variables["ID"]));
			$registry = Sale\Registry::getInstance(Sale\Order::getRegistryType());
			$orderClassName = $registry->getOrderClassName();

			$order = $orderClassName::loadByAccountNumber($id);
			if (!$order)
			{
				$order = $orderClassName::load((int)$id);
			}

			/** @var Sale\Order $order */
			if ($order)
			{
				if (
					(is_array($this->arParams["ORDER_HISTORIC_STATUSES"]) && in_array($order->getField('STATUS_ID'), $this->arParams["ORDER_HISTORIC_STATUSES"]))
					|| $order->isCanceled()
				)
				{
					$this->arResult["PATH_TO_ORDERS"] = \CHTTP::urlAddParams(
						CComponentEngine::makePathFromTemplate($this->arResult["PATH_TO_ORDERS"]),
						["filter_history' => 'Y"]
					);
					if ($order->isCanceled())
					{
						$this->arResult["PATH_TO_ORDERS"] = \CHTTP::urlAddParams(
							CComponentEngine::makePathFromTemplate($this->arResult["PATH_TO_ORDERS"]),
							["show_canceled' => 'Y"]
						);
					}
				}
			}
		}

		$this->IncludeComponentTemplate($componentPage);
	}
}