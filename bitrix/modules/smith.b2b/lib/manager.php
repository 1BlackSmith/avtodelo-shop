<?

namespace Smith\B2B;

use \CUser;
use \Bitrix\Main\Config\Option;

use Smith\B2B\CompanyBase;

class Manager extends DataManager
{
    const MODULE_ID = 'smith.b2b';

    protected $managerId;

    public static function getByID($managerId)
    {
        $strUserGroups = (new CUser($managerId))->GetUserGroupString();
        if (Bxstrrpos($strUserGroups, Option::get(self::MODULE_ID, 'B2B_MANAGER_GROUP_ID')) === false)
            return false;

        return new self($managerId);
    }

    public static function getManagers()
    {
        $arManagers = array();

        $arFilter = array(
            'GROUPS_ID' => array(Option::get(self::MODULE_ID, 'B2B_MANAGER_GROUP_ID'))
        );
        $arParams = array('ID', 'NAME', 'LAST_NAME', 'SECOND_NAME');
        $rsManagers = CUser::GetList(($by="id"), ($order="asc"), $arFilter, $arParams);
        while ($arManager = $rsManagers->Fetch()) {
            $arManagers[$arManager['ID']] = $arManager['LAST_NAME'] . ' ' . substr($arManager['NAME'], 0, 1) . substr($arManager['SECOND_NAME'], 0, 1);
        }

        return $arManagers;
    }

    public static function getManagersSelect()
    {
        $arManagers = static::getManagers();
        return array(
            "REFERENCE" => array_values($arManagers),
            "REFERENCE_ID" => array_keys($arManagers),
        );
    }

    public function __construct($managerId)
    {
        $this->managerId = $managerId;
    }

    public function getClientsSelect()
    {
        $values = [];

        $companies = self::getCompaniesObj(
            ['COMPANY_LK_ID' => $this->getClientsIds()], 
            ['ID', 'COMPANY_LK_ID', 'BRAND'],
            ['NAME' => 'ASC']
        );

        foreach ($companies as $company) {
            $companyProfileData = CUser::GetByID($company->getCompanyLkId())->fetch();
            $values[$company->getCompanyLkId()] = array(
                'name' => $companyProfileData['NAME']." ".$companyProfileData['LAST_NAME'],
                'id' => $company->getCompanyLkId(),
            );
        }

        return $values;
    }

    public function getClientsIds()
    {
        $profiles = self::getProfilesObj(['COMPANY_MANAGER_ID' => $this->managerId], ['ID', 'COMPANY_ID']);
        return $profiles->getCompanyIdList();
    }
}