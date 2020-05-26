<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;

global $APPLICATION;
?>

<div class="d-block mb-7">
    <a href="<?=$APPLICATION->GetCurDir().'new'?>" class="btn btn-primary"><?=Loc::getMessage('SPS_COMPANY_EMPLOYEE_ADD')?></a>
</div>
<?php if (!$arResult['EMPLOYEES_NOT_FOUND']): ?>
    <table width="100%">
        <thead>
            <tr>
                <th><?=Loc::getMessage('SPS_EMPLOYEE_FIELD_NAME')?></th>
                <th><?=Loc::getMessage('SPS_EMPLOYEE_FIELD_PHONE')?></th>
                <th><?=Loc::getMessage('SPS_EMPLOYEE_FIELD_STORES')?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($arResult['EMPLOYEES'] as $id => $employee): ?>
                <tr>
                    <td valign="top" width="25%"><a href="<?=$APPLICATION->GetCurDir().$id?>"><?=$employee['NAME']?></a></td>
                    <td valign="top" width="25%"><?=$employee['PHONE']?></td>
                    <td>
                        <ul>
                            <?php foreach ($employee['STORES'] as $address): ?>
                                <li><?=$address?></li>
                            <?php endforeach ?>
                        </ul>
                    </td>
                </tr>
            <?php endforeach ?>
        </tbody>
</table>
<?php else: ?>
    <h4><?=Loc::getMessage('SPS_EMPLOYEES_NOT_FOUND')?></h4>
<?php endif ?>