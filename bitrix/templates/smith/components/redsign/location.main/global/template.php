<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
	die();
}

$frame = $this->createFrame()->begin(''); 
$jsParams = [
    'ajaxUrl' => $componentPath.'/ajax.php',
    'siteId' => SITE_ID,
    'confirmPopupId' =>  'location_confirm'
];
?><script>
    RS.Location = new RSLocation(<?=CUtil::PhpToJSObject($arResult)?>, <?=CUtil::PhpToJSObject($jsParams)?>);
</script>
<?php $frame->end(); ?>