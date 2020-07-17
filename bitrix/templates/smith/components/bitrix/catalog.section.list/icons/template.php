<?php
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
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
$this->setFrameMode(true);

$arViewModeList = $arResult['VIEW_MODE_LIST'];

$arViewStyles = array(
	'LIST' => array(
            'CONT' => 'bx_sitemap',
            'TITLE' => 'bx_sitemap_title',
            'LIST' => 'menu_vml',
	),
);
$arCurView = $arViewStyles[$arParams['VIEW_MODE']];

$strSectionEdit = CIBlock::GetArrayByID($arParams["IBLOCK_ID"], "SECTION_EDIT");
$strSectionDelete = CIBlock::GetArrayByID($arParams["IBLOCK_ID"], "SECTION_DELETE");
$arSectionDeleteParams = array("CONFIRM" => GetMessage('CT_BCSL_ELEMENT_DELETE_CONFIRM'));

if ($arResult["SECTIONS_COUNT"] > 0)
{
	$layout = new \Redsign\MegaMart\Layouts\Section();
	$layout
            ->addModifier('white')
            ->addModifier('shadow')
            ->addModifier('outer-spacing');

	$layout->start();
?>
<ul class="b-block-nav">
<?php
foreach ($arResult['SECTIONS'] as $index => &$arSection)
{
    $this->AddEditAction($arSection['ID'], $arSection['EDIT_LINK'], $strSectionEdit);
    $this->AddDeleteAction($arSection['ID'], $arSection['DELETE_LINK'], $strSectionDelete, $arSectionDeleteParams);
    ?>
    <li class="b-block-nav__item js-smenu-item" id="<?=$this->GetEditAreaId($arSection['ID']);?>">
        <a class="b-block-nav__img" href="<?=$arSection["SECTION_PAGE_URL"]?>" style="background-image: url('<?=(isset($arSection["PICTURE"])) ? $arSection["PICTURE"]["SRC"] : IMG_PLACEHOLDER?>')"></a>
        <a class="b-block-nav__link" href="<?=$arSection["SECTION_PAGE_URL"]?>"><?=$arSection["NAME"]?></a>
    </li>
<?php
}
?>
</ul>
<?php
	$layout->end();
}