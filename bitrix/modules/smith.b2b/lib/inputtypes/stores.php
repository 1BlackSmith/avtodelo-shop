<?

namespace Smith\B2B\InputTypes;

use Bitrix\Main\Event;
use Bitrix\Main\EventManager,
    Bitrix\Main\SystemException,
    Bitrix\Main\Localization\Loc;
use Bitrix\Main\EventResult;
use Bitrix\Sale\ResultError;

Loc::loadMessages(__FILE__);

class Stores extends \Bitrix\Sale\Internals\Input\Base
{
    /**
     * @param $name
     * @param array $input
     * @param $value
     * @return string
     */
    public static function getFilterEditHtml($name, array $input, $value)
    {
        return static::getEditHtmlSingle($name, $input, $value);
    }

    public static function getEditHtmlSingle($name, array $input, $value)
    {
        return '<input type="text" name="'.$name.'" value="'.htmlspecialcharsbx($value).'">';
    }

    public static function getErrorSingle(array $input, $value)  // TODO optimize to getError
    {
        $errors = array();
        return $errors;
    }

    static function getSettings(array $input, $reload)
    {
        $settings = array(
            // TODO maybe??? 'OPTIONS' => array('TYPE' => 'TUPLE'),
        );

        return $settings;
    }
}