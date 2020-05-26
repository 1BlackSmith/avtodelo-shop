<?

namespace Smith\B2B;

use \CUser;
use \Bitrix\Main\Config\Option;

use Smith\B2B\CompanyBase;

class Manager extends DataManager
{
    const MANAGERS = [
        108 => 'Потапов ДН',
        98 => 'Куликова ЕН',
        100 => 'Козьяков РН',
        101 => 'Титов АА',
        33 => 'Кузнецов ПК',
        96 => 'Потапова НВ',
        99 => 'Савоськин АВ'
    ];
    const MODULE_ID = 'smith.b2b';

    protected $managerId;

    public static function getByID($managerId)
    {
        $strUserGroups = (new CUser($managerId))->GetUserGroupString();
        if (Bxstrrpos($strUserGroups, Option::get(self::MODULE_ID, 'B2B_MANAGER_GROUP_ID')) === false)
            return false;

        return new self($managerId);
    }

    public function __construct($managerId)
    {
        $this->managerId = $managerId;
    }

    public function getClientsSelect()
    {
        $values = [
            "REFERENCE" => array("Оформить на себя"), 
            "REFERENCE_ID" => array('self')
        ];

        $companies = self::getCompaniesObj(['COMPANY_LK_ID' => $this->getClientsIds()], ['ID', 'COMPANY_LK_ID', 'BRAND']);
        foreach ($companies as $company) {
            $companyProfileData = CUser::GetByID($company->getCompanyLkId())->fetch();
            $values['REFERENCE'][] = $companyProfileData['NAME']." ".$companyProfileData['LAST_NAME'];
            $values['REFERENCE_ID'][] = $company->getCompanyLkId();
        }

        return $values;
    }

    public function getClientsIds()
    {
        $profiles = self::getProfilesObj(['COMPANY_MANAGER_ID' => $this->managerId], ['ID', 'COMPANY_ID']);
        return $profiles->getCompanyIdList();
    }
}