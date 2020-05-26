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
		}

		$this->includeComponentTemplate();
	}

	protected function postHandler()
	{
		$request = Application::getInstance()->getContext()->getRequest();

		if ($request->isPost() && $request->get('add')) {
			if ($user = $this->getUser($request->get('ID'))) {
				if ($this->checkStores($request->get('STORES'))) {
					$args = array(
						'uid' => $user['ID'],
						'cid' => $this->profileID,
						'sid' => $request->get('STORES'),
						'd' => date('d-m-Y'),
						'key' => md5(md5($this->profileID).$user['LOGIN'].md5(date('d-m-Y')))
					);
					$res = \Bitrix\Main\Mail\Event::send(array(
					    'EVENT_NAME' => 'B2B_EMPLOYEE_ADD',
					    'LID' => SITE_ID,
					    'C_FIELDS' => array(
					    	'USER_NAME' => $user['NAME'],
					        'COMPANY_NAME' => $this->profile->getCompanyName(),
					        'CONFIRM_URL' => $this->getConfirmUrl($args)
					    ),
					));
					if ($res->isSuccess()) {
						ShowMessage(array('TYPE' => 'OK', 'MESSAGE' => Loc::getMessage('B2B_SEND_SUCCESS')));
					} else {
						ShowError(Loc::getMessage('B2B_SEND_ERROR'));
					}
				} else {
					ShowError(Loc::getMessage('B2B_STORE_NOT_FOUND'));
				}
			} else {
				ShowError(Loc::getMessage('B2B_EMPLOYEE_NOT_FOUND'));
				$this->arResult['OLD_STORES'] = $request->get('STORES');
			}
		}
	}

	protected function loadFormData()
	{
		$this->arResult['STORES'] = array();

		foreach ($this->stores as $id => $address) {
			$this->arResult['STORES']['REFERENCE_ID'][] =  $id;
			$this->arResult['STORES']['REFERENCE'][] = $address;
		}
	}

	protected function loadProfile()
	{
		global $USER;
		$this->profileID = $USER->GetID();
		$this->profile = Company::getByID($this->profileID);
		$this->stores = $this->profile->getStores();
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

	protected function getConfirmUrl($arArgs)
	{
		$args = array();
		foreach ($arArgs as $code => $v) {
			if (is_array($v)) {
				$v = implode(',', $v);
			}
			$args[] = $code.'='.urlencode($v);
		}

		return $_SERVER['HTTP_ORIGIN'].'/b2b/invite_confirm/?'.implode('&', $args);
	}
}