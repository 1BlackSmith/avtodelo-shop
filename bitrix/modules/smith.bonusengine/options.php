<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Config\Option;
use \Smith\Bonusengine\EventTable;
use \Smith\Bonusengine\SBEventManager;

$module_id = "smith.bonusengine";

Loc::loadMessages($_SERVER['DOCUMENT_ROOT'].BX_ROOT."/modules/main/options.php");
Loc::loadMessages(__FILE__);

if ($APPLICATION->GetGroupRight($module_id) < "S")
{
    $APPLICATION->AuthForm(Loc::getMessage("ACCESS_DENIED"));
}

\Bitrix\Main\Loader::includeModule($module_id);


$request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();

Bitrix\Main\Page\Asset::getInstance()->addJs('/bitrix/js/smith.bonusengine/admin/event_table.js');
?>

<?
# Описание опций

$aTabs = array(
    array(
        "DIV"   => "catalog_sets",
        "TAB"   => Loc::getMessage("SMITH_BONUSENGINE_TAB_CATALOG_SETS"),
        "TITLE" => Loc::getMessage("SMITH_BONUSENGINE_TAB_CATALOG_SETS")
    ),
    array(
        "DIV"   => "user_sets",
        "TAB"   => Loc::getMessage("SMITH_BONUSENGINE_TAB_USER_SETS"),
        "TITLE" => Loc::getMessage("SMITH_BONUSENGINE_TAB_USER_SETS")
    ),
    array(
        "DIV"   => "primary_sets",
        "TAB"   => Loc::getMessage("SMITH_BONUSENGINE_TAB_PRIMARY_SETS"),
        "TITLE" => Loc::getMessage("SMITH_BONUSENGINE_TAB_PRIMARY_SETS")
    ),
    array(
        "DIV"   => "rights",
        "TAB"   => Loc::getMessage("SMITH_BONUSENGINE_TAB_RIGHTS"),
        "TITLE" => Loc::getMessage("SMITH_BONUSENGINE_TAB_RIGHTS_TITLE"),
    ),
);


# Обработка

if ($request->isPost() && check_bitrix_sessid()) {

    if ($request['Update']) {

        /**
         * Баллы за покупки
         */
        if ($request['WRITE_OF_PERCENT']) {
            Option::set($module_id, 'WRITE_OF_PERCENT', intval($request['WRITE_OF_PERCENT']));
        }
        if ($request['POINTS_PRECISION']) {
            Option::set($module_id, 'POINTS_PRECISION', intval($request['POINTS_PRECISION']));
        }

        /**
         * Основные настройки
         */
        if ($request['GROUP_POINTS1']) {
            Option::set($module_id, 'GROUP_POINTS1', serialize($request['GROUP_POINTS1']));
        }

        if ($request['GROUP_POINTS2']) {
            Option::set($module_id, 'GROUP_POINTS2', serialize($request['GROUP_POINTS2']));
        }

        /**
         * Баллы за действия
         */
        if ($request['MODULE']) {
            /** 
             * @var Array $events[]
             * [
             *      [MUDULE]  => string
             *      [EVENT]   => string
             *      [POINTS]  => integer
             *      [SITE_ID] => string
             * ], ...
             */
            $events = array();

            /** 
             * Обработка таблицы событий
             */
            for ($i = 0; $i < count($request['MODULE']); $i++) { 
                if (!$request['POINTS'][$i]) 
                    continue;

                $arEvent = array(
                    'ID'          => (int)$request['ID'][$i],
                    'MODULE_CODE' => $request['MODULE'][$i],
                    'EVENT_CODE'  => $request['EVENT'][$i],
                    'POINTS'      => (int)$request['POINTS'][$i],
                    'SITE_ID'     => SITE_ID
                );

                $events[] = $arEvent;
            } unset($arEvent);

            /** 
             * Если элемент уже есть в базе,
             * то изменить его
             */
            foreach ($events as $arEvent) {
                if (EventTable::checkEntity($arEvent['ID'])) {
                    EventTable::update($arEvent['ID'], $arEvent);
                } else {
                    EventTable::add($arEvent);
                }
            } unset($arEvent);
        }
    }

    if ($request['run'])
    {
    }

    /* Сброс POST запроса */
    header("Location: ".$_SERVER['REQUEST_URI']);
}


# Визуальный вывод

$tabControl = new CAdminTabControl('tabControl', $aTabs);

?>
<? $tabControl->Begin(); ?>
<form method="post" action="<?echo $APPLICATION->GetCurPage()?>?mid=<?=htmlspecialcharsbx($request['mid'])?>&amp;lang=<?=$request['lang']?>" name="smith_bonusengine_settings">

<? 
    foreach ($aTabs as $aTab):
        switch ($aTab['DIV']):
            case "catalog_sets":
                $tabControl->BeginNextTab();

                $arGroups = array();
                $arPriceGroups = array();

                $rsPriceGroups = CCatalogGroup::GetGroupsList(array('BUY' => 'Y'));
                while ($arPriceGroup = $rsPriceGroups->Fetch()) {
                    $arPriceGroups[] = $arPriceGroup['GROUP_ID'];
                }

                $filter = array('ID' => implode(' | ', $arPriceGroups));

                $rsGroups = CGroup::GetList(($by = "c_sort"), ($order = "asc"), $filter);
                while ($arGroup = $rsGroups->Fetch()) {
                    $arGroups['IDS'][] = $arGroup['ID'];
                    $arGroups['NAMES'][] = $arGroup['NAME'];
                }
?>
                <tr class="heading">
                    <td colspan="2"><?= Loc::getMessage("SMITH_BONUSENGINE_TAB_CATALOG_SETS_HEADING_TARIFF") ?></td>
                </tr>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_BONUSENGINE_TAB_CATALOG_SETS_TARIFF1") ?></td>
                    <td>
                        <?= SelectBoxMFromArray(
                            "GROUP_POINTS1[]", 
                            array(
                                "REFERENCE" => $arGroups['NAMES'], 
                                "REFERENCE_ID" => $arGroups['IDS']
                            ), 
                            unserialize(Option::get($module_id, 'GROUP_POINTS1')),
                            "", false, 5, 'class="smith-select-module" style="width: 300px;"') 
                        ?> 
                    </td>
                </tr>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_BONUSENGINE_TAB_CATALOG_SETS_TARIFF2") ?></td>
                    <td>
                        <?= SelectBoxMFromArray(
                            "GROUP_POINTS2[]", 
                            array(
                                "REFERENCE" => $arGroups['NAMES'], 
                                "REFERENCE_ID" => $arGroups['IDS']
                            ), 
                            unserialize(Option::get($module_id, 'GROUP_POINTS2')),
                            "", false, 5, 'class="smith-select-module" style="width: 300px;"') 
                        ?>  
                    </td>
                </tr>
<?
                break;

            case "user_sets":
                $tabControl->BeginNextTab();

                /** @var Array $arModules [0 => modulename] */
                $arModules = SBEventManager::getModulesList();
                array_unshift($arModules, "");
?>
                <tr>
                    <td>
                        <table>
                            <tbody data-smith-options-container="tab_user_sets">
                                <tr>
                                    <td><?= Loc::GetMessage('SMITH_BONUSENGINE_TABLE_COL_MODULE') ?></td>
                                    <td><?= Loc::GetMessage('SMITH_BONUSENGINE_TABLE_COL_EVENT') ?></td>
                                    <td><?= Loc::GetMessage('SMITH_BONUSENGINE_TABLE_COL_POINTS') ?></td>
                                </tr>
                                <tr id="tab_user_sets-proto" class="tab_user_sets" style="display: none">
                                    <td>
                                        <input type="hidden" name="ID[]" value="">
                                        <?= SelectBoxFromArray(
                                            "MODULE[]", 
                                            array(
                                                "REFERENCE" => $arModules, 
                                                "REFERENCE_ID" => $arModules
                                            ), 
                                            "", "", 'class="smith-select-module" id="MODULE_'.uniqid().'" style="width: 300px;"') 
                                        ?>
                                    </td>
                                    <td>
                                        <?= SelectBoxFromArray(
                                            "EVENT[]", 
                                            array(
                                                "REFERENCE" => array(""), 
                                                "REFERENCE_ID" => array("")
                                            ),
                                            "", "", 'class="smith-select-event" style="width: 300px;"') 
                                        ?>
                                    </td>
                                    <td><input type="text" name="POINTS[]"></td>
                                    <td><a href="javascript:;" class="adm-btn adm-btn-delete adm-btn-delete-item"><?= Loc::GetMessage('SMITH_BONUSENGINE_TABLE_DELETE_ROW')?></a></td>
                                </tr>
                                <?
                                $arEvents = EventTable::getList()->fetchCollection();

                                foreach ($arEvents as $arEvent):
                                    /** @var Array $arModuleEvents [0 => modulename] */
                                    $arModuleEvents = SBEventManager::getModuleEventsList($arEvent['MODULE_CODE']);
                                ?>
                                    <tr class="tab_user_sets">
                                        <td>
                                            <input type="hidden" name="ID[]" value="<?= $arEvent['ID'] ?>">
                                            <?= SelectBoxFromArray(
                                                "MODULE[]", 
                                                array(
                                                    "REFERENCE" => $arModules, 
                                                    "REFERENCE_ID" => $arModules
                                                ), 
                                                $arEvent['MODULE_CODE'], "", 'class="smith-select-module" id="MODULE_'.uniqid().'" style="width: 300px;"') 
                                            ?>
                                        </td>
                                        <td>
                                            <?= SelectBoxFromArray(
                                                "EVENT[]", 
                                                array(
                                                    "REFERENCE" => $arModuleEvents, 
                                                    "REFERENCE_ID" => $arModuleEvents
                                                ),
                                                $arEvent['EVENT_CODE'], "", 'class="smith-select-event" style="width: 300px;"') 
                                            ?>
                                        </td>
                                        <td><input type="text" name="POINTS[]" value="<?= $arEvent['POINTS'] ?>"></td>
                                        <td><a href="javascript:;" class="adm-btn adm-btn-delete adm-btn-delete-item" delete-target="<?= $arEvent['ID'] ?>"><?= Loc::GetMessage('SMITH_BONUSENGINE_TABLE_DELETE_ROW')?></a></td>
                                    </tr>
                                <? endforeach; ?>
                                <tr class="tab_user_sets">
                                    <td>
                                        <input type="hidden" name="ID[]" value="">
                                        <?= SelectBoxFromArray(
                                            "MODULE[]", 
                                            array(
                                                "REFERENCE" => $arModules, 
                                                "REFERENCE_ID" => $arModules
                                            ), 
                                            "", "", 'class="smith-select-module" id="MODULE_'.uniqid().'" style="width: 300px;"') 
                                        ?>
                                    </td>
                                    <td>
                                        <?= SelectBoxFromArray(
                                            "EVENT[]", 
                                            array(
                                                "REFERENCE" => array(""), 
                                                "REFERENCE_ID" => array("")
                                            ),
                                            "", "", 'class="smith-select-event" style="width: 300px;"') 
                                        ?>
                                    </td>
                                    <td><input type="text" name="POINTS[]"></td>
                                    <td><a href="javascript:;" class="adm-btn adm-btn-delete adm-btn-delete-item"><?= Loc::GetMessage('SMITH_BONUSENGINE_TABLE_DELETE_ROW')?></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a href="javascript:;" class="adm-btn adm-btn-save" data-smith-options-add-block="tab_user_sets">Добавить</a>
                    </td>
                </tr>
<?
                break;

            case "primary_sets": 
                $tabControl->BeginNextTab();

?>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_BONUSENGINE_TAB_PRIMARY_SETS_PERCENT") ?></td>
                    <td>
                        <input type="text" name="WRITE_OF_PERCENT" value="<?= Option::get($module_id, 'WRITE_OF_PERCENT') ?>">
                    </td>
                </tr>
                <tr>
                    <td width="40%"><?= Loc::getMessage("SMITH_BONUSENGINE_TAB_PRIMARY_SETS_PRECISION") ?></td>
                    <td>
                        <input type="text" name="POINTS_PRECISION" value="<?= Option::get($module_id, 'POINTS_PRECISION') ?>">
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
<?
    $tabControl->Buttons(); 
?>
    <input type="submit" name="Update" value="<?= Loc::GetMessage('SMITH_BONUSENGINE_SAVE_SETS')?>">
    <input type="reset" name="reset" value="<?= Loc::GetMessage('SMITH_BONUSENGINE_RESET_SETS')?>">
    <?=bitrix_sessid_post();?>
</form>
<? $tabControl->End(); ?>

