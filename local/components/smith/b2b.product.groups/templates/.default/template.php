<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
use Bitrix\Main,
	Bitrix\Iblock;

if ($_REQUEST['public_mode'] == "Y")
{
	require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_popup_admin.php");
}

if (!$arResult['IS_ADMIN_SECTION'])
	return;
$listImageSize = (int)Main\Config\Option::get('iblock', 'list_image_size');
$viewFileParams = array(
	'IMAGE' => 'Y',
	'PATH' => 'Y',
	'FILE_SIZE' => 'Y',
	'DIMENSIONS' => 'Y',
	'IMAGE_POPUP' => 'Y',
	'MAX_SIZE' => array(
		'W' => $listImageSize,
		'H' => $listImageSize
	),
	'MIN_SIZE' => array('W' => 1, 'H' => 1),
);
unset($listImageSize);

function getTreeOffsetWidth($level = 0)
{
	// Some magic numbers
	return 30 + $level * 21;
}

/**
 * @param $name
 * @param $property_fields
 * @param $values
 * @return bool|string
 */
function _ShowGroupPropertyFieldList($name, $property_fields, $values)
{
	if (!is_array($values)) $values = array();

	$options = "";
	$result = "";
	$bWas = false;
	$sections = ProductSearchComponent::getPropertyFieldSections($property_fields["LINK_IBLOCK_ID"]);
	if (!empty($sections) && is_array($sections))
	{
		foreach ($sections as &$section)
		{
			$options .= '<option value="' . $section["ID"] . '"';
			if (in_array($section["ID"], $values))
			{
				$bWas = true;
				$options .= ' selected';
			}
			$options .= '>' . str_repeat(" . ", $section["DEPTH_LEVEL"]) . $section["NAME"] . '</option>';
		}
		unset($section);
	}
	$result .= '<select name="' . $name . '[]" size="' . ($property_fields["MULTIPLE"] == "Y" ? "5" : "1") . '" ' . ($property_fields["MULTIPLE"] == "Y" ? "multiple" : "") . '>';
	$result .= '<option value=""' . (!$bWas ? ' selected' : '') . '>' . GetMessage("SPS_A_PROP_NOT_SET") . '</option>';
	$result .= $options;
	$result .= '</select>';
	return $result;
}

function getImageField($property_value_id,$property_value)
{
	global $viewFileParams;
	$res = CFileInput::Show('NO_FIELDS[' . $property_value_id . ']', $property_value, $viewFileParams, array(
			'upload' => false,
			'medialib' => false,
			'file_dialog' => false,
			'cloud' => false,
			'del' => false,
			'description' => false,
		)
	);
	$res = preg_replace('!<script[^>]*>.*</script>!isU','', $res);
	return $res;
}


$arProps = $arResult['PROPS'];
$arSKUProps = $arResult['SKU_PROPS'];
$arFilter = $arResult['FILTER'];

$tableId = CUtil::JSEscape($arResult['TABLE_ID']);

\Bitrix\Main\IO\File::putFileContents($_SERVER['DOCUMENT_ROOT'] . '/log1.txt', print_r($tableId, true));

// START TEMPLATE
$APPLICATION->SetAdditionalCSS('/bitrix/panel/main/admin.css');
$lAdmin = new CAdminList($arResult['TABLE_ID'], new CAdminSorting($arResult['TABLE_ID'], "ID", "ASC"));
$lAdmin->InitFilter($arResult['FILTER_FIELDS']);

// fix
$_REQUEST['admin_history'] = 1;
$lAdmin->NavText($arResult['DB_RESULT_LIST']->GetNavPrint(GetMessage("SPS_NAV_LABEL")));

foreach (array_keys($arResult['HEADERS']) as $index)
{
	$arResult['HEADERS'][$index]['content'] = htmlspecialcharsbx($arResult['HEADERS'][$index]['content']);
	if (isset($arResult['HEADERS'][$index]['title']))
		$arResult['HEADERS'][$index]['title'] = htmlspecialcharsbx($arResult['HEADERS'][$index]['title']);
}
unset($index);

$lAdmin->AddHeaders($arResult['HEADERS']);

$arSelectedFields = $lAdmin->GetVisibleHeaderColumns();
$arSelectedProps = array();

$allProps = array_merge($arProps, $arSKUProps);
foreach ($allProps as $prop)
{
	if ($key = array_search("PROPERTY_" . $prop['ID'], $arSelectedFields))
	{
		$arSelectedProps[] = $prop;
		unset($arSelectedFields[$key]);
	}
}
$allProps = null;
$arSelectedFields = null;
$arSku = array();

$showSkuName = (string)Main\Config\Option::get('catalog', 'product_form_show_offer_name') == 'Y';

foreach ($arResult['PRODUCTS'] as $arItems)
{
	$arCatalogProduct = $arItems['PRODUCT'];

	$row = &$lAdmin->AddRow($arItems["ID"], $arItems);

	$row->AddField("ACTIVE", $arItems["ACTIVE"] == 'Y' ? GetMessage('SPS_PRODUCT_ACTIVE') : GetMessage('SPS_PRODUCT_NO_ACTIVE'));
	$row->AddViewFileField('PREVIEW_PICTURE', $viewFileParams);
	$row->AddViewFileField('DETAIL_PICTURE', $viewFileParams);

	$arActions = array();
	$icon = $arCatalogProduct['TYPE'] == CCatalogProduct::TYPE_SET ? 'f2' : 'f1';

	if (!empty($arItems['SKU_ITEMS']) && !empty($arItems['SKU_ITEMS']["SKU_ELEMENTS"]))
	{
		$icon = 'f3';
		$arSkuResult = $arItems['SKU_ITEMS'];

		$arParams = array(
			'id' => $arItems['ID'],
			'type' => $arCatalogProduct['TYPE'],
			'name' => htmlspecialcharsbx($arItems['NAME'])
		);
		$jsClick = $tableId.'_helper.SelEl('.CUtil::PhpToJSObject($arParams, false, true, true).', this);';
		if ($arResult['CALLER'] == 'discount' || $arResult['ALLOW_SELECT_PARENT'] == 'Y')
		{
			$row->AddField("ACTION", '<a href="javascript:void(0)" onclick="'.$jsClick.'; BX.PreventDefault(); return false;">'.GetMessage('SPS_SELECT').'</a>');
		}
		$row->AddViewField("EXPAND", '<a class="expand-sku">' . GetMessage('SPS_EXPAND') . '</a><a class="collapse-sku">' . GetMessage('SPS_COLLAPSE') . '</a>');

		$arActions[] = array(
			"ICON" => "view",
			"TEXT" => GetMessage("SPS_SKU_SHOW"),
			"DEFAULT" => "Y",
			"ACTION" => $tableId . '_helper.fShowSku(' . CUtil::PhpToJSObject($arSkuResult["SKU_ELEMENTS_ID"]) . ', this);'
		);
		if ($arResult['CALLER'] == 'discount' || $arResult['ALLOW_SELECT_PARENT'] == 'Y')
		{
			$arActions[] = array(
				"TEXT" => GetMessage("SPS_SELECT"),
				"DEFAULT" => "N",
				"ACTION" => $jsClick
			);
		}
		unset($jsClick, $arParams);

		foreach ($arSkuResult["SKU_ELEMENTS"] as $val)
		{
			$arSku[] = $val["ID"];
			$rowSku = &$lAdmin->AddRow($val["ID"], $val);
			$skuProperty = '';
			if ($showSkuName)
				$skuProperty .= '<i>'.htmlspecialcharsbx($val['NAME']).'</i>';

			$arSkuActions = array();
			$rowSku->AddField("NAME", '<div class="sku-item-name">' . $skuProperty . '</div>' . '<input type="hidden" name="prd" id="' . $tableId . '_sku-' . $val["ID"] . '">');

			$rowSku->AddViewFileField('DETAIL_PICTURE', $viewFileParams);
			$rowSku->AddViewFileField('PREVIEW_PICTURE', $viewFileParams);

			$rowSku->AddField("ID", $arItems["ID"] . "-" . $val["ID"]);
			if (!empty($arResult['PRICES']))
			{
				foreach ($arResult['PRICES'] as $price)
					$rowSku->AddViewField("PRICE".$price['ID'], CCurrencyLang::CurrencyFormat($arResult['SKU_PRICES'][$price['ID']][$val["ID"]]['PRICE'], $arResult['SKU_PRICES'][$price['ID']][$val["ID"]]['CURRENCY'], true));
				unset($price);
			}

			$balance = (float)$val["BALANCE"];

			$ratio = (isset($val['MEASURE_RATIO']) ? $val['MEASURE_RATIO'] : 1);
			$measure = (isset($val['MEASURE']['SYMBOL_RUS']) ? '&nbsp;'.$val['MEASURE']['SYMBOL_RUS'] : '');
			$arParams = array(
				'id' => $val["ID"],
				'type' => $val["TYPE"],
				'name' => htmlspecialcharsbx($val['NAME']),
				'full_quantity' => $val['QUANTITY'],
				'measureRatio' => (isset($val['MEASURE_RATIO']) ? $val['MEASURE_RATIO'] : 1),
				'measure' => (isset($val['MEASURE']['~SYMBOL_RUS']) ? htmlspecialcharsbx($val['MEASURE']['~SYMBOL_RUS']) : ''),
				'quantity' => $val['DEFAULT_QUANTITY']
			);
			$rowSku->AddField("QUANTITY", '<span style="white-space: nowrap;"><input style="text-align: center;" type="text" id="'.$tableId.'_qty_'.$val["ID"].'" value="'.$val['DEFAULT_QUANTITY'].'" size="4" />'.$measure.'</span>');
			unset($measure, $ratio);

			$arSkuActions[] = array(
				"TEXT" => GetMessage("SPS_SELECT"),
				"DEFAULT" => "Y",
				"ACTION" => $tableId . '_helper.SelEl(' . CUtil::PhpToJSObject($arParams) . ', this);'
			);

			$active = ($val["ACTIVE"] == 'Y' ? GetMessage('SPS_PRODUCT_ACTIVE') : GetMessage('SPS_PRODUCT_NO_ACTIVE'));

			$rowSku->AddActions($arSkuActions);
			$rowSku->AddField("BALANCE", $balance);
			$rowSku->AddField("ACTIVE", $active);
			$rowSku->AddField("ACTION", '<a class="select-sku">' . GetMessage('SPS_SELECT') . '</a>');

			if (!empty($val['PROPERTIES']))
			{
				foreach ($arSelectedProps as $property)
				{
					if (empty($val['PROPERTIES'][$property['ID']]))
						continue;
					$separator = ($property['PROPERTY_TYPE'] == Iblock\PropertyTable::TYPE_FILE ? '' : '/ ');
					$rowSku->AddViewField('PROPERTY_'.$property['ID'], implode($separator, $val['PROPERTIES'][$property['ID']]));
					unset($separator);
				}
				unset($property);
			}
		}
	}
	else
	{
		if ($arItems['TYPE'] == 'S')
			$icon = 'folder';
		elseif (!empty($arCatalogProduct['IS_GROUP']))
			$icon = 'f4';

		$balance = isset($arCatalogProduct["STORE_AMOUNT"]) ? (float)$arCatalogProduct["QUANTITY"] . " / " . (float)$arCatalogProduct["STORE_AMOUNT"] : (float)$arCatalogProduct["QUANTITY"];
		$row->AddField("BALANCE", $arItems['TYPE'] != 'S' ? $balance : '');

		if ($arItems['TYPE'] != 'S')
		{
			$ratio = (isset($arCatalogProduct['MEASURE_RATIO']) ? $arCatalogProduct['MEASURE_RATIO'] : 1);
			$measure = (isset($arCatalogProduct['MEASURE']['SYMBOL_RUS']) ? '&nbsp;'.$arCatalogProduct['MEASURE']['SYMBOL_RUS'] : '');
			$arParams = array(
				'id' => $arItems["ID"],
				'type' => $arCatalogProduct["TYPE"],
				'name' => htmlspecialcharsbx($arItems['NAME']),
				'full_quantity' => $arCatalogProduct['QUANTITY'],
				'measureRatio' => (isset($arCatalogProduct['MEASURE_RATIO']) ? $arCatalogProduct['MEASURE_RATIO'] : 1),
				'measure' => (isset($arCatalogProduct['MEASURE']['~SYMBOL_RUS']) ? htmlspecialcharsbx($arCatalogProduct['MEASURE']['~SYMBOL_RUS']) : ''),
				'quantity' => $arCatalogProduct['DEFAULT_QUANTITY']
			);
			$row->AddField("QUANTITY", '<span style="white-space: nowrap;"><input style="text-align: center;" type="text" id="'.$tableId.'_qty_'.$arItems["ID"].'" value="'.$arCatalogProduct['DEFAULT_QUANTITY'].'" size="4" />'.$measure.'</span>');
			unset($measure, $ratio);

			$arActions[] = array(
				"TEXT" => GetMessage("SPS_SELECT"),
				"DEFAULT" => "Y",
				"ACTION" => $tableId . '_helper.SelEl(' . CUtil::PhpToJSObject($arParams) . ', this);'
			);

			$row->AddField("ACTION", '<a class="select-sku">' . GetMessage('SPS_SELECT') . '</a>');
		}
		else
		{
			$arActions[] = array(
				"TEXT" => GetMessage("SPS_SELECT"),
				"DEFAULT" => "Y",
				"ACTION" => $tableId.'_helper.onSectionClick('.$arItems["ID"].');'
			);
		}
		if (!empty($arResult['PRICES']))
		{
			foreach ($arResult['PRICES'] as $price)
				$row->AddViewField("PRICE".$price['ID'], CCurrencyLang::CurrencyFormat($arItems['PRICES'][$price['ID']]['PRICE'], $arItems['PRICES'][$price['ID']]['CURRENCY'], true));
			unset($price);
		}
	}

	if (!empty($arItems['PROPERTIES']))
	{
		foreach ($arSelectedProps as $property)
		{
			if (empty($arItems['PROPERTIES'][$property['ID']]))
				continue;
			$separator = ($property['PROPERTY_TYPE'] == Iblock\PropertyTable::TYPE_FILE ? '' : '/ ');
			$row->AddViewField('PROPERTY_'.$property['ID'], implode($separator, $arItems['PROPERTIES'][$property['ID']]));
			unset($separator);
		}
		unset($property);
	}

	$row->AddViewField('NAME', '<a class="adm-list-table-link"><span class="bx-s-iconset ' . $icon . '"></span>' . htmlspecialcharsEx($arItems['NAME']) . '</a>');
	$row->AddActions($arActions);
}

$lAdmin->BeginEpilogContent();
?>
<script type="text/javascript">
BX.ready(function(){
<?
if (!empty($arSku))
{
?>
	var skuIds = <?=\CUtil::PhpToJSObject($arSku); ?>,
		i,
		skuRow;

	for (i = 0; i < skuIds.length; i++)
	{
		skuRow = BX('<?=$tableId?>_sku-' + skuIds[i]).parentNode.parentNode;
		if (BX.type.isElementNode(skuRow))
		{
			BX.addClass(skuRow, 'is-sku-row');
			BX.hide(skuRow);
		}
		skuRow = null;
	}
	skuIds = [];
<?
}
?>
	// double click patch
	var rows = BX.findChildren(BX('<?=$tableId?>'), {className: 'adm-list-table-row'}, true);
	if (rows) {
		for (i = 0; i < rows.length; ++i) {

			var isExpandable = BX.findChildren(rows[i], {className: 'expand-sku'}, true);
			if (isExpandable.length !== 0)
			{
				rows[i].onclick = function () {
					this.ondblclick();
				};
			}

			var hasActionButton = BX.findChildren(rows[i], {className: 'select-sku'}, true);
			if (hasActionButton.length > 0)
			{
				hasActionButton[0].onclick = rows[i].ondblclick;
			}
		}
	}
	if (typeof <?=$tableId?>_helper !== 'undefined')
	{
		<?=$tableId?>_helper.setBreadcrumbs(<?=CUtil::PhpToJSObject($arResult['BREADCRUMBS'])?>);
		<?if (!empty($_REQUEST['set_filter']) && $_REQUEST['set_filter'] == 'Y'):?>
		<?=$tableId?>_helper.setIgnoreFilter(false);
		<?elseif (!empty($_REQUEST['del_filter']) && $_REQUEST['del_filter'] == 'Y'):?>
		<?=$tableId?>_helper.setIgnoreFilter(true);
		<?endif?>
	}
	BX('form_<?=$tableId?>').style.overflow = 'auto';
});
</script>
<?
$lAdmin->EndEpilogContent();
$lAdmin->AddAdminContextMenu(array(), false);
$lAdmin->CheckListMode();

?>
<!-- START HTML -->
<? if (!$arResult['RELOAD']): ?>
<div id="<?= $tableId ?>_reload_container" class="catalog-product-search-dialog">
	<? if ($arResult['IS_EXTERNALCONTEXT']):
		$GLOBALS['APPLICATION']->SetAdditionalCSS('/bitrix/panel/main/admin.css');
	endif;
endif ?>
<div class="adm-s-search-content-container-right" style="width: 100%;">
	<div class="adm-s-content">
		<?
		$lAdmin->DisplayList();
		?>
	</div>
</div>
<? if (!$arResult['RELOAD']): ?>
</div>
<script type="text/javascript">
	<?=$tableId?>_helper = new BX.Catalog.ProductSearchDialog({
		tableId: '<?=$tableId?>',<?
		if ($arResult['JS_CALLBACK'] != '' || $arResult['JS_EVENT'] != '')
		{
			if ($arResult['JS_CALLBACK'] != '')
			{
				?>
		callback: '<?= $arResult['JS_CALLBACK'] ?>',<?
			}
			if ($arResult['JS_EVENT'] != '')
			{
				?>
		event: '<?= $arResult['JS_EVENT'] ?>',<?
			}
		}
		?>
		callerName: '<?=CUtil::JSEscape($arResult['CALLER'])?>',
		currentUri: '<?=CUtil::JSEscape($APPLICATION->GetCurPage())?>',
		popup: BX.WindowManager.Get(),
		iblockName: '<?=CUtil::JSEscape($arResult['IBLOCKS'][$arResult['IBLOCK_ID']]['NAME'])?>'
	});
	<?=$tableId?>_helper.setBreadcrumbs(<?=CUtil::PhpToJSObject($arResult['BREADCRUMBS'])?>);
	BX('<?=$tableId?>_query').focus();
</script>
<? endif ?>
<script type="text/javascript">
	<?
	if (sizeof($arResult['IBLOCKS']) > 1):
		$iblockMenu = array(array(
			'HTML' => '<b>'.GetMessage('SPS_CHOOSE_CATALOG').':</b>',
			'CLOSE_ON_CLICK' => false
		), array('SEPARATOR' => true));
		foreach ($arResult['IBLOCKS'] as $arIblock)
		{
			$iblockMenu[] = array(
				'HTML' => '<span class="psd-catalog-menu-name" title="'.htmlspecialcharsbx($arIblock['NAME']).'">'.htmlspecialcharsEx($arIblock['NAME']).'</span><span class="psd-catalog-menu-lid" title="'.htmlspecialcharsbx($arIblock['SITE_NAME']).'">'.htmlspecialcharsbx($arIblock['SITE_NAME']).'</span>',
				'ONCLICK' => $tableId.'_helper.onIblockChange('.(int)$arIblock['ID'].',\''.CUtil::JSEscape($arIblock['NAME']).'\')',
			);
		}
		?>
		new BX.COpener({
			DIV: '<?=$tableId?>_iblock_menu_opener',
			MENU: <?=CUtil::PhpToJSObject($iblockMenu)?>
		});
	<?endif?>
	// override SaveSetting to fix URL
	<?=$tableId?>.SaveSettings = function (el) {
		var sCols = '', sBy = '', sOrder = '', sPageSize;

		var oSelect = document.list_settings.selected_columns;
		var n = oSelect.length;
		for (var i = 0; i < n; i++)
			sCols += (sCols != '' ? ',' : '') + oSelect[i].value;

		oSelect = document.list_settings.order_field;
		if (oSelect)
			sBy = oSelect[oSelect.selectedIndex].value;

		oSelect = document.list_settings.order_direction;
		if (oSelect)
			sOrder = oSelect[oSelect.selectedIndex].value;

		oSelect = document.list_settings.nav_page_size;
		sPageSize = oSelect[oSelect.selectedIndex].value;

		var bCommon = (document.list_settings.set_default && document.list_settings.set_default.checked);

		BX.userOptions.save('list', this.table_id, 'columns', sCols, bCommon);
		BX.userOptions.save('list', this.table_id, 'by', sBy, bCommon);
		BX.userOptions.save('list', this.table_id, 'order', sOrder, bCommon);
		BX.userOptions.save('list', this.table_id, 'page_size', sPageSize, bCommon);
		//>>>patch start
		var url = <?=$tableId?>_helper.buildUrl();
		//<<<patch end

		BX.WindowManager.Get().showWait(el);
		BX.userOptions.send(BX.delegate(function () {
			this.GetAdminList(
				url,
				function () {
					BX.WindowManager.Get().closeWait(el);
					BX.WindowManager.Get().Close();
				}
			);
		}, this));
	};

	<?=$tableId?>.ShowSettings = function(url)
	{
		(new BX.CDialog({
			content_url: url,
			resizable: false,
			resize_id: '<?=$tableId?>_settings',
			height: 475,
			width: 560
		})).Show();
	};

	<?=$tableId?>.DeleteSettings = function(bCommon)
	{
		BX.showWait();
		//>>>patch start
		var url = <?=$tableId?>_helper.buildUrl();
		//<<<patch end
		BX.userOptions.del('list', this.table_id, bCommon, BX.delegate(function(){
			BX.closeWait();
			this.GetAdminList(
				url,
				function(){BX.WindowManager.Get().Close();}
			);
		}, this));
	};

</script>
<?