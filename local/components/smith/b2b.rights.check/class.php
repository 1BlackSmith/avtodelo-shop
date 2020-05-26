<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Main;
use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;
use \Bitrix\Main\Web\Cookie;

use \Smith\B2B\Rights;

Loc::loadMessages(__FILE__);

class B2BRightsCheck extends \CBitrixComponent
{
	protected $companyID = 0;
	protected $rightsType = 0;
	protected $backURL = "/404";

	public function onPrepareComponentParams($params)
	{
		return $params;
	}

	protected function checkModules()
	{
		if (!\Bitrix\Main\Loader::includeModule("smith.b2b"))
		{
			ShowError(Loc::getMessage("MODULE_IS_NOT_INSTALLED"));
			return false;
		}

		return true;
	}

	public function executeComponent()
	{
		global $USER;
		global $APPLICATION;

		if (!$USER->IsAuthorized()) {
			$this->goBack();
		}

		if (!$this->checkModules()) {
			return;
		}

		if ($USER->isAdmin())
			return true;

		$this->loadRights();

		if ($this->arParams['GO_AUTH'] === 'Y')  {
			if ($this->checkRights()) {
				$APPLICATION->set_cookie("B2B_USER", $USER->GetID());
				$APPLICATION->set_cookie("B2B_RIGHTS", $this->rightsType);
				$USER->Authorize($this->companyID, true);
			} elseif (Rights::isCompanyAuth()) {
				return true;
			} else {
				$this->goBack();
			}
		} elseif ($this->arParams['SHOW_EXIT_BTN'] === 'Y') {
			$this->arResult['EXIT_URI'] = $APPLICATION->GetCurUri("b2b_exit=true");
			$this->IncludeComponentTemplate();
		} else {
			return $this->checkRights();
		}
	}

	protected function checkRights()
	{
		if ($this->rightsType) {
			return true;
		}

		return false;
	}

	protected function loadRights()
	{
		global $USER;
		
		$rights = new Rights($USER->getID());
		list($companyID, $rightsType) = $rights->getRights();

		$this->companyID = $companyID;
		$this->rightsType = $rightsType;
	}

	protected function goBack()
	{
		$this->loadBackurl();

		if (is_string($this->backURL) && strpos($this->backURL, SITE_DIR) === 0) {
			LocalRedirect("/auth/");
		} else {
			LocalRedirect("/404");
		}
	}

	protected function loadBackurl()
	{
		$referer = $_SERVER["HTTP_REFERER"];

		$host = (CMain::IsHTTPS()) ? "https://" : "http://";
		$host .= $_SERVER["HTTP_HOST"];

		if (!empty($referer) && strpos($host, $referer) !== false)
		{
			$this->backURL = str_replace($host, "", $referer);
		}
	}
}