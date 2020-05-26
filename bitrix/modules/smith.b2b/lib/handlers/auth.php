<?

namespace Smith\B2B\Handlers;

use \Bitrix\Main\Application;
use \Smith\B2B\Rights;

class Auth 
{
    const MODULE_ID = "smith.b2b";

    const B2B_PERSONAL_URI = "/b2b/";
    const B2B_INVITE_CONFIRM = "/b2b/invite_confirm";
    const PERSONAL_URI = "/personal/";
    const CART_URI = "/personal/cart/";
    const ORDER_URI = "/personal/order/";

    public static function OnBeforeProlog()
    {
        global $USER;
        global $APPLICATION;

        $request = Application::getInstance()->getContext()->getRequest();

        if (Bxstrrpos($APPLICATION->GetCurUri(), self::B2B_PERSONAL_URI) !== false &&
            Bxstrrpos($APPLICATION->GetCurUri(), self::B2B_INVITE_CONFIRM) === false)
        {
            $APPLICATION->IncludeComponent(
                "smith:b2b.rights.check",
                "",
                array("GO_AUTH" => "Y"),
                false
            );

            if ($request->get('b2b_exit'))
            {
                $USER->Authorize($APPLICATION->get_cookie('B2B_USER'), true);
                $APPLICATION->set_cookie('B2B_USER', 0, 0);
                $APPLICATION->set_cookie('B2B_RIGHTS', 0, 0);
                LocalRedirect(self::PERSONAL_URI);
            }
        }

        if (self::isPersonal())
        {
            if (Rights::isCompanyAuth())
            {
                LocalRedirect(self::B2B_PERSONAL_URI);
            }
        }
    }

    protected static function isPersonal()
    {
        global $APPLICATION;
        
        $isPersonal = Bxstrrpos($APPLICATION->GetCurUri(), self::PERSONAL_URI) !== false;
        $isCart = Bxstrrpos($APPLICATION->GetCurUri(), self::CART_URI) !== false;
        $isOrder = Bxstrrpos($APPLICATION->GetCurUri(), self::ORDER_URI) !== false;
        
        return $isPersonal && !$isCart && !$isOrder;
    }
}