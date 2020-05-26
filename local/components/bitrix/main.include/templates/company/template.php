<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);

use \Bitrix\Main\Localization\Loc;

$const = 12;
if($arParams['USE_VK_GROUPS'] != "N" && $arParams['USE_FB_GROUPS'] != "N"){
    $const = 6;
} else if ($arParams['USE_VK_GROUPS'] != "N" || $arParams['USE_FB_GROUPS'] != "N") {
    $const = 9;
}

$layout = new \Redsign\MegaMart\Layouts\Section();

$layout
	->addModifier('container')
	->addModifier('bg-white')
	->addModifier('shadow')
	->addModifier('inner-spacing')
	->addModifier('outer-spacing');

$layout->start();
?>

<h4 class="mb-4"><?=Loc::getMessage('HEADER')?></h4>
<div class="row company-index mb-6">
	<? if( $arParams['USE_VK_GROUPS'] != "N"){?>
		<script src="https://vk.com/js/api/openapi.js?139" type="text/javascript"></script>
		<div class="col-md-12 col-lg-3 soc soc-1">
			<h6>VK</h6>
			<div id="vk_widget"></div>
			<script type="text/javascript">
				function vkWidgetInit() {
					document.getElementById('vk_widget').innerHTML = '<div id="vk_groups"></div>';
					VK.Widgets.Group("vk_groups", {mode: 5, no_cover: 1, width: "auto", height: "309px", color1: 'ffffff', color2: '585f69'}, <?=$arParams['VK_GROUP_ID']?>);
				}
				window.addEventListener('load', vkWidgetInit, false);
				window.addEventListener('resize', vkWidgetInit, false);
			</script>
		</div>
	<?}?>
	
	<? if( $arParams['USE_INST_GROUPS'] != "N"){?>
		<div class="col-md-12 col-lg-3 soc soc-1">
			<h6>Instagram</h6>
			<iframe src="https://averin.pro/widget.php?l=<?=$arParams['INST_GROUP_ID']?>&style=2&width=100%&gallery=0&s=80&icc=3&icr=3&t=1&tt=Мы в Инстаграм&h=1&ttcolor=FFFFFF&th=c3c3c3&bw=fafafa&bscolor=000000&bs=ffdc0c&ts=Подписаться&ch=utf8" allowtransparency="true" frameborder="0" scrolling="no" style="border:none;overflow:hidden;width:100%; height: 309px" ></iframe>
		</div>
	<?}?>

	<? if( $arParams['USE_OK_GROUPS'] != "N"){?>
		<div class="col-md-12 col-lg-3 soc soc-1">
			<h6>Одноклассники</h6>
			<div id="ok_group_widget"></div>
			<script>
				!function (d, id, did, st) {
					var js = d.createElement("script");
					js.src = "https://connect.ok.ru/connect.js";
					js.onload = js.onreadystatechange = function () {
						if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
							if (!this.executed) {
								this.executed = true;
								setTimeout(function () {
									OK.CONNECT.insertGroupWidget(id,did,st);
								}, 0);
							}
						}
					};
					d.documentElement.appendChild(js);
				}(document,"ok_group_widget","<?=$arParams['OK_GROUP_ID']?>",'{"width":"100%","height":309}');
			</script>
		</div>
	<?}?>

	<? if( $arParams['USE_FB_GROUPS'] != "N"){?>
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = 'https://connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.12';
				fjs.parentNode.insertBefore(js, fjs);
			} (document, 'script', 'facebook-jssdk'));
		</script>
		<div class="col-md-12 col-lg-3 soc soc-2">
			<h6>Facebook</h6>
			<div class="fb-page" data-href="<?=$arParams['FB_GROUP_HREF']?>" data-hide-cover="false" data-show-facepile="true">	</div>
		</div>
	<?}?>
</div>
<h4><?=Loc::getMessage('ENDING')?></h4>
<?

$layout->end();
