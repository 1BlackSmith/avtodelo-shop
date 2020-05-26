<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use	\Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;
use \Smith\B2B\Company;

Loc::loadMessages(__FILE__);

class B2BEmployeesDetail extends \CBitrixComponent
{
	protected $profileID = 0;
	protected $profile = null;
	protected $stores = array();

	protected $employeeID = 0;
	protected $employeeData = array();

	protected $errors = null;

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

		$this->loadEmployeeData();

		if ($this->hasEmployee($this->employeeID)) {
			$this->postHandler();
			$this->showErrors();

			$this->loadFormData();
		} else {
			ShowError(Loc::getMessage('B2B_EMPLOYEE_NOT_EXISTS'));
			$this->arResult['HIDE_CONTENT'] = 'Y';
		}

		$this->includeComponentTemplate();
	}

	protected function postHandler()
	{
		$request = Application::getInstance()->getContext()->getRequest();

		if (!$request->isPost())
			return;

		$user = $this->getUser($this->employeeID);
		if (!$user) {
			ShowError(Loc::getMessage('B2B_EMPLOYEE_NOT_EXISTS'));
			return;
		}

		if ($request->get('save')) {
			if ($this->checkStores($stores = $request->get('STORES'))) {
				if ($this->profile->changeManagerStores($user['ID'], $stores)) {
					ShowMessage(array('TYPE' => 'OK', 'MESSAGE' => Loc::getMessage('B2B_SUCCESS')));
				} else {
					$this->addSaveErr();
				}
			} else {
				if ($this->profile->deleteManager($user['ID'])) {
					ShowMessage(array('TYPE' => 'OK', 'MESSAGE' => Loc::getMessage('B2B_DELETE_SUCCESS')));
					$this->arResult['HIDE_CONTENT'] = 'Y';
				} else {
					$this->addSaveErr();
				}
			}
		}

		if ($request->get('delete')) {
			if ($this->profile->deleteManager($user['ID'])) {
				ShowMessage(array('TYPE' => 'OK', 'MESSAGE' => Loc::getMessage('B2B_DELETE_SUCCESS')));
				$this->arResult['HIDE_CONTENT'] = 'Y';
			} else {
				$this->addDeleteErr();
			}
		}

		// Этот кастыль обязательно исправить!!! При любом изменении в БД - изменять данные в объекте Company!!!
		$this->loadEmployeeData();
	}

	protected function loadFormData()
	{
		$this->arResult['PROFILE_ID'] = $this->profileID;
		$this->arResult['EMPLOYEE'] = $this->getEmployeeResult();
		
		$this->arResult['STORES'] = array();
		foreach ($this->stores as $id => $address) {
			$this->arResult['STORES']['REFERENCE_ID'][] =  $id;
			$this->arResult['STORES']['REFERENCE'][] = $address;
		}
	}

	protected function loadEmployeeData()
	{
		global $USER;
		$this->profileID = $USER->GetID(); 
		$this->profile = Company::getByID($this->profileID);
		$this->stores = $this->profile->getStores();

		$this->employeeID = $this->arParams['ID'];
	}

	protected function hasEmployee($id)
	{
		foreach ($this->profile->getManagers() as $employee) {
			if ($employee['ID'] === $id)
				return true;
		}

		return false;
	}

	protected function getUser($id)
	{
		return CUser::GetByID($id)->fetch();
	}

	protected function getEmployeeResult()
	{
		$result = array();
		foreach ($this->profile->getManagers() as $employee) {
			if (($id = $employee['ID']) !== $this->employeeID)
				continue;

			if (empty($result)) {
				$user = CUser::GetByID($id)->fetch();
				$result = array(
					'ID' => $id,
					'NAME' => $user['NAME'] ." ". $user['LAST_NAME'],
					'PHONE' => $user['PERSONAL_PHONE']
				);
			}

			$result['STORES'][] = $employee['STORE_ID'];
		}

		return $result;
	}

	protected function checkStores($stores)
	{
		foreach ($stores as $id) {
			if (!array_key_exists($id, $this->stores))
				return false;
		}

		return true;
	}

	protected function showErrors()
	{
		foreach ($this->errors as $error) {
			ShowError($error['MESSAGE']);
		}
	}

	protected function addSaveErr()
	{
		$this->errors[] = array('CODE' => 'SAVE_ERROR', 'MESSAGE' => Loc::getMessage('B2B_EMPLOYEE_SAVE_ERROR'));
	}

	protected function addDeleteErr()
	{
		$this->errors[] = array('CODE' => 'DEL_ERROR', 'MESSAGE' => Loc::getMessage('B2B_EMPLOYEE_DELETE_ERROR'));
	}
}