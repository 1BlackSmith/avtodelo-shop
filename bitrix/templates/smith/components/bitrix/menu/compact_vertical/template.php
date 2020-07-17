<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

use \Bitrix\Main\Application;
use \Bitrix\Main\Localization\Loc;

$this->setFrameMode(true);

$sMenuId = !empty($arParams['RS_MENU_ID']) ? $arParams['RS_MENU_ID'] : 'verticalMenu_'.$this->randString();

if (count($arResult) > 0):
    $sTheme = isset($arParams['MENU_COLOR']) ? $arParams['MENU_COLOR'] : 'primary';
?>
    <div class="l-mmenu-vertical l-mmenu-vertical--<?=$sTheme?>" id="<?=$sMenuId?>">
        <?php
        $sItemClass = 'has-children mmenu-vertical-item mmenu-vertical-item--'.$sTheme;
        if ($arParams['OPEN_CATALOG']) {
            $sItemClass .= ' mmenu-vertical-item--is-open';
        }
        ?>
        <div class="<?=$sItemClass?>">
            <a href="#" class="mmenu-vertical-item__link" data-menu-toggle="l-compact-catalog">
                <svg class="icon-svg"><use xlink:href="#svg-view-card"></use></svg>
                <?=$arParams['CATALOG_TITLE']?>
                <svg class="icon-svg mmenu-vertical-item__chevron-down"><use xlink:href="#svg-chevron-down"></use></svg>
            </a>
            
            <div class="l-compact-catalog" id="js-compact-catalog">
                <div class="position-relative">
                    <div class="l-compact-catalog__items">
                        <?
                        if (count($arResult) < 1) {
                            return;
                        }

                        ?><ul class="b-dl-menu">
                        <?php
                        $previousLevel = 0;

                        if ($arParams['ONLY_CATALOG'] == "Y"): 
                            $rsSites = CSite::GetByID(SITE_ID);
                            if ($arSite = $rsSites->Fetch()) {
                                $SITE_DIR = $arSite['DIR'];
                            }
                            ?>
                            <li class="b-dl-menu__item b-dl-menu__item--main">
                                <a href="<?=$SITE_DIR."catalog/"?>" class="b-dl-menu__link"><?=Loc::getMessage('RS_MM_M_CAT');?></a>
                            </li>
                        <?php
                        endif;

                        foreach ($arResult as $arItem):
                        ?>
                            <?php if ($previousLevel && $arItem["DEPTH_LEVEL"] < $previousLevel): ?>
                                <?=str_repeat("</ul></li>", ($previousLevel - $arItem["DEPTH_LEVEL"]));?>
                            <?php endif; ?>

                            <?php if ($arItem["IS_PARENT"]): ?>
                                <li class="b-dl-menu__item has-subitems<?php if ($arItem['DEPTH_LEVEL'] == 1 && strpos($arItem['LINK'], $arParams['CATALOG_PATH']) !== false): ?><?php endif; ?>">
                                    <a href="<?=$arItem['LINK']?>" class="b-dl-menu__link"><?=$arItem['TEXT']?></a>
                                    <ul class="b-dl-menu__subitems">
                                        <li class="b-dl-menu__item b-dl-menu__item--back">
                                            <a href="<?=$arItem['LINK']?>" class="b-dl-menu__link is-back">
                                                <?=Loc::getMessage('RS_MM_M_BACK');?>
                                            </a>
                                        </li>
                                        <li class="b-dl-menu__item b-dl-menu__item--main">
                                            <a href="<?=$arItem['LINK']?>" class="b-dl-menu__link"><?=$arItem['TEXT']?></a>
                                        </li>
                            <?php else: ?>
                                        <li class="b-dl-menu__item"><a href="<?=$arItem['LINK']?>" class="b-dl-menu__link"><?=$arItem['TEXT']?></a></li>
                            <?php endif; ?>
                        <?php $previousLevel = $arItem["DEPTH_LEVEL"]; endforeach; ?>

                        <?php if ($previousLevel > 1): str_repeat("</ul></li>", ($previousLevel-1) );
                        endif;
                        ?>
                    </div>  
                </div>
            </div>
        </div>
    </div>

    <!-- <script type="text/javascript"> var <?=$menuBlockId.'Obj'?> = new RS.VerticalMenu('<?=$sMenuId?>'); </script> -->
    <script type="text/javascript">
        var catBtn = document.getElementById("verticalMenu_LkGdQn");
        catBtn.addEventListener("click", function(event) { 
            event.preventDefault()
            var cat = document.getElementById("js-compact-catalog");
            cat.classList.toggle("is-open");
        });
    </script>
    <script type="text/javascript">
        $("[data-menu-toggle]").on("click", function(event) {
            $item = $(this);
            $toggle = $("."+$item.attr("data-menu-toggle"));
            $dlmenu = $toggle.find(".b-dl-menu");
            
            if (!$toggle.hasClass("is-open") && $dlmenu.hasClass("is-view")) {
                $dlmenu.removeClass("is-view");
            }
        });
    </script>
<?php
endif;