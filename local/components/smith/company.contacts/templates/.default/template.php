<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
$this->setFrameMode(true);

$layout = \Redsign\MegaMart\Layouts\Builder::createFromParams($arParams);
$layout
	->addModifier('bg-white')
	->addModifier('shadow')
	->addModifier('outer-spacing');


$layout->start();
?>
<div class="contacts-view">
	<div class="contacts-view">
		<div class="contacts-view__map">
			<?$APPLICATION->IncludeComponent(
				"bitrix:map.yandex.view", 
				".default", 
				array(
					"API_KEY" => "1151b4f9-f176-43e9-903c-bed9603594be",
					"CONTROLS" => array(
					),
					"INIT_MAP_TYPE" => "MAP",
					"MAP_DATA" => "a:4:{s:10:\"yandex_lat\";d:52.97759579367441;s:10:\"yandex_lon\";d:36.10178817267019;s:12:\"yandex_scale\";i:18;s:10:\"PLACEMARKS\";a:1:{i:0;a:3:{s:3:\"LON\";d:36.101852748969;s:3:\"LAT\";d:52.977522750241;s:4:\"TEXT\";s:50:\"Магазин Технология чистоты\";}}}",
					"MAP_HEIGHT" => "500",
					"MAP_ID" => "contacts",
					"MAP_WIDTH" => "600",
					"OPTIONS" => array(
						0 => "ENABLE_SCROLL_ZOOM",
						1 => "ENABLE_DBLCLICK_ZOOM",
						2 => "ENABLE_RIGHT_MAGNIFIER",
						3 => "ENABLE_DRAGGING",
					),
					"COMPONENT_TEMPLATE" => ".default",
					"COMPOSITE_FRAME_MODE" => "A",
					"COMPOSITE_FRAME_TYPE" => "AUTO"
				),
				false
			);?>
		</div>
		<div class="contacts-view__content">
			<?$APPLICATION->IncludeComponent(
				"bitrix:main.include",
				"",
				array(
					"AREA_FILE_SHOW" => "file",
					"TEMPLATE" => 'line',
					"PATH" => SITE_DIR."/include/templates/contacts/". $arParams["VIEW_CONTENT_FILE"] .".php",
					"EDIT_TEMPLATE" => ""
				),
				false
			);?>
		</div>
	</div>
</div>
<?

$layout->end();
