<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) {
	die();
}

$APPLICATION->IncludeComponent(
	"bitrix:sale.basket.basket.line", 
	"top", 
	array(
        "PATH_TO_CART" => "/personal/cart/",
		"COMPONENT_TEMPLATE" => "top"
	),
	false
);?>