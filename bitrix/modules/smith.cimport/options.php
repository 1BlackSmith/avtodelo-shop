<?

use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Config\Option;
use \Smith\CImport\DataHandler;

$module_id = "smith.cimport";

Loc::loadMessages($_SERVER['DOCUMENT_ROOT'].BX_ROOT."/modules/main/options.php");
Loc::loadMessages(__FILE__);

if ($APPLICATION->GetGroupRight($module_id) < "S")
{
    $APPLICATION->AuthForm(Loc::getMessage("ACCESS_DENIED"));
}

\Bitrix\Main\Loader::includeModule($module_id);
\Bitrix\Main\Loader::includeModule('fileman');


$request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();
?>

<?
# Описание опций

$aTabs = array(
    array(
        "DIV"   => "import_sets",
        "TAB"   => Loc::getMessage("SMITH_CIMPORT_TAB_IMPORT_SETS"),
        "TITLE" => Loc::getMessage("SMITH_CIMPORT_TAB_IMPORT_SETS")
    ),
    array(
        "DIV"   => "rights",
        "TAB"   => Loc::getMessage("SMITH_CIMPORT_TAB_RIGHTS"),
        "TITLE" => Loc::getMessage("SMITH_CIMPORT_TAB_RIGHTS_TITLE"),
    ),
);

# Обработка

$res = \Smith\B2B\Company::getByID(160);
//\Bitrix\Main\IO\File::putFileContents($_SERVER['DOCUMENT_ROOT'] . '/log1.txt', print_r($res, true));

if ($request->isPost() && check_bitrix_sessid()) {

    if ($request['update']) {
    }

    if ($request['run']) {
        $import = new CompaniesImport();
        $import->runImport();
    }

    /* Сброс POST запроса */
    header("Location: ".$_SERVER['REQUEST_URI']);
}


# Визуальный вывод

$tabControl = new CAdminTabControl('tabControl', $aTabs);

?>
<? $tabControl->Begin(); ?>
<form method="post" action="<?echo $APPLICATION->GetCurPage()?>?mid=<?=htmlspecialcharsbx($request['mid'])?>&amp;lang=<?=$request['lang']?>" name="SMITH_CIMPORT_settings" enctype="multipart/form-data">
<? 
    foreach ($aTabs as $aTab):
        switch ($aTab['DIV']):
            case "import_sets": 
                $tabControl->BeginNextTab();
?>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_CIMPORT_FIELD_FILE") ?></td>
                    <td>
                        <?= CFileInput::Show(
                                'FILE',
                                '',
                                array(
                                    //"IMAGE" => "N",
                                    "PATH" => "Y",
                                    "FILE_SIZE" => "Y",
                                    "DIMENSIONS" => "Y",
                                    "IMAGE_POPUP" => "N",
                                    //"MAX_SIZE" => $maxSize,
                                ), array(
                                    'upload' => true,
                                    'medialib' => false,
                                    'file_dialog' => true,
                                    'cloud' => false,
                                    'del' => false,
                                    'description' => false,
                                )
                            );
                        ?> 
                    </td>
                </tr>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_CIMPORT_FIELD_ADD") ?></td>
                    <td><?= InputType('checkbox', 'ADD', '1', '1') ?></td>
                </tr>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_CIMPORT_FIELD_DEL") ?></td>
                    <td><?= InputType('checkbox', 'DEL', '1', '1') ?></td>
                </tr>
<?
                break;

            case "rights":
                $tabControl->BeginNextTab();
                require_once($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/main/admin/group_rights.php");
                break;
?>
<?
        endswitch;
    endforeach; 
?>
<?
    $tabControl->Buttons(); 
?>
    <input type="submit" name="run" value="<?= Loc::GetMessage('SMITH_CIMPORT_RUN_IMPORT')?>">
    <input type="submit" name="update" value="<?= Loc::GetMessage('SMITH_CIMPORT_SAVE_SETS')?>">
    <input type="reset" name="reset" value="<?= Loc::GetMessage('SMITH_CIMPORT_RESET_SETS')?>">
    <?=bitrix_sessid_post();?>
</form>
<? $tabControl->End(); ?>

