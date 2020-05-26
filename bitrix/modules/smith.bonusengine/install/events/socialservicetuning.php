<?
/**
 * Created by SublimeText 3
 * @author Mr. Smith - 1BlackSmith.work@gmail.com
 * @version 1.0
 */

namespace Bitrix\Bonusengine\Events\Socialservices;

\Bitrix\Main\Loader::includeModule("socialservices");

class Socialservices
{
    public static function OnBindSocialservicesUser($userId)
    {
        CSaleUserAccount::UpdateAccount($userId, 100, 'RUB', 'socialservices');
    }
}