<?

namespace Smith\B2B\Handlers;

class InputTypes
{
    public function registerInputTypes(\Bitrix\Main\Event $event)
    {
        \Bitrix\Sale\Internals\Input\Manager::register(
            "STORES",
            array(
                'CLASS' => '\Smith\B2B\InputTypes\Stores',
                'NAME' => 'Торговые точки',
            )   
        );
    }

    public static function initJs()
    {
        \CJSCore::RegisterExt('stores_input_type', array( 
                'js' => '/bitrix/js/smith.b2b/inputs/stores.js',
                'lang' => '/bitrix/modules/sale/lang/'.LANGUAGE_ID.'/lib/internals/input.php',
                'rel'  => array('input'),
            )
        );
        \CUtil::InitJSCore(array('stores_input_type'));
    }
}