<?
namespace Smith\Tuning;

use \COption;

use \Bitrix\Main\Application;
use \Bitrix\Main\Loader;

use \Smith\B2B\Manager;

class BasketMod extends BasketModBase
{
    function __construct() 
    {
        global $APPLICATION;
        global $USER;
        $this->request = Application::getInstance()->getContext()->getRequest();

        Loader::includeModule('smith.bonusengine');

        $clientId = $APPLICATION->get_cookie("B2B_CLIENT_ID", COption::GetOptionString("main", "cookie_name", "BITRIX_SM"));
        if (Manager::getByID($USER->GetID()) && $clientId && $clientId !== 'self')
        {
            $this->clientId = $clientId;
        }
        
        if (!$this->request->isPost() || $this->request->get('action') == 'BUY') {
            $this->inicialLoadAction();
        }

        if ($this->request->get('basketAction') == 'recalculateAjax') {
            $this->recalculateAjaxAction($this->request->get('basket'));
        }
    }
}