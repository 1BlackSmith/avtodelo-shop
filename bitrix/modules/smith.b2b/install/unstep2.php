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

if ($ex = $APPLICATION->GetException()) {
    echo CAdminMessage::ShowMessage(array(
        "TYPE"    => "ERROR",
        "MESSAGE" => Loc::getMessage("UNINSTALL_ERROR"),
        "DETAILS" => $ex->getString(),
        "HTML"    => true
    ));
} else {
    echo CAdminMessage::ShowNote(Loc::getMessage("UNINSTALL_OK"));
}
?>

<form action="<?= $APPLICATION->GetCurPage() ?>">
    <input type="hidden" name="lang" value="<?= LANGUAGE_ID ?>">
    <input type="submit" name="" value="<?= Loc::getMessage("BTN_BACK") ?>">
</form>
