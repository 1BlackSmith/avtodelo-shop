<?php
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED!==true)die();

use \Bitrix\Main\Application;
use \Bitrix\Main\Loader;
use \Bitrix\Main\Localization\Loc;
use \Bitrix\Main\Page\Asset;

$request = Application::getInstance()->getContext()->getRequest();
$sCurPage = $APPLICATION->GetCurPage(true);

if ($curPage == SITE_DIR.'index.php') {
	$APPLICATION->IncludeFile(
		"include/index.php",
		array(),
		array('SHOW_BORDER' => false)
	);
}

if ($request->isAjaxRequest())
{
	CMain::FinalActions();
	?></div><?php
	die();
}

if (Loader::includeModule('redsign.megamart'))
{
// $APPLICATION->AddBufferContent(function () use ($APPLICATION) {
	echo \Redsign\MegaMart\MyTemplate::getSiteFooter();
//});
}
?>
		</div><?php // l-page__main ?>
		<div class="l-page__footer">
			<?php
			$APPLICATION->IncludeFile(
				"include/footer/type1.php",
				array(),
				array('SHOW_BORDER' => false)
			);
			?>
		</div>
	</div><?php // l-page ?>


	<?php
	$APPLICATION->IncludeFile(
		"include/compact-menu.php",
		array(),
		array('SHOW_BORDER' => false)
	);

	$APPLICATION->IncludeFile(
		"include/panels/side-panel.php",
		array(
			'SHOW_CONTROLS' => RS_MM_CONTROL_PANEL == 'side'
		),
		array('SHOW_BORDER' => false)
	);

	$APPLICATION->IncludeFile(
		"include/panels/bottom-panel.php",
		array(
			'SHOW_CONTROLS' => RS_MM_CONTROL_PANEL == 'bottom'
		),
		array('SHOW_BORDER' => false)
	);

	$APPLICATION->ShowViewContent('rs_mm_search_popup');
	?>
	<?php $APPLICATION->IncludeFile(SITE_DIR."include/template/body_end.php", array(), array("MODE"=>"html")); ?>
</body>
</html>
