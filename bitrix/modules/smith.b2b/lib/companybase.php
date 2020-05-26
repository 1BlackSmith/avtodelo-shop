<?php
namespace Smith\B2B;

use \CUser;
use \Bitrix\Main\ORM\Objectify\Values;

use Smith\B2B\Internals\Profile;
use Smith\B2B\Internals\CompanyProp;
use Smith\B2B\Internals\CompanyStores;
use Smith\B2B\Internals\ManagerForStores;
use Smith\B2B\Internals\TradeAgreementsGroup;
use Smith\B2B\Internals\TradeAgreementsIndividual;

class CompanyBase extends DataManager
{
    protected $profileId;
    protected $profile;
    protected $company;
    protected $stores;
    protected $employees;
    protected $groupAgreements;
    protected $individualAgreements;

    protected $errors = null;

    const COMPANY_PROPS = ['INN', 'NAME', 'OGRN', 'KPP', 'ADDRESS'];

    public static function getByID($id = 0)
    {
        if ($res = static::getData($id)) {
            list($profile, $company, $stores, $employees, $groupAgreements, $individualAgreements) = $res;

            $sets = array(
                'profile_id' => $id,
                'profile' => $profile,
                'company' => $company,
                'stores' => $stores,
                'employees' => $employees,
                'group_agreements' => $groupAgreements,
                'individual_agreements' => $individualAgreements
            );

            return new self($sets);
        }

        return false;
    }

    protected static function getData($id)
    {
        $profile = static::getProfileObj(['COMPANY_ID' => $id]);

        if ($profile instanceof Profile) {
            $company = static::getCompanyObj(['COMPANY_LK_ID' => $id]);
            if (!$company instanceof CompanyProp)
                return false;
            
            $stores = $company->fillStores();
            $employees = static::getEmployeesObj(['STORE_ID' => $stores->getIdList()]);
            $groupAgreements = static::getTradeAgreementsGroupObj(['COMPANY' => $id]);
            $individualAgreements = static::getTradeAgreementsIndividualObj(['COMPANY' => $id]);

            return [$profile, $company, $stores, $employees, $groupAgreements, $individualAgreements];
        }

        return false;
    }

    public static function add($data)
    {
        $profileId = $data['ID'];

        $profile = static::addProfile($profileId, $data['DIRECT_ID'], $data['MANAGER_ID']);
        $company = static::addCompany($profileId, $data['COMPANIES'][0]);
        $stores = static::addStores($company->getId(), $data['COMPANIES'][0]['STORES']);
        $groupAgreements = static::addTradeAgreementsGroup($profileId, $data['AGREEMENT_GROUPS']);
        $individualAgreements = static::addTradeAgreementsIndividual($profileId, $data['AGREEMENT_INDIVIDUAL']);

        $sets = array(
            'profile_id' => $profileId,
            'profile' => $profile,
            'company' => $company,
            'stores' => $stores,
            'group_agreements' => $groupAgreements,
            'individual_agreements' => $individualAgreements
        );

        return new self($sets);
    }

    public function __construct($sets) 
    {
        if (empty($sets))
            return false;

        // if (!$sets['profile'] instanceof Profile ||
        //     !$sets['company'] instanceof CompanyProp ||
        //     !$sets['stores'] instanceof CompanyStores ||
        //     !$sets['employees'] instanceof ManagerForStores || 
        //     !$sets['group_agreements'] instanceof TradeAgreementsGroup)
        //     return false;

        $this->profileId = $sets['profile_id'];
        $this->profile = $sets['profile'];
        $this->company = $sets['company'];
        $this->stores = $sets['stores'];
        $this->employees = $sets['employees'];
        $this->groupAgreements = $sets['group_agreements'];
        $this->individualAgreements = $sets['individual_agreements'];
    }

    public function change($data)
    {
        static::changeProfile($this->profile, $data);
        static::changeCompany($this->company, $data['COMPANIES'][0]);
        static::changeStores($this->stores, $data['COMPANIES'][0]['STORES']);
        //static::addTradeAgreementsGroup($profileId, $data['AGREEMENT_GROUPS']);
        //static::addTradeAgreementsIndividual($profileId, $data['AGREEMENT_INDIVIDUAL']);
    }

    protected function changeStores(CompanyStores $stores, $data)
    {
        $companyId = $this->company->getId();
        foreach ($data as $storeData) {
            if (!$storeData['ID']) {
                $stores[] = static::addStore($companyId, $storeData, false);
            } elseif ($stores->hasByPrimary($storeData['ID'])) {
                $store = $stores->getByPrimary($storeData['ID']);
                static::changeStore($store, $storeData, false);
            }
        }

        return $stores->save();
    }

    public function delete()
    {
        static::deleteProfile($this->profile);
        static::deleteCompany($this->company);
        static::deleteStores($this->stores);
        static::deleteEmployees($this->employees);
        //static::addTradeAgreementsGroup($profileId);
        //static::addTradeAgreementsIndividual($profileId);
    }

    public function getProfile()
    {
        return $this->profile->collectValues(Values::ACTUAL);
    }

    public function getCompany()
    {
        $company = $this->company->collectValues(Values::ACTUAL);
        $company['STORES'] = $this->stores->collectValues(Values::ACTUAL);
        return $company;
    }

    public function getCompanyName()
    {
        return $this->company->getName();
    }

    public function getStores()
    {
        return $this->stores->collectValues(Values::ACTUAL);
    }

    public function getStoreAddress($id)
    {
        if (!$this->hasStore($id))
            return false;

        $store = $this->stores->getByPrimary($id);
        return $store->collectValues(Values::ACTUAL);
    }

    public function getEmployees()
    {
        return $this->employees->collectValues(Values::ACTUAL);
    }

    public function getGroupAgreements()
    {
        return $this->groupAgreements->collectValues(Values::ACTUAL);
    }

    public function hasStore($id)
    {
        return $this->stores->hasByPrimary($id);
    }
}
?>