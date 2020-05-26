<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;
?>

<form method="post" name="stores" action="<?=$APPLICATION->GetCurUri()?>" enctype="multipart/form-data" role="form">
    <?=$arResult['BX_SESSION_CHECK']?>
    <input type="hidden" name="lang" value="<?=LANG?>">
    <input type="hidden" name="ID" value="<?=$arResult["ID"]?>">
    
    <h4 class="font-weight-bold"><?=Loc::getMessage('SPS_COMPANY_STORES')?></h4>
    <div><?=Loc::getMessage('SPS_COMPANY_STORES_MESS');?></div>
    
    <div id="stores" class="stores">
        <div id="store-example" class="form-group bmd-form-group" style="display: none;">
            <input class="bmd-form-control" type="text" name="ADDRESS[]" placeholder="Введите адрес">
        </div>

        <?php if (!empty($arResult['STORES'])): ?>

        <?php foreach ($arResult['STORES'] as $id => $address): ?>
        <div class="form-group bmd-form-group">
            <input class="bmd-form-control" type="text" name="ADDRESS[<?=$id?>]" value="<?=htmlspecialchars($address)?>">
            <label class="bmd-form-control-del" for="main-profile-store-<?=$id?>"><?=Loc::getMessage('SPS_COMPANY_STORE_DELETE')?></label>
            <input class="bmd-form-control-checkdel" id="main-profile-store-<?=$id?>" style="display: none;" type="checkbox" name="DELETE_STORE[<?=$id?>]">
            <div class="bmd-form-control-line"></div>
        </div>
        <?php endforeach ?>

        <?php else: ?>

        <div class="form-group bmd-form-group">
            <input class="bmd-form-control" type="text" name="ADDRESS[]" placeholder="Введите адрес">
        </div>

        <?php endif ?>
    </div>

    <div class="d-block mt-7">
        <input type="submit" name="save" class="btn btn-primary" value="<?=Loc::getMessage('MAIN_SAVE')?>">
        &nbsp;
        <a href="javascript:void(0)" class="btn" onclick="settingsAddStore(this)"><?=Loc::getMessage('MAIN_ADD')?></a>
    </div>
</form>
