<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
	die();

use Bitrix\Main\Localization\Loc;

?>
 
<div class="bx_profile">
	<?
	ShowError($arResult["strProfileError"]);

	if ($arResult['DATA_SAVED'] == 'Y')
	{
		ShowNote(Loc::getMessage('PROFILE_DATA_SAVED'));
	}
	?>

	<form method="post" name="form1" action="<?=$APPLICATION->GetCurUri()?>" enctype="multipart/form-data" role="form">
		<?=$arResult["BX_SESSION_CHECK"]?>
		<input type="hidden" name="lang" value="<?=LANG?>">
		<input type="hidden" name="ID" value="<?=$arResult["ID"]?>">
		<input type="hidden" name="LOGIN" value="<?=$arResult["arUser"]["LOGIN"]?>">

		<div class="d-block mb-7">
			<h6 class="font-weight-bold"><?=Loc::getMessage('RS_SPS_USER_DATA'); ?></h6>
            
            <div class="form-group bmd-form-group">
                <label for="main-profile-id" class="bmd-label-floating"><?=Loc::getMessage('ID');?></label>
                <input type="text" class="bmd-form-control" id="main-profile-id" value="<?=$arResult["ID"]?>" disabled>
            </div>

			<div class="form-group bmd-form-group">
				<label for="main-profile-last-name" class="bmd-label-floating"><?=Loc::getMessage('LAST_NAME');?></label>
				<input type="text" class="bmd-form-control" name="LAST_NAME" maxlength="50" id="main-profile-last-name" value="<?=$arResult["arUser"]["LAST_NAME"]?>">
			</div>
			
			<div class="form-group bmd-form-group">
				<label for="main-profile-name" class="bmd-label-floating"><?=Loc::getMessage('NAME');?></label>
				<input type="text" class="bmd-form-control" name="NAME" maxlength="50" id="main-profile-name" value="<?=$arResult["arUser"]["NAME"]?>">
			</div>

			<div class="form-group bmd-form-group">
				<label for="main-profile-second-name" class="bmd-label-floating"><?=Loc::getMessage('SECOND_NAME');?></label>
				<input type="text" class="bmd-form-control" name="SECOND_NAME" maxlength="50" id="main-profile-second-name" value="<?=$arResult["arUser"]["SECOND_NAME"]?>">
			</div>

			<div class="form-group bmd-form-group">
				<label for="main-profile-email" class="bmd-label-floating"><?=Loc::getMessage('EMAIL');?></label>
				<input type="email" class="bmd-form-control" name="EMAIL" maxlength="50" id="main-profile-email" value="<?=$arResult["arUser"]["EMAIL"]?>">
			</div>

			<div class="form-group bmd-form-group">
				<label for="main-profile-phone" class="bmd-label-floating"><?=Loc::getMessage('PHONE_NUMBER');?></label>
				<input type="tel" class="bmd-form-control" name="PERSONAL_PHONE" maxlength="12" id="main-profile-phone" value="<?=$arResult["arUser"]["PERSONAL_PHONE"]?>">
			</div>

		</div>

		<?php	if($arResult["arUser"]["EXTERNAL_AUTH_ID"] == ''): ?>
		<div class="d-block mb-7">
			<h6><?=Loc::getMessage('RS_SPS_CHANGE_PASSWORD');?></h6>

			<div class="form-group bmd-form-group">
				<label for="main-profile-password" class="bmd-label-floating"><?=Loc::getMessage('NEW_PASSWORD_REQ');?></label>
				<input type="password" class="bmd-form-control" name="NEW_PASSWORD" maxlength="50" id="main-profile-password" autocomplete="off">
				<span class="bmd-help"><?=$arResult["GROUP_POLICY"]["PASSWORD_REQUIREMENTS"];?></small>
			</div>

			<div class="form-group bmd-form-group">
				<label for="main-profile-password-confirm" class="bmd-label-floating"><?=Loc::getMessage('NEW_PASSWORD_CONFIRM');?></label>
				<input type="password" class="bmd-form-control" name="NEW_PASSWORD_CONFIRM" maxlength="50" id="main-profile-password-confirm" autocomplete="off">
			</div>
		</div>
		<?php endif; ?>
                
        <div class="d-block checkbox bmd-custom-checkbox">
            <label id="js-user-subscribe" class="mb-0">
                <input type="checkbox" value="<?=($arResult["SUBSCRIBE"] === "Y") ? "Y" : "N"?>" name="SUBSCRIBE" id="CONTENT_USER_SUBSCRIBE"> Подписаться на рассылку писем
            </label>
        </div>
        <script>
            window.addEventListener('load', function () {
                let label = document.getElementById("js-user-subscribe");
                let input = label.getElementsByTagName("input")[0];
                
                if (input.getAttribute("value") === "Y") {
                    input.checked = true;
                } else {
                    input.checked = false;
                }
                  
                label.addEventListener('click', function (e) {
                    input.setAttribute("value", (input.checked) ? "Y" : "N");
                });
            });
        </script>

		<div class="d-block mt-5">
			<input type="submit" name="save" class="btn btn-primary btn-rounded" value="<?=(($arResult["ID"]>0) ? Loc::getMessage("MAIN_SAVE") : Loc::getMessage("MAIN_ADD"))?>">
			&nbsp;
			<input type="submit" class="btn btn-link"  name="reset" value="<?echo GetMessage('MAIN_RESET')?>">
		</div>

		<?php if ($arResult["SOCSERV_ENABLED"]): ?>
		<div class="d-block mt-7">
			<?
			{
				$APPLICATION->IncludeComponent("bitrix:socserv.auth.split", ".default", array(
					"SHOW_PROFILES" => "Y",
					"ALLOW_DELETE" => "Y"
				),
					false
				);
			}
			?>
		</div>
		<?php endif; ?>

	</form>
</div>
