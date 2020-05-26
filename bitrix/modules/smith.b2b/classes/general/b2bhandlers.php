<?
use \Bitrix\Main\Application;
use \Smith\B2B\Rights;

IncludeModuleLangFile(__FILE__);

class B2BHandlers 
{
    const MODULE_ID = "smith.b2b";

    const B2B_PERSONAL_URI = "/b2b/";
    const PERSONAL_URI = "/personal/";
    const CART_URI = "/personal/cart/";
    const ORDER_URI = "/personal/order/make/";

    public static function OnBeforeProlog()
    {
        global $USER;
        global $APPLICATION;

        if (Bxstrrpos($APPLICATION->GetCurUri(), self::B2B_PERSONAL_URI) !== false)
        {
            $APPLICATION->IncludeComponent(
                "smith:b2b.rights.check",
                "",
                array(
                    "GO_AUTH" => "Y"
                ),
                false
            );

            $request = Application::getInstance()->getContext()->getRequest();
            if ($request->get("b2b_exit"))
            {
                $USER->Authorize($request->getCookie('B2B_USER'));
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