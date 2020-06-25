<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;

/**
 * @var array $arParams
 */
?>
<script id="basket-total-template" type="text/html">
	<div class="basket-checkout-container" data-entity="basket-checkout-aligner">
		<?
		if ($arParams['HIDE_COUPON'] !== 'Y')
		{
			?>
			<div class="basket-coupon-section">
				<div class="basket-coupon-block-field">
					<div class="form">
						<div class="form-group" style="position: relative;">
							<input placeholder="<?=Loc::getMessage('SBB_COUPON_ENTER')?>" type="text" class="form-control" id="" placeholder="" data-entity="basket-coupon-input">
							<span class="basket-coupon-block-coupon-btn"></span>
						</div>
						<div class="basket-coupon-alert-section">
							<div class="basket-coupon-alert-inner">
								{{#COUPON_LIST}}
								<div class="basket-coupon-alert text-{{CLASS}}">
									<span class="basket-coupon-text">
										<span class="font-weight-bold text-body">{{COUPON}}</span> - <?=Loc::getMessage('SBB_COUPON')?> {{JS_CHECK_CODE}}
										{{#DISCOUNT_NAME}}({{{DISCOUNT_NAME}}}){{/DISCOUNT_NAME}}
									</span>
									<span class="close-link text-secondary" data-entity="basket-coupon-delete" data-coupon="{{COUPON}}">
										<svg class="icon-svg"><use xlink:href="#svg-close"></use></svg>
									</span>
								</div>
								{{/COUPON_LIST}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<?
		}
		?>
		<div class="basket-checkout-section">
			<div class="basket-checkout-section-inner">

				<div class="basket-checkout-total">
					{{#WEIGHT_FORMATED}}
					<div class="basket-checkout-total-block">
						<div class="basket-checkout-total-block-title"><?=Loc::getMessage('SBB_WEIGHT')?>: </div>
						<div class="basket-checkout-total-block-value">{{{WEIGHT_FORMATED}}}</div>
					</div>
					{{/WEIGHT_FORMATED}}
					
					{{^DISABLE_BONUSES}}
					<div class="basket-checkout-total-block">
						<div class="basket-checkout-total-block-title"><?=Loc::getMessage('SBB_USER_POINTS')?>: </div>
						<div class="basket-checkout-total-block-value">{{{USER_POINTS}}}</div>
					</div>
					{{/DISABLE_BONUSES}}

					{{#DEBITED_BONUSES}}
					<div class="basket-checkout-total-block">
						<div class="basket-checkout-total-block-title"><?=Loc::getMessage('SBB_BONUSES')?>: </div>
						<div class="basket-checkout-total-block-value">{{{BASKET_BONUSES}}}</div>
					</div>
					{{/DEBITED_BONUSES}}

					{{#DISCOUNT_PRICE_FORMATED}}
					<div class="basket-checkout-total-block">
						<div class="basket-checkout-total-block-title"><?=Loc::getMessage('SBB_DISCOUNT')?>: </div>
						<div class="basket-checkout-total-block-value">{{{DISCOUNT_PRICE_FORMATED}}}</div>
					</div>
					{{/DISCOUNT_PRICE_FORMATED}}

					<div class="basket-checkout-total-block">
						<div class="basket-checkout-total-block-title"><?=Loc::getMessage('SBB_TOTAL')?>: </div>
						<div class="basket-checkout-total-block-value font-weight-bold" data-entity="basket-total-price">{{{PRICE_FORMATED}}}</div>
					</div>
				</div>

				<div class="basket-checkout-block basket-checkout-block-btn">
					<input id="calculate-bonuses" type="checkbox" {{#DEBITED_BONUSES}}checked{{/DEBITED_BONUSES}} {{#DISABLE_BONUSES}}disabled{{/DISABLE_BONUSES}} data-entity="basket-bonuses-button" style="display: none;">
					<label for="calculate-bonuses" class="ml-3 mb-0 btn btn-bonuses btn-blue">
						<?=Loc::getMessage('SBB_BONUSES_BTN')?>
					</label>
					<button class="btn btn-primary basket-btn-checkout{{#DISABLE_CHECKOUT}} disabled{{/DISABLE_CHECKOUT}}"
						data-entity="basket-checkout-button">
						<?=Loc::getMessage('SBB_ORDER')?>
					</button>
					<!-- <a href="<?=SITE_DIR?>buy1click/?RS_ORDER_IDS=<?=implode(",", $arResult['BASKET_ITEMS_ID']);?>" data-type="ajax" class="ml-3 btn btn-outline-secondary buy1click-btn-checkout{{#DISABLE_CHECKOUT}} disabled{{/DISABLE_CHECKOUT}}"
						data-entity="">
						<?=Loc::getMessage('SBB_BUY1CLICK')?>
					</a> -->
				</div>
			</div>
		</div>
	</div>
</script>
