<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use	\Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;
use \Smith\B2B\Company;

Loc::loadMessages(__FILE__);

class B2BStores extends \CBitrixComponent
{
	protected $profileID = 0;
	protected $profile = null;
	protected $stores = array();

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

		$this->loadProfile();
		$this->postHandler();

		if ($this->profile) {
			$this->loadFormData();
			$this->arResult['STORES'] = $this->stores;

			$this->includeComponentTemplate();
		}
	}

	protected function postHandler()
	{
		$request = Application::getInstance()->getContext()->getRequest();

		if ($request->get('save')) {
			$strNewStores = '';
			$strChangeStores = '';
			$strDeleteStores = '';

			if (!empty($arAddress = $request->get('ADDRESS'))) {
				$strNewStores = $this->actionAdd($arAddress);
				$strChangeStores = $this->actionChange($arAddress);
			}

			if (!empty($arDelete = $request->get('DELETE_STORE'))) {
				$strDeleteStores = $this->actionDelete($arDelete);
			}

			$res = \Bitrix\Main\Mail\Event::send(array(
			    'EVENT_NAME' => 'B2B_STORE_UPDATE',
			    'LID' => SITE_ID,
			    'C_FIELDS' => array(
			    	'COMPANY_ID' => $this->profileID,
			        'COMPANY_NAME' => $this->profile->getCompanyName(),
			        'NEW_STORES' => $strNewStores,
			        'CHANGE_STORES' => $strChangeStores,
			        'DELETE_STORES' => $strDeleteStores
			    ),
			)); 

			if ($res->isSuccess()) {
				$this->arResult['SUCCESS_SEND'] = 'Y';
			} else {
				$this->arResult['SUCCESS_SEND'] = 'N';
			}
		}
	}

	protected function actionAdd($arAddress)
	{
		$str = '';
		foreach ($arAddress as $id => $v) {
			if (!$this->stores[$id] && $v) {
				$str .= $v ."<br>";
			}
		}
		return $str;
	}

	protected function actionChange($arAddress)
	{
		$str = '';
		foreach ($arAddress as $id => $v) {
			if ($address = $this->stores[$id]) {
				$str .= $id ." ". $address ." -> ". $v ."<br>";
			}
		}
		return $str;
	}

	protected function actionDelete($arDelete)
	{
		$str = '';
		foreach ($arDelete as $id => $v) {
			$str .= $id ." ". $this->stores[$id]. "<br>";
		}
		return $str;
	}

	protected function loadFormData()
	{
		$this->arResult['BX_SESSION_CHECK'] = bitrix_sessid_post();
		$this->arResult['ID'] = $this->profileID;
	}

	protected function loadProfile()
	{
		global $USER;
		$this->profileID = $USER->GetID();
		$this->profile = Company::getByID($this->profileID);
		$this->stores = $this->profile->getStores();
	}
}