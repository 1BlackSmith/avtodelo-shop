<div class="js-compact-header">
	<div class="l-compact-header js-fix-scroll">
		<div class="container">
			<div class="l-compact-header__blocks">

				<div class="l-compact-header__block l-compact-header__block--menu">  
					<button class="hamburger hamburger--squeeze hamburger--text text-left d-block" data-compact-menu-toggle="" data-menu-toggle="l-compact-menu">
						<div class="hamburger__text d-none d-md-inline-block"><?=\Bitrix\Main\Localization\Loc::getMessage('RS_COMPACT_MENU'); ?></div>
						<div class="hamburger__box">
							<div class="hamburger__inner"></div>
						</div>
					</button>
				</div>

				<div class="l-compact-header__block l-compact-header__block--logo">
					<a class="b-compact-logo" href="<?=SITE_DIR?>">
						<?$APPLICATION->IncludeFile(
							SITE_DIR."include/compact/logo.php",
							Array(),
							Array("MODE"=>"html")
						);?>
					</a>
				</div>

				<div class="l-compact-header__block l-compact-header__block--search">
                    <?$APPLICATION->IncludeFile(
						SITE_DIR."include/compact/search.php",
						Array(),
						Array("MODE"=>"html")
					);?>
				</div>

				<div class="l-compact-header__block l-compact-header__block--personal">
					<?$APPLICATION->IncludeFile(
						SITE_DIR."include/compact/personal.php",
						Array(),
						Array("MODE"=>"html")
					);?>
				</div>

				<div class="l-compact-header__block l-compact-header__block--icons">
					<?php
					$APPLICATION->IncludeFile(
						'include/globals/favorite-icon.php',
						array(),
						array(
							'SHOW_BORDER' => false
						)
					);
					$APPLICATION->IncludeFile(
						'include/globals/compare-icon.php',
						array(),
						array(
							'SHOW_BORDER' => false
						)
					);
					$APPLICATION->IncludeFile(
						'include/globals/cart-icon.php',
						array(),
						array(
							'SHOW_BORDER' => false
						)
					);
					?>
				</div>

			</div>
		</div>
	</div>

	<?=$APPLICATION->ShowViewContent('popup-search'); ?>
</div>
