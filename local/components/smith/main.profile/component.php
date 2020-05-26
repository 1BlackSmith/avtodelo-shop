<?
/**
 * @global CMain $APPLICATION
 * @global CUser $USER
 * @global CUserTypeManager $USER_FIELD_MANAGER
 * @var array $arParams
 * @var CBitrixComponent $this
 */
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();

$this->setFrameMode(false);

global $USER_FIELD_MANAGER;

$arResult['ID'] = intval($USER->GetID());
$arResult['GROUP_POLICY'] = CUser::GetGroupPolicy($arResult['ID']);

$arParams['SEND_INFO'] = $arParams['SEND_INFO'] == 'Y' ? 'Y' : 'N';
$arParams['CHECK_RIGHTS'] = $arParams['CHECK_RIGHTS'] == 'Y' ? 'Y' : 'N';

$arParams['EDITABLE_EXTERNAL_AUTH_ID'] = isset($arParams['EDITABLE_EXTERNAL_AUTH_ID']) && is_array($arParams['EDITABLE_EXTERNAL_AUTH_ID'])
	? $arParams['EDITABLE_EXTERNAL_AUTH_ID']
	: [];

if (!($arParams['CHECK_RIGHTS'] == 'N' || $USER->CanDoOperation('edit_own_profile')) || $arResult['ID']<=0)
{
	$APPLICATION->ShowAuthForm('');
	return;
}

$arResult['PHONE_REGISTRATION'] = (COption::GetOptionString('main', 'new_user_phone_auth', 'N') == 'Y');
$arResult['PHONE_REQUIRED'] = ($arResult['PHONE_REGISTRATION'] && COption::GetOptionString('main', 'new_user_phone_required', 'N') == 'Y');
$arResult['EMAIL_REGISTRATION'] = (COption::GetOptionString('main', 'new_user_email_auth', 'Y') <> 'N');
$arResult['EMAIL_REQUIRED'] = ($arResult['EMAIL_REGISTRATION'] && COption::GetOptionString('main', 'new_user_email_required', 'Y') <> 'N');
$arResult['PHONE_CODE_RESEND_INTERVAL'] = CUser::PHONE_CODE_RESEND_INTERVAL;

$strError = '';

if ($_SERVER['REQUEST_METHOD']=='POST' && ($_REQUEST['save'] <> '' || $_REQUEST['apply'] <> '') && check_bitrix_sessid())
{
	if (COption::GetOptionString('main', 'use_encrypted_auth', 'N') == 'Y')
	{
		//possible encrypted user password
		$sec = new CRsaSecurity();
		if (($arKeys = $sec->LoadKeys()))
		{
			$sec->SetKeys($arKeys);
			$errno = $sec->AcceptFromForm(array('NEW_PASSWORD', 'NEW_PASSWORD_CONFIRM'));
			if ($errno == CRsaSecurity::ERROR_SESS_CHECK)
				$strError .= GetMessage('main_profile_sess_expired').'<br />';
			elseif ($errno < 0)
				$strError .= GetMessage('main_profile_decode_err', array('#ERRCODE#'=>$errno)).'<br />';
		}
	}

	if ($strError == '')
	{
		$bOk = false;
		$obUser = new CUser;

		$rsUser = CUser::GetByID($arResult['ID']);
		$arUser = $rsUser->Fetch();

		$arEditFields = array(
			'TITLE',
			'NAME',
			'LAST_NAME',
			'SECOND_NAME',
			'EMAIL',
			'PERSONAL_PHONE',
			'SUBSCRIBE',
		);

		$arFields = array();
		foreach ($arEditFields as $field)
		{
			if (isset($_REQUEST[$field]))
			{
				$arFields[$field] = $_REQUEST[$field];
			}
		}

		if (isset($_REQUEST['AUTO_TIME_ZONE']))
		{
			$arFields['AUTO_TIME_ZONE'] = ($_REQUEST['AUTO_TIME_ZONE'] == 'Y' || $_REQUEST['AUTO_TIME_ZONE'] == 'N'? $_REQUEST['AUTO_TIME_ZONE'] : '');
		}

		$arResult['CAN_EDIT_PASSWORD'] = $arUser['EXTERNAL_AUTH_ID'] == ''
			|| in_array($arUser['EXTERNAL_AUTH_ID'], $arParams['EDITABLE_EXTERNAL_AUTH_ID'], true);

		if ($_REQUEST['NEW_PASSWORD'] <> '' && $arResult['CAN_EDIT_PASSWORD'])
		{
			$arFields['PASSWORD'] = $_REQUEST['NEW_PASSWORD'];
			$arFields['CONFIRM_PASSWORD'] = $_REQUEST['NEW_PASSWORD_CONFIRM'];
		}

		if ($arUser)
		{
			if($arUser['EXTERNAL_AUTH_ID'] <> '')
			{
				$arFields['EXTERNAL_AUTH_ID'] = $arUser['EXTERNAL_AUTH_ID'];
			}
		}

		$USER_FIELD_MANAGER->EditFormAddFields('USER', $arFields);
	
		if ($obUser->Update($arResult['ID'], $arFields))
		{
			if ($arResult['PHONE_REGISTRATION'] == true && $arFields['PHONE_NUMBER'] <> '')
			{
				if (!($phone = \Bitrix\Main\UserPhoneAuthTable::getRowById($arResult['ID'])))
				{
					$phone = ['PHONE_NUMBER' => '', 'CONFIRMED' => 'N'];
				}

				$arFields['PHONE_NUMBER'] = \Bitrix\Main\UserPhoneAuthTable::normalizePhoneNumber($arFields['PHONE_NUMBER']);

				if ($arFields['PHONE_NUMBER'] <> $phone['PHONE_NUMBER'] || $phone['CONFIRMED'] <> 'Y')
				{
					//added or updated the phone number for the user, now sending a confirmation SMS
					list($code, $phoneNumber) = CUser::GeneratePhoneCode($arResult['ID']);

					$sms = new \Bitrix\Main\Sms\Event(
						'SMS_USER_CONFIRM_NUMBER',
						[
							'USER_PHONE' => $phoneNumber,
							'CODE' => $code,
						]
					);
					$smsResult = $sms->send(true);

					if (!$smsResult->isSuccess())
					{
						$strError .= implode('<br />', $smsResult->getErrorMessages());
					}

					$arResult['SHOW_SMS_FIELD'] = true;
					$arResult['SIGNED_DATA'] = \Bitrix\Main\Controller\PhoneAuth::signData(['phoneNumber' => $phoneNumber]);
				}
			}
		}
		else
		{
			$strError .= $obUser->LAST_ERROR;
		}
	}

	if (!empty($_REQUEST['SUBSCRIBE']) && $strError == '') 
	{
		CModule::IncludeModule('subscribe');

		// Если пользователь не подписан и поставил галку, то подписать
		if ($_REQUEST['SUBSCRIBE'] === 'Y' && !$aSubscr['ID']) 
		{
		  	$rsRubric = CRubric::GetList(Array('SORT' => 'ASC'), Array('ACTIVE' => 'Y')); 
		 	$arRubrics = array();
		 	while ($rubric = $rsRubric->GetNext()) { 
				$arRubrics[] = $rubric['ID']; 
		  	} 

		  	$arFields = Array(
				'USER_ID' => $arResult['arUser']['ID'],
				'FORMAT' => 'html',
				'EMAIL' => $arResult['arUser']['EMAIL'],
				'ACTIVE' => 'Y',
				'RUB_ID' => $arRubrics
		  	);
		  	$subscr = new CSubscription;

			$ID = $subscr->Add($arFields);
			if ($ID > 0) {
				CSubscription::Authorize($ID);
			}
		}

		// Если пользователь подписан, но хочет отписаться
		if ($_REQUEST['SUBSCRIBE'] !== 'Y' && $aSubscr['ID']) 
		{
			CSubscription::Delete($aSubscr['ID']);
		}
	}

	if ($strError == '')
	{
		if ($arParams['SEND_INFO'] == 'Y')
			$obUser->SendUserInfo($arResult['ID'], SITE_ID, GetMessage('main_profile_update'), true);

		$bOk = true;
	}
}

// verify phone code
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_REQUEST['code_submit_button'] <> '' && check_bitrix_sessid())
{
	if ($_REQUEST['SIGNED_DATA'] <> '')
	{
		if (($params = \Bitrix\Main\Controller\PhoneAuth::extractData($_REQUEST['SIGNED_DATA'])) !== false)
		{
			if (($userId = CUser::VerifyPhoneCode($params['phoneNumber'], $_REQUEST['SMS_CODE'])))
			{
				$bOk = true;
			}
			else
			{
				$strError .= GetMessage('main_profile_sms_error').'<br />';
				$arResult['SHOW_SMS_FIELD'] = true;
				$arResult['SMS_CODE'] = $_REQUEST['SMS_CODE'];
				$arResult['SIGNED_DATA'] = $_REQUEST['SIGNED_DATA'];
			}
		}
	}
}

$rsUser = CUser::GetByID($arResult['ID']);
if (!$arResult['arUser'] = $rsUser->GetNext(false))
{
	$arResult['ID'] = 0;
}

$arResult['arUser']['PHONE_NUMBER'] = '';
if ($arResult['PHONE_REGISTRATION'])
{
	if ($phone = \Bitrix\Main\UserPhoneAuthTable::getRowById($arResult['ID']))
	{
		$arResult['arUser']['PHONE_NUMBER'] = htmlspecialcharsbx($phone['PHONE_NUMBER']);
	}
}

if ($strError <> '')
{
	static $skip = array('PERSONAL_PHOTO'=>1, 'WORK_LOGO'=>1, 'forum_AVATAR'=>1, 'blog_AVATAR'=>1);
	foreach ($_POST as $k => $val)
	{
		if (!isset($skip[$k]))
		{
			if (!is_array($val))
			{
				$val = htmlspecialcharsex($val);
			}
			if (strpos($k, 'forum_') === 0)
			{
				$arResult['arForumUser'][substr($k, 6)] = $val;
			}
			elseif (strpos($k, 'blog_') === 0)
			{
				$arResult['arBlogUser'][substr($k, 5)] = $val;
			}
			elseif (strpos($k, 'student_') === 0)
			{
				$arResult['arStudent'][substr($k, 8)] = $val;
			}
			else
			{
				$arResult['arUser'][$k] = $val;
			}
		}
	}
}

$arResult['FORM_TARGET'] = $APPLICATION->GetCurPage();

$arResult['IS_ADMIN'] = $USER->IsAdmin();
$arResult['CAN_EDIT_PASSWORD'] = $arUser['EXTERNAL_AUTH_ID'] == ''
	|| in_array($arUser['EXTERNAL_AUTH_ID'], $arParams['EDITABLE_EXTERNAL_AUTH_ID'], true);

$arCountries = GetCountryArray();
$arResult['COUNTRY_SELECT'] = SelectBoxFromArray('PERSONAL_COUNTRY', $arCountries, $arResult['arUser']['PERSONAL_COUNTRY'], GetMessage('USER_DONT_KNOW'));
$arResult['COUNTRY_SELECT_WORK'] = SelectBoxFromArray('WORK_COUNTRY', $arCountries, $arResult['arUser']['WORK_COUNTRY'], GetMessage('USER_DONT_KNOW'));

$arResult['strProfileError'] = $strError;
$arResult['BX_SESSION_CHECK'] = bitrix_sessid_post();

$arResult['DATE_FORMAT'] = CLang::GetDateFormat('SHORT');

$arResult['COOKIE_PREFIX'] = COption::GetOptionString('main', 'cookie_name', 'BITRIX_SM');
if (strlen($arResult['COOKIE_PREFIX']) <= 0) 
	$arResult['COOKIE_PREFIX'] = 'BX';

// ********************* User properties ***************************************************
$arResult['USER_PROPERTIES'] = array('SHOW' => 'N');
if (!empty($arParams['USER_PROPERTY']))
{
	$arUserFields = $USER_FIELD_MANAGER->GetUserFields('USER', $arResult['ID'], LANGUAGE_ID);
	if (count($arParams['USER_PROPERTY']) > 0)
	{
		foreach ($arUserFields as $FIELD_NAME => $arUserField)
		{
			if (!in_array($FIELD_NAME, $arParams['USER_PROPERTY']))
				continue;
			$arUserField['EDIT_FORM_LABEL'] = strLen($arUserField['EDIT_FORM_LABEL']) > 0 ? $arUserField['EDIT_FORM_LABEL'] : $arUserField['FIELD_NAME'];
			$arUserField['EDIT_FORM_LABEL'] = htmlspecialcharsEx($arUserField['EDIT_FORM_LABEL']);
			$arUserField['~EDIT_FORM_LABEL'] = $arUserField['EDIT_FORM_LABEL'];
			$arResult['USER_PROPERTIES']['DATA'][$FIELD_NAME] = $arUserField;
		}
	}
	if (!empty($arResult['USER_PROPERTIES']['DATA']))
		$arResult['USER_PROPERTIES']['SHOW'] = 'Y';
	$arResult['bVarsFromForm'] = ($strError == ''? false : true);
}
// ******************** /User properties ***************************************************

if ($arParams['SET_TITLE'] == 'Y')
	$APPLICATION->SetTitle(GetMessage('PROFILE_DEFAULT_TITLE'));

if ($bOk) 
	$arResult['DATA_SAVED'] = 'Y';

//time zones
$arResult['TIME_ZONE_ENABLED'] = CTimeZone::Enabled();
if ($arResult['TIME_ZONE_ENABLED'])
	$arResult['TIME_ZONE_LIST'] = CTimeZone::GetZones();

//secure authorization
$arResult['SECURE_AUTH'] = false;
if (!CMain::IsHTTPS() && COption::GetOptionString('main', 'use_encrypted_auth', 'N') == 'Y')
{
	$sec = new CRsaSecurity();
	if (($arKeys = $sec->LoadKeys()))
	{
		$sec->SetKeys($arKeys);
		$sec->AddToForm('form1', array('NEW_PASSWORD', 'NEW_PASSWORD_CONFIRM'));
		$arResult['SECURE_AUTH'] = true;
	}
}

//socialservices
$arResult['SOCSERV_ENABLED'] = IsModuleInstalled('socialservices');

CModule::IncludeModule('subscribe');
$aSubscr = CSubscription::GetUserSubscription();
$arResult['SUBSCRIBE'] = ($aSubscr['ID']) ? 'Y' : false;

define('COMPANY_GROUP_ID', '19');
$groups = $USER->GetUserGroupString();
if (strpos($groups, COMPANY_GROUP_ID) !== false) {
	$arResult['IS_COMPANY'] = 'Y';
} else {
	$arResult['IS_COMPANY'] = false;
}

$this->IncludeComponentTemplate();
