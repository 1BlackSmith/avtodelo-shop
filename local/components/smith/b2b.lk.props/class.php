<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use	\Bitrix\Main\Localization\Loc;
use \Smith\B2B\Company;

Loc::loadMessages(__FILE__);

class B2BProps extends \CBitrixComponent
{
	protected $profileID = 0;
	protected $profile = array();

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
			foreach ($this->profile->getCompanies()[0] as $CODE => $v) {
				if (in_array($CODE, $this->arParams['COMPANY_PROPS'])) {
					$this->arResult['VALUES'][$CODE] = $v;
				}
			}

			$this->includeComponentTemplate();
		}
	}

	protected function loadProfile()
	{
		global $USER;
		$this->profileID = $USER->GetID();

		$this->profile = Company::getByID($this->profileID);
	}
}