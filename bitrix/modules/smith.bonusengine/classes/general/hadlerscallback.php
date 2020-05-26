<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

use \Bitrix\Main\EventManager;
use \Bitrix\Main\Config\Option;
use \Smith\Bonusengine\EventTable;

class SBHandlersCallback
{
    public function callback($points)
    {
        $userId = CUser::GetID();

        if (userId && self::check()) {
            if (CModule::IncludeModule('sale')) {
                CSaleUserAccount::UpdateAccount($userId, $points, 'RUB');
            }
        }
    }

    public static function check()
    {
        return true;
    }
}