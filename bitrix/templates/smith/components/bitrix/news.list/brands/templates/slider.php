<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

/**
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $arResult
 * @var CBitrixComponentTemplate $this
 * @var string $templateName
 * @var string $componentPath
 * @var string $templateFolder
 */

$this->addExternalCss($templateFolder.'/theme/'.ToLower($arParams['RS_TEMPLATE']).'.css');

$layout = \Redsign\MegaMart\Layouts\Builder::createFromParams($arParams);
$layout
	->addModifier('shadow')
	->addModifier('bg-white')
	->addModifier('outer-spacing');

// if ($arParams['USE_OWL'] == 'Y')
// {
	$layout->useSlider($sBlockId);
// }

$layout->start();
?>
<div data-slider="<?=$sBlockId?>" data-slider-options="<?=htmlspecialcharsbx(\Bitrix\Main\Web\Json::encode($arResult['RS_SLIDER_OPTIONS']))?>" class="<?=$arResult['RS_SLIDER_CLASSES']?>">
	<?php
	foreach ($arResult['ITEMS'] as $item)
	{

		$db_props = CIBlockElement::GetProperty($item['IBLOCK_ID'], $item['ID'], "sort", "asc", array());
		$item['PROPS'] = array();
		while($ar_props = $db_props->GetNext())
			$item['PROPS'][$ar_props['CODE']] = $ar_props['VALUE'];

		?>
		<div class="col" id="<?=$this->GetEditAreaId($item['ID']);?>">
			<?php
			$this->AddEditAction($item['ID'], $item['EDIT_LINK'], $elementEdit);
			$this->AddDeleteAction($item['ID'], $item['DELETE_LINK'], $elementDelete, $elementDeleteParams);
			?>

			<a class="brand-item-light" href="<?=$item['DETAIL_PAGE_URL']?>">
				<?php
				if (is_array($item['PREVIEW_PICTURE']))
				{
					?>
				<img src="<?=$item['PREVIEW_PICTURE']['SRC']?>" alt="<?=$item['NAME']?>">
					<?php
				}
				?>
			</a>
		</div>
		<?php
	}
	unset($item);
	?>
</div>
<?php

$layout->end();
