<?

namespace Smith\B2B;

use \Bitrix\Main\Config\Option;
use \Bitrix\Main\UserGroupTable;

use Smith\B2B\Internals\CompanyTable;
use Smith\B2B\Internals\CompanyPropTable;
use Smith\B2B\Internals\CompanyStoreTable;
use Smith\B2B\Internals\ManagerForStoreTable;

class Rights
{
    protected $userID;
    protected $companyID = 0;
    protected $companiesID = array();

    const RIGHTS_NONE = 0;
    const RIGHTS_DIRECTOR = 1;
    const RIGHTS_MANAGER = 2;
    const RIGHTS_EMPLOEE = 3;

    public function __construct($userID = 0)
    {
        $this->userID = $userID;
    }

    public function getRights()
    {
        if ($this->checkDirector()) {
            return array($this->companyID, self::RIGHTS_DIRECTOR);
        }

        // Пока не нужно (менеджер не должен заходить в личный кабинет)
        // if ($this->checkManager()) {
        //     return array($this->companyID, self::RIGHTS_MANAGER);
        // }

        // Пока работает только с одной компанией
        if ($this->checkEmploee()) {
            return array($this->companiesID[0], self::RIGHTS_MANAGER);
        }

        return array(0, self::RIGHTS_NONE);
    }

    public static function isCompanyAuth()
    {
        global $USER;

        return self::hasUserGroup($USER->GetID(), Option::get('smith.b2b', 'B2B_GROUP_ID'));
    }

    public static function isCompany($userId)
    {
        return self::hasUserGroup($userId, Option::get('smith.b2b', 'B2B_MANAGER_ORDER_GROUP_ID'));
    }

    protected static function hasUserGroup($userId, $groupId)
    {
        $res = UserGroupTable::getRow(array(
            'select' => array('*'),
            'filter' => array('=USER_ID' => $userId, '=GROUP_ID' => $groupId)
        ));

        if (!empty($res)) {
            return true;
        }

        return false;
    }

    protected function checkDirector()
    {
        $companyID = CompanyTable::getRow(array(
            'select' => array('COMPANY_ID'),
            'filter' => array('=COMPANY_USER_ID' => $this->userID)
        ))['COMPANY_ID'];

        if ($companyID > 0) {
            $this->companyID = $companyID;
            return true;
        }

        return false;
    }

    protected function checkManager()
    {
        $companyID = CompanyTable::getRow(array(
            'select' => array('COMPANY_ID'),
            'filter' => array('=COMPANY_MANAGER_ID' => $this->userID)
        ))['COMPANY_ID'];

        if ($companyID > 0) {
            $this->companyID = $companyID;
            return true;
        }

        return false;
    }

    protected function checkEmploee()
    {
        $storesIDs = ManagerForStoreTable::getList(array(
            'select' => array('STORE_ID'),
            'filter' => array('=USER_ID' => $this->useID)
        ))->fetchAll();

        if (count($storesIDs)) {
            foreach ($storesIDs as $id) {
                $companyPropID = CompanyStoreTable::getRow(array(
                    'select' => array('COMPANY_ID'),
                    'filter' => array('=ID' => $id)
                ))['COMPANY_ID'];

                $this->companiesID[] = CompanyPropTable::getRow(array(
                    'select' => array('COMPANY_LK_ID'),
                    'filter' => array('=ID' => $companyPropID)
                ))['COMPANY_LK_ID'];
            }

            return true;
        }

        return false;
    }
}