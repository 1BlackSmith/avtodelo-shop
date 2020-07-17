<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
  die();
}

//if (CModule::IncludeModule('subscribe')) {
//  $subscr = CSubscription::GetList(array("ID" => "ASC"), array("ACTIVE" => "Y", "EMAIL" => $arResult["arUser"]["EMAIL"]));
//  while ($subscr_arr = $subscr->Fetch()) {
//    $aEmail[] = $subscr_arr;
//  }
//  
//  print_r($aEmail);
//}
//
//$arResult['USER_SUBSCRIBE'] = 1;


CModule::IncludeModule('subscribe');
$aSubscr = CSubscription::GetUserSubscription();
$arResult["USER_SUBSCRIBE"] = ($aSubscr["ID"]) ? "Y" : false;

// Если пользователь не подписан и поставил галку, то подписать
if ($_REQUEST["USER_SUBSCRIBE"] === "Y" && !$aSubscr["ID"]) {
  $rsRubric = CRubric::GetList(Array("SORT" => "ASC"), Array("ACTIVE" => "Y")); 
  $arRubrics = array(); 
  while ($rubric = $rsRubric->GetNext()) { 
    $arRubrics[] = $rubric["ID"]; 
  } 

  $arFields = Array(
    "USER_ID" => $arResult["arUser"]["ID"],
    "FORMAT" => "html",
    "EMAIL" => $arResult["arUser"]["EMAIL"],
    "ACTIVE" => "Y",
    "RUB_ID" => $arRubrics
  );
  $subscr = new CSubscription;

  $ID = $subscr->Add($arFields);
  if($ID > 0) {
    CSubscription::Authorize($ID);
  }
}


// Если пользователь подписан, но хочет отписаться
if ($_REQUEST["USER_SUBSCRIBE"] !== "Y" && $aSubscr["ID"]) {
  CSubscription::Delete($aSubscr["ID"]);
}
