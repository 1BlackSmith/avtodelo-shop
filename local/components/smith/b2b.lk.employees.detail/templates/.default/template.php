<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;

$employeeName = !empty($arResult['EMPLOYEE']['NAME']) ? $arResult['EMPLOYEE']['NAME'] : Loc::getMessage('SPS_CHAIN_EMPLOYEE_DETAIL');

if ($arParams['SET_TITLE'] == 'Y')
{
    $APPLICATION->SetTitle($employeeName);
}
$APPLICATION->AddChainItem($employeeName);
?>

<?php if (!$arResult['HIDE_CONTENT']): ?>
    <form method="post" name="form1" action="<?=$APPLICATION->GetCurUri()?>" enctype="multipart/form-data" role="form">
        <div class="mb-4"><b>ID:</b> <?=$arResult['EMPLOYEE']['ID']?></div>
        <div class="mb-4"><b>ФИО:</b> <?=$employeeName?></div>
        <div class="mb-4"><b>Телефон:</b> <?=$arResult['EMPLOYEE']['PHONE']?></div>
        <div class="form-group">
            <label for="stores"><b><?=Loc::getMessage('SPS_EMPLOYEE_STORES')?></b></label>
            <?=SelectBoxMFromArray("STORES[]", $arResult['STORES'], $arResult['EMPLOYEE']['STORES'], "", false, 4, "class =\"form-control\" id=\"stores\"")?>
        </div>
        <div class="d-block mt-6">
            <input type="submit" name="save" class="btn btn-primary" value="<?=Loc::getMessage('MAIN_SAVE')?>">&nbsp;
            <input type="submit" name="delete" class="btn" value="<?=Loc::getMessage('MAIN_DELETE')?>">
        </div>
    </form>
<?php endif ?>