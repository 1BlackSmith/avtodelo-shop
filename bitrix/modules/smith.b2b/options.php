<?

use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Config\Option;
use \Smith\B2B\CompanyTable;
use \Smith\B2B\ProductGroups;

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

        if (is_set($request['B2B_CATALOG_GROUP_ID']) && is_array($request['B2B_CATALOG_GROUP_ID'])) {
            $groupsId = $request['B2B_CATALOG_GROUP_ID'];
            $groupsName = $request['B2B_CATALOG_GROUP_NAME'];
            for ($i = 0; $i < count($groupsId); $i++) { 
                if (!trim($groupsName[$i])) {
                    continue;
                }
                if ($groupsId[$i]) {
                    ProductGroups::renameGroup($groupsId[$i], $groupsName[$i]);
                } else {
                    ProductGroups::addGroup($groupsName[$i]);
                }
            }
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
                foreach (ProductGroups::getGroups() as $group):
?>
                <tr>
                    <td width="40%">
                        <input type="hidden" name="B2B_CATALOG_GROUP_ID[]" value="<?=$group['ID']?>">
                        <input type="text" name="B2B_CATALOG_GROUP_NAME[]" value="<?=$group['NAME']?>" size="30">
                    </td>
                    <td width="154">
                        <a href="javascript:void(0)" onclick="openProductsGroupPopup(<?=$group['ID']?>, '<?=$group['NAME']?>')" class="adm-btn"><?= Loc::getMessage("SMITH_B2B_OPEN_PRODUCTS") ?></a>
                    </td>
                    <td>
                        <a href="javascript:void(0)" onclick="deleteGroup(this, <?=$group['ID']?>)" class="adm-btn"><?= Loc::getMessage("SMITH_B2B_DELETE") ?></a>
                    </td>
                </tr>
<?
                endforeach;
?>
                <tr id="example-group" style="display: none">
                    <td width="40%">
                        <input type="hidden" name="B2B_CATALOG_GROUP_ID[]" value="0">
                        <input type="text" name="B2B_CATALOG_GROUP_NAME[]" size="30" placeholder="<?= Loc::getMessage("SMITH_B2B_CATALOG_GROUP") ?>">
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td width="40%">
                        <input type="hidden" name="B2B_CATALOG_GROUP_ID[]" value="0">
                        <input type="text" name="B2B_CATALOG_GROUP_NAME[]" size="30" placeholder="<?= Loc::getMessage("SMITH_B2B_CATALOG_GROUP") ?>">
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <a href="javascript:void(0)" onclick="addGroup(this)" class="adm-btn"><?= Loc::getMessage("SMITH_B2B_ADD_GROUP") ?></a>
                    </td>
                    <td></td>
                </tr>
                <script>
                    function addGroup(el) {
                        var row = BX.findParent(el, {tagName: 'tr'});
                        var tbl = row.parentNode;

                        var example = BX('example-group').cloneNode(true);
                        example.style = '';
                        example.id = '';

                        tbl.insertBefore(example, row);
                    }
                </script>
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
    function deleteGroup(a, groupId) {
        BX.ajax({  
            url: '/bitrix/tools/smith.b2b/delete_group.php',
            data: { id: groupId },
            method: 'POST',
            dataType: 'json',
            timeout: 30,
            async: false,
            processData: true,
            //scriptsRunFirst: true,
            emulateOnload: true,
            start: true,
            cache: false,
            onsuccess: function (data) {
                if (data['STATUS'] === 'OK') {
                    var row = BX.findParent(a, { "tag": "tr"});
                    BX.cleanNode(row, true);
                } else {
                    alert(data['ERRORS']);
                }
            }
        });
    }
</script>
<script>
    function openCatalogPopup(productsGroupPopup, groupId) {
        var catalogPopup = new ElementSearch({
            IBLOCK_ID: 3,
            url: '/bitrix/admin/cat_product_search_dialog.php',
            buttons: [
                {
                    title: BX.message('JS_CORE_WINDOW_SAVE'),
                    id: 'savebtn',
                    name: 'savebtn',
                    className: BX.browser.IsIE() && BX.browser.IsDoctype() && !BX.browser.IsIE10() ? '' : 'adm-btn-save',
                    action: () => {
                        productsGroupPopup.getDialog().Close();
                        productsGroupPopup.refreshDialog();
                    }
                }
            ]
        });
        catalogPopup.dialogSearch().getDialog().Show();
        BX.addCustomEvent(catalogPopup.getEvent(), (dataEvent) => {
            dataEvent.group = groupId;
            BX.ajax({  
                url: '/bitrix/tools/smith.b2b/add_product_in_group.php',
                data: dataEvent,
                method: 'POST',
                dataType: 'json',
                timeout: 30,
                async: false,
                processData: true,
                scriptsRunFirst: true,
                emulateOnload: true,
                start: true,
                cache: false,
                onsuccess: function (data) {
                    if (data['STATUS'] === 'OK') {
                        //
                    } else {
                        alert(data['ERRORS']);
                    }
                }
            });
        });
    }

    function openProductsGroupPopup(groupId, groupName) {
        var productsGroupPopup = new ElementSearch({
            IBLOCK_ID: 3,
            GROUP_ID: groupId,
            url: '/bitrix/admin/smith_product_groups_dialog.php',
            title: groupName,
            buttons: [
                {
                    title: 'Добавить',
                    id: 'addbtn',
                    name: 'addbtn',
                    className: BX.browser.IsIE() && BX.browser.IsDoctype() && !BX.browser.IsIE10() ? '' : 'adm-btn-save',
                    action: () => { 
                        openCatalogPopup.call(false, productsGroupPopup, groupId);
                    }
                },
                {
                    title: 'Закрыть',
                    id: 'closebtn',
                    name: 'closebtn',
                    className: BX.browser.IsIE() && BX.browser.IsDoctype() && !BX.browser.IsIE10() ? '' : 'adm-btn',
                    action: () => {
                        productsGroupPopup.getDialog().Close();
                    }
                }
            ]
        });
        productsGroupPopup.dialogSearch().getDialog().Show();
        BX.addCustomEvent(productsGroupPopup.getEvent(), (dataEvent) => {
            BX.ajax({  
                url: '/bitrix/tools/smith.b2b/delete_product_from_group.php',
                data: dataEvent,
                method: 'POST',
                dataType: 'json',
                timeout: 30,
                async: false,
                processData: true,
                scriptsRunFirst: true,
                emulateOnload: true,
                start: true,
                cache: false,
                onsuccess: function (data) {
                    if (data['STATUS'] === 'OK') {
                        productsGroupPopup.refreshDialog();
                    } else {
                        alert(data['ERRORS']);
                    }
                }
            });
        });
    }
</script>
<?
    $tabControl->Buttons(); 
?>
    <input type="submit" name="Update" value="<?= Loc::GetMessage('SMITH_B2B_SAVE_SETS')?>">
    <input type="reset" name="reset" value="<?= Loc::GetMessage('SMITH_B2B_RESET_SETS')?>">
    <?=bitrix_sessid_post();?>
</form>
<? $tabControl->End(); ?>

