<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

if ($arResult["USER_PERSONAL_PHONE"] !== false) {
  global $DB;
  $DB->PrepareFields("b_user");
  $DB->Update("b_user", array("PERSONAL_PHONE" => "'".htmlspecialcharsbx($arResult["USER_PERSONAL_PHONE"])."'"), "WHERE LOGIN='". htmlspecialcharsbx($arResult['USER_LOGIN'])."'");
}


// Оформление подписки
if ($_REQUEST["USER_SUBSCRIBE"] === "Y") {
  $rsUser = CUser::GetByLogin($_REQUEST["USER_LOGIN"]);
  // Добавить в подписчики только если пользователь есть в базе
  if ($arUser = $rsUser->Fetch()) {
    CModule::IncludeModule('subscribe');
    
    $rsRubric = CRubric::GetList(Array("SORT" => "ASC"), Array("ACTIVE" => "Y")); 
    $arRubrics = array(); 
    while ($rubric = $rsRubric->GetNext()) 
    { 
      $arRubrics[] = $rubric["ID"]; 
    } 

    $arFields = Array(
      "USER_ID" => $arUser["ID"],
      "FORMAT" => "html",
      "EMAIL" => $_REQUEST["USER_EMAIL"],
      "ACTIVE" => "Y",
      "RUB_ID" => $arRubrics
    );
    $subscr = new CSubscription;

    $ID = $subscr->Add($arFields);
    if($ID > 0) {
      CSubscription::Authorize($ID);
    }
  }
}