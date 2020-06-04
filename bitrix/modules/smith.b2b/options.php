<?

use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Config\Option;
use \Smith\B2B\CompanyTable;

$module_id = "smith.b2b";

Loc::loadMessages($_SERVER['DOCUMENT_ROOT'].BX_ROOT."/modules/main/options.php");
Loc::loadMessages(__FILE__);

if ($APPLICATION->GetGroupRight($module_id) < "S")
{
    $APPLICATION->AuthForm(Loc::getMessage("ACCESS_DENIED"));
}

\Bitrix\Main\Loader::includeModule($module_id);

Bitrix\Main\Page\Asset::getInstance()->addJs('/bitrix/js/smith.b2b/admin/element_search.js');

$request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();
?>

<?
# Описание опций

$aTabs = array(
    array(
        "DIV"   => "primary_sets",
        "TAB"   => Loc::getMessage("SMITH_B2B_TAB_PRIMARY_SETS"),
        "TITLE" => Loc::getMessage("SMITH_B2B_TAB_PRIMARY_SETS")
    ),
    array(
        "DIV"   => "catalog_groups",
        "TAB"   => Loc::getMessage("SMITH_B2B_TAB_CATALOG_GROUPS"),
        "TITLE" => Loc::getMessage("SMITH_B2B_TAB_CATALOG_GROUPS")
    ),
    array(
        "DIV"   => "rights",
        "TAB"   => Loc::getMessage("SMITH_B2B_TAB_RIGHTS"),
        "TITLE" => Loc::getMessage("SMITH_B2B_TAB_RIGHTS_TITLE"),
    ),
);


# Обработка

if ($request->isPost() && check_bitrix_sessid()) {

    if ($request['Update']) {

        if ($request['B2B_GROUP_ID']) {
            Option::set($module_id, 'B2B_GROUP_ID', $request['B2B_GROUP_ID']);
        }

        if ($request['B2B_MANAGER_GROUP_ID']) {
            Option::set($module_id, 'B2B_MANAGER_GROUP_ID', $request['B2B_MANAGER_GROUP_ID']);
        }

        if ($request['B2B_MANAGER_ORDER_GROUP_ID']) {
            Option::set($module_id, 'B2B_MANAGER_ORDER_GROUP_ID', $request['B2B_MANAGER_ORDER_GROUP_ID']);
        }
    }

    /* Сброс POST запроса */
    header("Location: ".$_SERVER['REQUEST_URI']);
}


# Визуальный вывод

$tabControl = new CAdminTabControl('tabControl', $aTabs);

?>
<? $tabControl->Begin(); ?>
<form method="post" action="<?echo $APPLICATION->GetCurPage()?>?mid=<?=htmlspecialcharsbx($request['mid'])?>&amp;lang=<?=$request['lang']?>" name="SMITH_B2B_settings">

<? 
    foreach ($aTabs as $aTab):
        switch ($aTab['DIV']):
            case "primary_sets": 
                $tabControl->BeginNextTab();

                $arGroups = array();
                $rsGroups = CGroup::GetList(($by = "c_sort"), ($order = "asc"));
                while ($arGroup = $rsGroups->Fetch()) {
                    $arGroups['IDS'][] = $arGroup['ID'];
                    $arGroups['NAMES'][] = $arGroup['NAME'];
                }

?>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_B2B_GROUP_ID") ?></td>
                    <td>
                        <?= SelectBoxFromArray(
                            "B2B_GROUP_ID", 
                            array(
                                "REFERENCE" => $arGroups['NAMES'], 
                                "REFERENCE_ID" => $arGroups['IDS']
                            ), 
                            Option::get($module_id, 'B2B_GROUP_ID'),
                            "", false, 5, 'class="smith-select-module" style="width: 300px;"') 
                        ?> 
                    </td>
                </tr>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_B2B_MANAGER_GROUP_ID") ?></td>
                    <td>
                        <?= SelectBoxFromArray(
                            "B2B_MANAGER_GROUP_ID", 
                            array(
                                "REFERENCE" => $arGroups['NAMES'], 
                                "REFERENCE_ID" => $arGroups['IDS']
                            ), 
                            Option::get($module_id, 'B2B_MANAGER_GROUP_ID'),
                            "", false, 5, 'class="smith-select-module" style="width: 300px;"') 
                        ?> 
                    </td>
                </tr>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_B2B_MANAGER_ORDER_GROUP_ID") ?></td>
                    <td>
                        <?= SelectBoxFromArray(
                            "B2B_MANAGER_ORDER_GROUP_ID", 
                            array(
                                "REFERENCE" => $arGroups['NAMES'], 
                                "REFERENCE_ID" => $arGroups['IDS']
                            ), 
                            Option::get($module_id, 'B2B_MANAGER_ORDER_GROUP_ID'),
                            "", false, 5, 'class="smith-select-module" style="width: 300px;"') 
                        ?> 
                    </td>
                </tr>
<?
                break;

            case "catalog_groups": 
                $tabControl->BeginNextTab();
?>
                <tr>
                    <td>
                        <input type="text" name="B2B_CATALOG_GROUP[]" placeholder="<?= Loc::getMessage("SMITH_B2B_CATALOG_GROUP") ?>">
                    </td>
                    <td>
                        <a href="javascript:void(0)" onclick="openElementSearch(this)" class="adm-btn"><?= Loc::getMessage("SMITH_B2B_OPEN_ELEMENT_SEARCH") ?></a>
                        <input type="hidden" name="B2B_CATALOG_PRODUCTS[] ">
                    </td>
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

<script>
    var dialog = new ElementSearch({
        IBLOCK_ID: 3,
        url: '/bitrix/admin/smith_product_groups_dialog.php',
        title: 'Какая-то группа товаров',
        buttons: [
            {
                title: BX.message('JS_CORE_WINDOW_SAVE'),
                id: 'savebtn',
                name: 'savebtn',
                className: BX.browser.IsIE() && BX.browser.IsDoctype() && !BX.browser.IsIE10() ? '' : 'adm-btn-save',
                action: () => {
                    dialog.getDialog().Close();
                }
            },
            {
                title: 'Добавить',
                id: 'addbtn',
                name: 'addbtn',
                className: BX.browser.IsIE() && BX.browser.IsDoctype() && !BX.browser.IsIE10() ? '' : 'adm-btn',
                action: () => {
                    //this._dialogSearch.Close();
                }
            }
        ]
    });
    dialog.dialogSearch().getDialog().Show();

    BX.addCustomEvent(dialog.getEvent(), (dataEvent) => {
        console.info(dataEvent); 
        //dialog.getDialog().Close();
    });
</script>
<?
    $tabControl->Buttons(); 
?>
    <input type="submit" name="Update" value="<?= Loc::GetMessage('SMITH_B2B_SAVE_SETS')?>">
    <input type="reset" name="reset" value="<?= Loc::GetMessage('SMITH_B2B_RESET_SETS')?>">
    <?=bitrix_sessid_post();?>
</form>
<? $tabControl->End(); ?>

