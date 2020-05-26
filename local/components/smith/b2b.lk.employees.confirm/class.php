<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use	\Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;
use \Smith\B2B\Company;

Loc::loadMessages(__FILE__);

class B2BEmployeesNew extends \CBitrixComponent
{
	protected $profileID = 0;
	protected $profile = null;
	protected $stores = array();

	protected $request = null;

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

		$this->requestHandler();
		$this->includeComponentTemplate();
	}

	protected function requestHandler()
	{
		$request = Application::getInstance()->getContext()->getRequest();
		$this->request = $request;

		$this->loadProfile();

		list($userID, $storesID, $date, $key) = $this->getArgs();

		if (($user = $this->getUser($userID)) &&
			$this->checkStores($storesID) &&
			$this->checkDate($date) &&
			$key === md5(md5($this->profileID).$user['LOGIN'].md5($date))
		) 
		{
			if ($this->profile->addManager($userID, $storesID)) {
				ShowMessage(array('TYPE' => 'OK', 'MESSAGE' => Loc::getMessage('B2B_SUCCESS')));
				return;
			}
		}

		ShowError(Loc::getMessage('B2B_ERROR'));
	}

	protected function loadProfile()
	{
		global $USER;
		$this->profileID = $this->request->get('cid');
		$this->profile = Company::getByID($this->profileID);

		if ($this->profile) {
			$this->stores = $this->profile->getStores();
		}
	}

	protected function getUser($id)
	{
		return CUser::GetByID($id)->fetch();
	}

	protected function checkStores($stores)
	{
		foreach ($stores as $id) {
			if (!array_key_exists($id, $this->stores))
				return false;
		}

		return true;
	}

	protected function checkDate($sendDate)
	{
		return (time() - strtotime($sendDate)) < (60 * 60 * 24 * 2);
	}

	protected function getArgs()
	{
		$args = array();
		$args[] = $this->request->get('uid');
		$args[] = explode(',', urldecode($this->request->get('sid')));
		$args[] = $this->request->get('d');
		$args[] = $this->request->get('key');

		return $args;
	}
}