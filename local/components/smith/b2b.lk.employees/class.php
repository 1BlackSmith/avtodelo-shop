<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use	\Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;
use \Smith\B2B\Company;

Loc::loadMessages(__FILE__);

class B2BEmployees extends \CBitrixComponent
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

		if ($this->profile) {
			$this->loadFormData();
			$this->includeComponentTemplate();
		}
	}

	protected function loadFormData()
	{
		if ($arEmployees = $this->getEmployeesResult()) {
			$this->arResult['EMPLOYEES'] = $arEmployees;
		} else {
			$this->arResult['EMPLOYEES_NOT_FOUND'] = 'Y';
		}
	}

	protected function loadProfile()
	{
		global $USER;
		$this->profileID = $USER->GetID();
		$this->profile = Company::getByID($this->profileID);
		
		if ($this->profile) {
			$this->employees = $this->profile->getManagers();
		}
	}

	protected function getEmployeesResult()
	{
		$result = array();
		foreach ($this->employees as $employee) {
			$id = $employee['ID'];
			if (!array_key_exists($id, $result)) {
				$user = CUser::GetByID($id)->fetch();
				$result[$id] = array(
					'NAME' => $user['NAME'] ." ". $user['LAST_NAME'],
					'PHONE' => $user['PERSONAL_PHONE']
				);
			}

			$result[$id]['STORES'][] = $employee['ADDRESS'];
		}

		return $result;
	}
}