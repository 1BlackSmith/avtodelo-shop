<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) {
	die();
}

if (count($arResult['BANNERS']) > 0): ?>
<section class="l-section l-section--container l-section--outer-spacing">
	<?php if ($arParams['ADD_CONTAINER'] == 'Y'): ?>
		<div class="l-section__container">
	<?php endif; ?>

	<div class="l-section__main">
		<div class="row">
			<?php
			$sGridClass = implode(
				' ',
				array_map(
					function ($key, $val) {
						return 'col-'.$key.'-'.$val;
					},
					array_keys($arParams['GRID_RESPONSIVE_SETTINGS']),
					$arParams['GRID_RESPONSIVE_SETTINGS']
				)
			);
			?>
			<?php foreach($arResult["BANNERS"] as $k => $banner): ?>
                                    <?php 
                                      $url = "/bitrix/rk.php?id={$arParams['BANNER_ID']}&site_id=${SITE_ID}&event1=banner&event2=click&goto=";
                                    ?>
				<div class="<?=$sGridClass?> mb-2 mb-md-0">
                                      <a href="<?=$url?><?=urlencode($banner['PROPERTIES']['LINK']['VALUE'])?>" title="<?=$banner['PROPERTIES']['LINK_TITLE']['VALUE']?>" target="<?=$banner['PROPERTIES']['LINK_TARGET']['VALUE_XML_ID']?>" class="b-adv-index-mini-banner">
                                        <img src="<?=CFile::GetPath($banner['PROPERTIES']['IMAGE']['VALUE']);?>" alt="" title="" class="img-fluid">
                                      </a>
				</div>
			<?php endforeach; ?>
		</div>
	</div>

	<?php if ($arParams['ADD_CONTAINER'] == 'Y'): ?>
		</div>
	<?php endif; ?>
</section>
<?php endif;
