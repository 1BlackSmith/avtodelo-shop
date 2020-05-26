<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use \Bitrix\Main,
	\Bitrix\Main\Localization\Loc,
	\Smith\B2B\Internals\CompanyTable;

Loc::loadMessages(__FILE__);

class B2BClients extends \CBitrixComponent
{
	protected $userID = 0;
	protected $companiesID = array();

	public function onPrepareComponentParams($params)
	{
		return $params;
	}

	protected function checkModules()
	{
		if (!\Bitrix\Main\Loader::includeModule('smith.B2B'))
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
		$this->loadManagerClients();
	}

	protected function loadUser()
	{
		global $USER;
		$this->userID = $USER->GetID();
	}

	protected function loadManagerClients()
	{
		$rsCompanies = CompanyTable::getList(array(
            'select' => array('COMPANY_ID'),
            'filter' => array('=COMPANY_MANAGER_ID' => $this->userID)
        ));

		while ($arCompany = $rsCompanies->fetch()) {
			$this->companiesID[] = $arCompany['COMPANY_ID'];
		}
	}
}