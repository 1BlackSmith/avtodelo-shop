<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;

Loc::loadMessages(__FILE__);

if (!check_bitrix_sessid())
    return;
?>

<?= CAdminMessage::ShowMessage(Loc::getMessage("UNINSTALL_CONFIRM_MESSAGE")) ?>
<form action="<?= $APPLICATION->GetCurPage() ?>">
<?= bitrix_sessid_post() ?>
    <input type="hidden" name="lang" value="<?= LANGUAGE_ID ?>">
    <input type="hidden" name="id" value="smith.bonusengine">
    <input type="hidden" name="uninstall" value="Y">
    <p><input type="checkbox" id="savedata" name="savedata" value="Y" checked><label for="savedata"><?= Loc::getMessage("DEL_DATA") ?></label></p>
    <input type="hidden" name="step" value="2">
    <input type="submit" name="" value="<?= Loc::getMessage("BTN_CONF") ?>">
</form>
