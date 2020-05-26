<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Application;

if (!check_bitrix_sessid())
    return;

echo CAdminMessage::ShowMessage(array(
    "TYPE"    => "ERROR",
    "MESSAGE" => Loc::getMessage("UNINSTALL_CONFIRM_TITLE"),
    "DETAILS" => Loc::getMessage("UNINSTALL_CONFIRM_DETAIL"),
    "HTML"    => true
));
?>

<form action="<?= $APPLICATION->GetCurPage() ?>">
    <input type="hidden" name="lang" value="<?= LANGUAGE_ID ?>">
    <input type="submit" name="" value="<?= Loc::getMessage("BTN_BACK") ?>">
</form>
