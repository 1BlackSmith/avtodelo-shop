<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

use Smith\Bonusengine\BasketTable;

Bitrix\Main\Loader::includeModule('smith.bonusengine');
?>

<div class="card font-size-sm mw-100 mb-4" style="width:24rem">
	<div class="card-header py-3 px-4 mb--1">
		<strong>
			<?=Bitrix\Main\Localization\Loc::getMessage('SPA_BILL_AT')?>
		</strong>
	</div>
	<div class="card-body py-4 px-4">
		<div class="sale-personal-account-wallet-list">
			<?
			foreach($arResult["ACCOUNT_LIST"] as $accountValue)
			{
				?>
				<div class="d-flex justify-content-between align-items-center font-weight-bold">
					<div class="h5 mb-0"><?=BasketTable::roundPrecision($accountValue['ACCOUNT_LIST']['CURRENT_BUDGET'])?></div>
				</div>
				<?
			}
			?>
		</div>
	</div>
</div>