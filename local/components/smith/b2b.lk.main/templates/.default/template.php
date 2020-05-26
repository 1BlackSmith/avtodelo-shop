<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;
?>

<div class="b2b-main">
        <?php if (!empty($arResult['STAT'])): ?>
            <div class="b2b-main__orders-stat mb-6">
                <h4><?=Loc::getMessage("SPS_B2B_ORDERS_STATS_HEAD")?></h4>
                <div class="b2b-main__container">
                    <p><?=Loc::getMessage("SPS_B2B_ORDERS_STATS_ORDERS_AMOUNT")?>: <?=$arResult['STAT']['ORDERS_AMOUNT']?></p>
                    <p><?=Loc::getMessage("SPS_B2B_ORDERS_STATS_ORDERS_UNPAID")?>: <?=$arResult['STAT']['ORDERS_UNPAID']?></p>
                    <p><?=Loc::getMessage("SPS_B2B_ORDERS_STATS_ORDERS_IN_TRANSIT")?>: <?=$arResult['STAT']['ORDERS_IN_TRANSIT']?></p>
                    <p><?=Loc::getMessage("SPS_B2B_ORDERS_STATS_ORDERS_EXECUTED")?>: <?=$arResult['STAT']['ORDERS_EXECUTED']?></p>
                </div>
            </div>
            <div class="b2b-main__company-stat">
                <h4><?=Loc::getMessage("SPS_B2B_COMPANY_STATS_HEAD")?></h4>
                <div class="b2b-main__container">
                    <p><?=Loc::getMessage("SPS_B2B_COMPANY_STATS_COMPANY_SUM_PAID")?>: <?=$arResult['STAT']['COMPANY_SUM_PAID']?></p>
                    <p><?=Loc::getMessage("SPS_B2B_COMPANY_STATS_COMPANY_BONUSES")?>: <?=$arResult['STAT']['COMPANY_BONUSES']?></p>
                    <p><?=Loc::getMessage("SPS_B2B_COMPANY_STATS_COMPANY_DEBIT_SUMD")?>: <?=$arResult['STAT']['COMPANY_DEBIT_SUM']?></p>
                </div>
            </div>
        <?php endif ?>
</div>