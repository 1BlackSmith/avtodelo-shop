<?php
namespace Smith\B2B;

use Bitrix\Main\Entity;

use Smith\B2B\Internals\CompanyTable;
use Smith\B2B\Internals\CompanyPropTable;
use Smith\B2B\Internals\CompanyStoreTable;
use Smith\B2B\Internals\ManagerForStoreTable;
use Smith\B2B\Internals\TradeAgreementGroupTable;
use Smith\B2B\Internals\TradeAgreementIndividualTable;

use Smith\B2B\Internals\Profile;
use Smith\B2B\Internals\CompanyProp;
use Smith\B2B\Internals\CompanyStore;
use Smith\B2B\Internals\CompanyStores;
use Smith\B2B\Internals\ManagerForStore;
use Smith\B2B\Internals\ManagerForStores;
use Smith\B2B\Internals\TradeAgreementGroup;
use Smith\B2B\Internals\TradeAgreementsGroup;
use Smith\B2B\Internals\TradeAgreementIndividual;
use Smith\B2B\Internals\TradeAgreementsIndividual;

class DataManager 
{
    protected static function getProfileObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(CompanyTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        $q->setLimit(1);
        return $q->exec()->fetchObject();
    }

    protected static function getProfilesObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(CompanyTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        return $q->exec()->fetchCollection();
    }

    protected static function getCompanyObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(CompanyPropTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        $q->setLimit(1);
        return $q->exec()->fetchObject();
    }

    protected static function getCompaniesObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(CompanyPropTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        return $q->exec()->fetchCollection();
    }

    protected static function getStoresObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(CompanyStoreTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        return $q->exec()->fetchCollection();
    }

    protected static function getEmployeesObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(ManagerForStoreTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        return $q->exec()->fetchCollection();
    }

    protected static function getTradeAgreementGroupObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(TradeAgreementGroupTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        $q->setLimit(1);
        return $q->exec()->fetchObject();
    }

    protected static function getTradeAgreementsGroupObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(TradeAgreementGroupTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        return $q->exec()->fetchCollection();
    }

    protected static function getTradeAgreementIndividualObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(TradeAgreementIndividualTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        $q->setLimit(1);
        return $q->exec()->fetchObject();
    }

    protected static function getTradeAgreementsIndividualObj($filter, $select = ['*'])
    {
        $q = new Entity\Query(TradeAgreementIndividualTable::getEntity());
        $q->setSelect($select);
        $q->setFilter($filter);
        return $q->exec()->fetchCollection();
    }

    protected static function addProfile($companyId, $directId, $managerId)
    {
        $profile = (new Profile)
            ->setCompanyId($companyId)
            ->setCompanyUserId($directId)
            ->setCompanyManagerId($managerId);

        return static::saveObj($profile);
    }

    protected static function addCompany($companyId, $companyData)
    {
        $company = (new CompanyProp)
            ->setCompanyLkId($companyId)
            ->setOwnershipType($companyData['OWNERSHIP_TYPE'])
            ->setName($companyData['NAME'])
            ->setBrand($companyData['BRAND'])
            ->setInn($companyData['INN'])
            ->setOgrn($companyData['OGRN'])
            ->setKpp($companyData['KPP'])
            ->setAddress($companyData['ADDRESS']);

        return static::saveObj($company);
    }

    protected static function addStores($companyId, $storesData, $save = true)
    {
        $stores = new CompanyStores;
        foreach ($storesData as $storeData) {
            $stores[] = static::addStore($companyId, $storeData, false);
        }

        if ($save) {
            return static::saveObj($stores);
        }

        return $stores;
    }

    protected static function addStore($companyId, $storeData, $save = true)
    {
        $store = (new CompanyStore)
            ->setCompanyId($companyId)
            ->setName($storeData['NAME'])
            ->setAddress($storeData['ADDRESS'])
            ->setPhone($storeData['PHONE'] ? $storeData['PHONE'] : 'null')
            ->setEmail($storeData['EMAIL'] ? $storeData['EMAIL'] : 'null');

        if ($save) {
            return static::saveObj($store);
        }

        return $store;
    }

    protected static function addEmployee($employeeId, $storeId, $save = true)
    {
        $employee = (new ManagerForStore)
            ->setUserId($employeeId)
            ->setStoreId($storeId);

        if ($save) {
            return static::saveObj($employee);
        }

        return $employee;
    }

    protected static function addStoresForEmployee($employeeId, $storesId, $save = true)
    {
        $employeeStores = new ManagerForStores;
        foreach ($storesId as $storeId) {
            $employeeStores[] = static::addEmployee($employeeId, $storeId, false);
        }

        if ($save) {
            return static::saveObj($employeeStores);
        }

        return $employeeStores;
    }

    protected static function addTradeAgreementGroup($companyId, $data, $save = true)
    {
        $agreement = (new TradeAgreementGroup)
            ->setCompany($companyId)
            ->setCatalogGroup($data['CATALOG_GROUP_ID'])
            ->setPriceGroup($data['PRICE_GROUP_ID'])
            ->setBegin($data['DATE_BEGIN'])
            ->setEnd($data['DATE_END']);

        if ($save) {
            return static::saveObj($agreement);
        }
        
        return $agreement;

    }

    protected static function addTradeAgreementsGroup($companyId, $arData, $save = true)
    {
        $agreements = new TradeAgreementsGroup;
        foreach ($arData as $data) {
            $agreements[] = static::addTradeAgreementGroup($companyId, $data, false);
        }

        if ($save) {
            return static::saveObj($agreements);
        }
        
        return $agreement;
    }

    protected static function addTradeAgreementIndividual($companyId, $data, $save = true)
    {
        $agreement = (new TradeAgreementIndividual)
            ->setCompany($companyId)
            ->setProduct($data['PRODUCT'])
            ->setPrice($data['PRICE'])
            ->setCurrency($data['CURRENCY'])
            ->setBegin($data['BEGIN'])
            ->setEnd($data['END']);

        if ($save) {
            return static::saveObj($agreement);
        }

        return $agreement;
    }

    protected static function addTradeAgreementsIndividual($companyId, $arData, $save = true)
    {
        $agreements = new TradeAgreementsIndividual;
        foreach ($arData as $data) {
            $agreements[] = static::addTradeAgreementIndividual($companyId, $data, false);
        }

        if ($save) {
            return static::saveObj($agreements);
        }
        
        return $agreement;
    }

    protected static function changeProfile(Profile $profile, $data)
    {
        foreach ($data as $k => $v) {
            switch ($k) {
                case 'DIRECT_ID':
                    $profile->setCompanyUserId($v);
                    break;
                case 'MANAGER_ID':
                    $profile->setCompanyManagerId($v);
                    break;
            }
        }

        return static::saveObj($profile);
    }

    protected static function changeCompany(CompanyProp $company, $data)
    {
        foreach ($data as $k => $v) {
            switch ($k) {
                case 'OWNERSHIP_TYPE':
                    $company->setOwnershipType($v);
                    break;
                case 'NAME':
                    $company->setName($v);
                    break;
                case 'BRAND':
                    $company->setBrand($v);
                    break;
                case 'INN':
                    $company->setInn($v);
                    break;
                case 'OGRN':
                    $company->setOgrn($v);
                    break;
                case 'KPP':
                    $company->setKpp($v);
                    break;
                case 'ADDRESS':
                    $company->setAddress($v);
                    break;
            }
        }

        return static::saveObj($company);
    }

    protected static function changeStore(CompanyStore $store, $data, $save = true)
    {
        foreach ($data as $k => $v) {
            switch ($k) {
                case 'ADDRESS':
                    $store->setAddress($v);
                    break;
                case 'NAME':
                    $store->setName($v);
                    break;
                case 'PHONE':
                    $store->setPhone($v);
                    break;
                case 'EMAIL':
                    $store->setEmail($v);
                    break;
            }
        }

        if ($save) {
            return static::saveObj($store);
        }

        return $store;
    }

    protected static function changeTradeAgreementGroup(TradeAgreementGroup $agreementGroup, $data, $save = true) 
    {
        foreach ($data as $k => $v) {
            switch ($k) {
                case 'CATALOG_GROUP_ID':
                    $agreementGroup->setCatalogGroup($v);
                    break;
                case 'PRICE_GROUP_ID':
                    $agreementGroup->setPriceGroup($v);
                    break;
                case 'DATE_BEGIN':
                    $agreementGroup->setBegin($v);
                    break;
                case 'DATE_END':
                    $agreementGroup->setEnd($v);
                    break;
            }
        }

        if ($save) {
            return static::saveObj($agreementGroup);
        }

        return $agreementGroup;
    }

    protected static function changeTradeAgreementIndividual(TradeAgreementIndividual $agreement, $data, $save = true) 
    {
        foreach ($data as $k => $v) {
            switch ($k) {
                case 'PRODUCT':
                    $agreement->setProduct($v);
                    break;
                case 'PRICE':
                    $agreement->setPrice($v);
                    break;
                case 'CURRENCY':
                    $agreement->setCurrency($v);
                    break;
                case 'BEGIN':
                    $agreement->setBegin($v);
                    break;
                case 'END':
                    $agreement->setEnd($v);
                    break;
            }
        }

        if ($save) {
            return static::saveObj($agreement);
        }

        return $agreement;
    }

    protected static function deleteProfile($profile)
    {
        if (is_numeric($profile)) {
            $profileObj = static::getProfileObj(['COMPANY_ID' => $profile]);
            return static::deleteObj($profileObj);
        } elseif ($profile instanceof Profile) {
            return static::deleteObj($profile);
        } else {
            return false;
        }
    }

    protected static function deleteCompany($company)
    {
        if (is_numeric($company)) {
            $companyObj = static::getCompanyObj(['COMPANY_LK_ID' => $company]);
            return static::deleteObj($companyObj);
        } elseif ($company instanceof CompanyProp) {
            return static::deleteObj($company);
        } else {
            return false;
        }
    }

    protected static function deleteStore($store)
    {
        if (is_numeric($store)) {
            $storeObj = CompanyStoreTable::getByPrimary($store)->fetchObject();
            return static::deleteObj($storeObj);
        } elseif ($store instanceof CompanyStore) {
            return static::deleteObj($store);
        } else {
            return false;
        }
    }

    protected static function deleteStores($stores)
    {
        if (is_array($stores)) {
            $storesObj = static::getStoresObj(['ID' => $stores]);
            foreach ($storesObj as $store) {
                static::deleteObj($store);
            }
        } elseif ($stores instanceof CompanyStores) {
            foreach ($stores as $store) {
                static::deleteObj($store);
            }
        } else {
            return false;
        }
    }

    protected static function deleteEmployee($employeeId)
    {
        $employee = static::getEmployeesObj(['USER_ID' => $employeeId]);
        return static::deleteObj($employee);
    }

    protected static function deleteEmployees($employees)
    {
        if (is_array($employees)) {
            $employeesObj = static::getStoresObj(['ID' => $employees]);
            foreach ($employees as $employee) {
                static::deleteObj($employee);
            }
        } elseif ($employees instanceof ManagerForStores) {
            foreach ($employees as $employee) {
                static::deleteObj($employee);
            }
        } else {
            return false;
        }
    }

    protected static function deleteEmployeeStores($employeeId, $storesId)
    {
        $employeeStores = static::getEmployeesObj([
            'USER_ID' => $employeeId,
            'STORE_ID' => $storeId
        ]);
        return static::deleteObj($employeeStores);
    }

    protected static function deleteTradeAgreementGroup($agreement)
    {
        if (is_numeric($agreement)) {
            $agreementObj = static::getTradeAgreementGroupObj(['ID' => $agreement]);
            return static::deleteObj($agreementObj);
        } elseif ($agreement instanceof TradeAgreementGroup) {
            return static::deleteObj($agreement);
        } else {
            return false;
        }
    }

    protected static function deleteTradeAgreementsGroup($companies)
    {
        if (is_array($companies)) {
            $companiesObj = static::getTradeAgreementsGroupObj(['ID' => $companies]);
            return static::deleteObj($companiesObj);
        } elseif ($companies instanceof TradeAgreementsGroup) {
            return static::deleteObj($companies);
        } else {
            return false;
        }
    }

    protected static function deleteTradeAgreementIndividual($company)
    {
        if (is_numeric($company)) {
            $companyObj = static::getTradeAgreementIndividualObj(['ID' => $company]);
            return static::deleteObj($companyObj);
        } elseif ($company instanceof TradeAgreementIndividual) {
            return static::deleteObj($company);
        } else {
            return false;
        }
    }

    protected static function deleteTradeAgreementsIndividual($companies)
    {
        if (is_array($companies)) {
            $companiesObj = static::getTradeAgreementsIndividualObj(['ID' => $companies]);
            return static::deleteObj($companiesObj);
        } elseif ($companies instanceof TradeAgreementsIndividual) {
            return static::deleteObj($companies);
        } else {
            return false;
        }
    }

    protected static function saveObj($obj)
    {
        $result = $obj->save();
        if (!$result->isSuccess()) {
            return $result->getErrorMessages();
        }

        return $obj;
    }

    protected static function deleteObj($obj)
    {
        $result = $obj->delete();
        if (!$result->isSuccess()) {
            return $result->getErrorMessages();
        }

        return $obj;
    }
}
?>