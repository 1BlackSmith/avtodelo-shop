<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;
?>

<form method="post" name="form1" action="<?=$APPLICATION->GetCurUri()?>" enctype="multipart/form-data" role="form">
    <div class="form-group bmd-form-group mb-5">
        <label for="employee-id" class="bmd-label-floating"><?=Loc::getMessage('SPS_EMPLOYEE_ID')?></label>
        <input type="text" class="bmd-form-control" name="ID" maxlength="50" id="employee-id">
    </div>
    <div class="form-group">
        <label for="stores" class=""><?=Loc::getMessage('SPS_STORES')?></label>
        <?=SelectBoxMFromArray("STORES[]", $arResult['STORES'], $arResult['OLD_STORES'], "", false, 4, "class =\"form-control\" id=\"stores\"")?>
    </div>
    <div class="d-block mt-6">
        <input type="submit" name="add" class="btn btn-primary" value="<?=Loc::getMessage('SPS_EMPLOYEE_ADD')?>">
    </div>
</form>