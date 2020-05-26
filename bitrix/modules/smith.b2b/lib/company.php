<?

namespace Smith\B2B;

use CUser;
use Smith\B2B\Internals\CompanyTable;
use Smith\B2B\Internals\CompanyPropTable;
use Smith\B2B\Internals\CompanyStoreTable;
use Smith\B2B\Internals\ManagerForStoreTable;

class Company
{
    protected $id = null;
    protected $profileID = null;
    protected $directID = null;
    protected $managerID = null;

    protected $arCompanies = array();

    protected $errors = array();

    public function __construct($sets) 
    {
        if (empty($sets))
            return false;

        $this->id = $sets['ID'];
        $this->directID = $sets['DIRECT_ID'];
        $this->managerID = $sets['MANAGER_ID'];
        $this->arCompanies = $sets['COMPANIES'];

        if (!empty($sets['PROFILE_ID'])) {
            $this->profileID = $sets['PROFILE_ID'];
        } else {
            $this->profileID = $this->getProfileID();
        }
    }

    public static function getByID($userID)
    {
        $profile = CompanyTable::getRow(array(
            'filter' => array('=COMPANY_ID' => $userID),
            'order' => array('ID')
        ));

        if (empty($profile))
            return false;

        $companies = CompanyPropTable::getList(array(
            'select' => array('*'),
            'filter' => array('=COMPANY_LK_ID' => $userID),
            'order' => array('ID')
        ))->fetchAll();

        foreach ($companies as &$company) {
            $company['STORES'] = CompanyStoreTable::getList(array(
                'select' => array('*'),
                'filter' => array('=COMPANY_ID' => $company['ID']),
                'order' => array('ID')
            ))->fetchAll();


            foreach ($company['STORES'] as &$store) {
                $managers = ManagerForStoreTable::getList(array(
                    'select' => array('USER_ID'),
                    'filter' => array('=STORE_ID' => $store['ID']),
                    'order' => array('ID')
                ))->fetchAll();

                foreach ($managers as $manager) {
                    $store['MANAGERS'][] = $manager['USER_ID'];
                }
            }
        }

        $res = array(
            'ID' => $userID,
            'PROFILE_ID' => $profile['ID'],
            'DIRECT_ID'  => $profile['COMPANY_USER_ID'],
            'MANAGER_ID' => $profile['COMPANY_MANAGER_ID'],
            'COMPANIES'  => $companies
        );

        return new self($res);
    }

    public static function getCompanyProps()
    {
        return array('INN', 'NAME', 'OGRN', 'KPP', 'ADDRESS');
    }

    public function getProfile()
    {
        return array(
            'DIRECT_ID'  => $this->directID,
            'MANAGER_ID' => $this->managerID
        );
    }

    public function getCompanies()
    {
        return $this->arCompanies;
    }

    public function getCompanyName()
    {
        return $this->arCompanies[0]['NAME'];
    }

    public function getStores()
    {
        $company = $this->arCompanies[0];
        $stores = array();

        foreach ($company['STORES'] as $store) {
            $stores[$store['ID']] = $store['ADDRESS'];
        }

        return $stores;
    }

    public function getStoresData()
    {
        $company = $this->arCompanies[0];
        $stores = array();

        foreach ($company['STORES'] as $store) {
            $stores[$store['ID']] = $store;
        }

        return $stores;
    }

    public function getStoreAddress($id)
    {
        $company = $this->arCompanies[0];

        foreach ($company['STORES'] as $store) {
            if ($store['ID'] === $id) {
                return $store['ADDRESS'];
            }
        }

        return false;
    }

    public function getManagers()
    {
        $managers = array();
        $company = $this->arCompanies[0];

        foreach ($company['STORES'] as $store) {
            foreach ($store['MANAGERS'] as $mID) {
                $managers[] = array(
                    'ID' => $mID, 
                    'ADDRESS' => $store['ADDRESS'],
                    'STORE_ID' => $store['ID']
                );
            }
        }

        return $managers;
    }

    public function add()
    {
        $this->addProfile();
        $this->addCompanies();
        $this->addStores();

        return $this->getErrors();
    }

    public function change($data)
    {
        if (!$this->profileID) 
            return false;

        $this->changeProfile($data);
        $this->changeCompanies($data['COMPANIES']);

        return $this->getErrors();
    }

    public function delete()
    {
        $this->deleteProfile();
        $this->deleteCompanies();

        $this->id = null;
        $this->profileID = null;
        $this->directID = null;
        $this->managerID = null;
        $this->arCompanies = null;

        return $this->getErrors();
    }

    protected function addProfile()
    {
        $result = CompanyTable::add(array(
            'COMPANY_ID'         => $this->id,
            'COMPANY_USER_ID'    => $this->directID,
            'COMPANY_MANAGER_ID' => $this->managerID
        ));
        if (!$result->isSuccess()) {
            $this->errors[] = $result->getErrorMessages();
        }
    }

    protected function addCompanies()
    {
        foreach ($this->arCompanies as &$company) {
            $result = CompanyPropTable::add(array(
                'COMPANY_LK_ID'  => $this->id,
                'OWNERSHIP_TYPE' => $company['OWNERSHIP_TYPE'],
                'NAME'           => $company['NAME'],
                'BRAND'          => $company['BRAND'],
                'OGRN'           => $company['OGRN'],
                'INN'            => $company['INN'],
                'KPP'            => $company['KPP'],
                'ADDRESS'        => $company['ADDRESS']
            ));
            if ($result->isSuccess()) {
                $company['ID'] = $result->getId();
            } else {
                $this->errors[] = $result->getErrorMessages();
            }
        }
    }

    protected function addStores()
    {
        foreach ($this->arCompanies as $company) {
            foreach ($company['STORES'] as $store) {
                $this->addStore($store, $company['ID']);
            }
        }
    }

    protected function addStore($data, $companyID)
    {
        $result = CompanyStoreTable::add(array(
            'COMPANY_ID' => $companyID,
            'ADDRESS'    => $data['ADDRESS'],
            'NAME'       => $data['NAME'],
            'PHONE'      => $data['PHONE'] ? $data['PHONE'] : 'null',
            'EMAIL'      => $data['EMAIL'] ? $data['PHONE'] : 'null'
        ));
        if (!$result->isSuccess()) {
            $this->errors[] = $result->getErrorMessages();
        }
    }

    public function addManager($managerID, $storesID)
    {
        foreach ($storesID as $storeID) {
            $result = ManagerForStoreTable::add(array(
                'STORE_ID' => $storeID,
                'USER_ID' => $managerID
            ));
            if (!$result->isSuccess()) {
                $this->errors[] = $result->getErrorMessages();
            }
        }

        return $this->getErrors();
    }

    protected function addManagerStore($managerID, $storeID)
    {
        $result = ManagerForStoreTable::add(array(
            'STORE_ID' => $storeID,
            'USER_ID' => $managerID
        ));
        if (!$result->isSuccess()) {
            $this->errors[] = $result->getErrorMessages();
        }
    }

    protected function changeProfile($data)
    {
        $result = CompanyTable::update($this->profileID, array(
            'COMPANY_USER_ID'    => $data['DIRECT_ID'],
            'COMPANY_MANAGER_ID' => $data['MANAGER_ID']
        ));
        if (!$result->isSuccess()) {
            $this->errors[] = $result->getErrorMessages();
        }
    }

    protected function changeCompanies($companies)
    {
        foreach ($companies as $company) {
            $result = CompanyPropTable::update($company['ID'], array(
                'OWNERSHIP_TYPE' => $company['OWNERSHIP_TYPE'],
                'NAME'           => $company['NAME'],
                'BRAND'          => $company['BRAND'],
                'INN'            => $company['INN'],
                'OGRN'           => $company['OGRN'],
                'KPP'            => $company['KPP'],
                'ADDRESS'        => $company['ADDRESS']
            ));
            if (!$result->isSuccess()) {
                $this->errors[] = $result->getErrorMessages();
            }

            foreach ($company['STORES'] as $store) {
                if ($store['ID']) {
                    $this->changeStore($store);
                } else {
                    $this->addStore($store, $company['ID']);
                }
            }
        }
    }

    protected function changeStore($data)
    {
        $result = CompanyStoreTable::update($data['ID'], array(
            'ADDRESS' => $data['ADDRESS'],
            'NAME'    => $data['NAME'],
            'PHONE'   => $data['PHONE'] ? $data['PHONE'] : 'null',
            'EMAIL'   => $data['EMAIL'] ? $data['PHONE'] : 'null'
        ));
        if (!$result->isSuccess()) {
            $this->errors[] = $result->getErrorMessages();
        }
    }

    public function changeManagerStores($userID, $storesID)
    {
        $storeExists = array();
        $allManagerStores = ManagerForStoreTable::getList(array(
            'select' => array('ID', 'STORE_ID'),
            'filter' => array('=USER_ID' => $userID)
        ))->fetchAll();

        foreach ($allManagerStores as $row) {
            if (!in_array($row['STORE_ID'], $storesID)) {
                $this->deleteManagerStore($row['ID']);
            } else {
                $storeExists[] = $row['STORE_ID'];
            }
        }

        foreach ($storesID as $storeID) {
            if (!in_array($storeID, $storeExists)) {
                $this->addManagerStore($userID, $storeID);
            }
        }

        return $this->getErrors();
    }

    protected function deleteProfile()
    {
        $result = CompanyTable::delete($this->profileID);
        if (!$result->isSuccess()) {
            $this->errors[] = $result->getErrorMessages();
        }
    }

    protected function deleteCompanies()
    {   
        foreach ($this->arCompanies as $company) {
            foreach ($company['STORES'] as $store) {
                self::deleteStore($store['ID']);
            }
            
            $result = CompanyPropTable::delete($company['ID']);
            if (!$result->isSuccess()) {
                $this->errors[] = $result->getErrorMessages();
            }
        }
    }

    protected function deleteManagerStore($rowID)
    {
        $result = ManagerForStoreTable::delete($rowID);
        if (!$result->isSuccess()) {
            $this->errors[] = $result->getErrorMessages();
        }
    }

    public function deleteManager($userID)
    {
        $list = ManagerForStoreTable::getList(array(
            'select' => array('ID'),
            'filter' => array('=USER_ID' => $userID)
        ))->fetchAll();

        foreach ($list as $row) {
            $this->deleteManagerStore($row['ID']);
        }

        return $this->getErrors();
    }

    public static function deleteStore($id)
    {
        $managers = ManagerForStoreTable::getList(array(
            'select' => array('ID'),
            'filter' => array('=STORE_ID' => $id)
        ))->fetchAll();

        foreach ($managers as $managerID) {
            ManagerForStoreTable::delete($managerID);
        }

        $result = CompanyStoreTable::delete($id);

        return $result;
    }

    protected function getProfileID()
    {
        return CompanyTable::getRow(array(
            'select' => array('ID'),
            'filter' => array('=COMPANY_ID' => $this->id),
            'order' => array('ID')
        ))['ID'];
    }

    protected function getErrors()
    {
        if (empty($this->errors)) {
            return true;
        } else {
            return $this->errors;
        }
    }
}