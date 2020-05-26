<?

use Smith\CImport\DataHandler,
    Smith\B2B\Company;

class CompaniesImport
{
    protected $headers = array();
    protected $data = array();

    protected $companyIdField;
    protected $companyFields;
    protected $companyStoreFeilds;

    protected $addNewOrgs;
    protected $removeOrgs;

    protected $childMarker;

    const ORG_FIELDS = array(
        'ID'             => 'ID',
        'OWNERSHIP_TYPE' => 'Форма собственности',
        'NAME'           => 'Наименование',
        'BRAND'          => 'Бренд',
        'INN'            => 'ИНН',
        'OGRN'           => 'ОГРН / ОГРНИП',
        'KPP'            => 'КПП',
        'ADDRESS'        => 'Юр. адрес',
        'DIRECT_ID'      => 'ID директора',
        'MANAGER_ID'     => 'Менеджер',
        'GROUP'          => 'Группа'
    );

    const ORG_STORE_FIELDS = array(
        'ADDRESS' => 'Адрес ТТ',
        'NAME'    => 'Название ТТ',
        'PHONE'   => 'Телефон ТТ',
        'EMAIL'   => 'E-mail ТТ'
    );

    const ORG_STORE_FIELD = 'STORES';

    const ACTION_CHANGE = 'CHANGE';
    const ACTION_ADD = 'ADD';


    public function __construct($sets = array())
    {
        $this->companyIdField = $sets['ORG_ID_FIELD'] ? $sets['ORG_ID_FIELD'] : 'ID';

        $this->companyFields = $sets['ORG_FIELDS'] ? $sets['ORG_FIELDS'] : self::ORG_FIELDS;

        $this->companyStoreFeilds = $sets['ORG_STORE_FIELDS'] ? $sets['ORG_STORE_FIELDS'] : self::ORG_STORE_FIELDS;

        $this->addNewOrgs = $sets['ADD_NEW_ORGS'] ? $sets['ADD_NEW_ORGS'] : false;

        $this->removeOrgs = $sets['REMOVE_ORGS'] ? $sets['REMOVE_ORGS'] : false;

        $this->childMarker = $sets['CHILD_MARKER'] ? $sets['CHILD_MARKER'] : 'R';
    }

    public function runImport()
    {
        $this->loadFormatedData();

        foreach ($this->data as $profile) {
            if ($profile['ACTION'] == self::ACTION_CHANGE) {
                $sendData = array(
                    'DIRECT_ID'  => $profile['DIRECT_ID'],
                    'MANAGER_ID' => $profile['MANAGER_ID'],
                    'COMPANIES'  => $profile['COMPANIES']
                );

                $res = Company::getByID($profile['ID'])->changeData($sendData);
            }
        }
    }

    protected function loadFormatedData()
    {
        $data = $this->getData();

        if (is_array($data)) {
            $companies = array();
            foreach ($data as $k => $r) {
                if ($this->hasOrgFields($r)) {
                    $company = $this->getOrg($r);
                    $company[self::ORG_STORE_FIELD][] = $this->getStore($r);
                    $companies[] = $company;
                } else {
                    $companies[count($companies) - 1][self::ORG_STORE_FIELD][] = $this->getStore($r); 
                }
            }

            foreach ($companies as $company) {
                $companyId = $company[$this->companyIdField];
                unset($company[$this->companyIdField]);

                $directId = $company['DIRECT_ID'];
                uset($company['DIRECT_ID']);

                $managerId = $company['MANAGER_ID'];
                uset($company['MANAGER_ID']);

                if ($companyId !== $this->childMarker) {
                    $this->data[] = array(
                        'ACTION'     => is_numeric($companyId) ? self::ACTION_CHANGE : self::ACTION_ADD,
                        'ID'         => is_numeric($companyId) ? $companyId : false,
                        'DIRECT_ID'  => $directId,
                        'MANAGER_ID' => $managerId,
                        'COMPANIES'  => array($company)
                    );
                } else {
                    $this->data[$this->getDataLastRow()]['COMPANIES'][] = $company;
                }
            }

            return true;
        }

        return $data;
    }

    protected function hasOrgFields($row)
    {
        foreach ($this->companyFields as $fieldName) {
            if (!empty($row[$fieldName]))
                return true;
        }

        return false;
    }

    protected function hasOrgStoreFields($row)
    {
        foreach ($this->companyStoreFeilds as $fieldName) {
            if (!empty($row[$fieldName]))
                return true;
        }

        return false;
    }

    protected function getOrg($row)
    {
        $company = array();

        foreach ($this->companyFields as $fieldKey => $fieldName) {
            $company[$fieldKey] = $row[$fieldName];
        }

        return $company;
    }

    protected function getStore($row)
    {
        $store = array();

        foreach ($this->companyStoreFeilds as $fieldKey => $fieldName) {
            $store[$fieldKey] = $row[$fieldName];
        }

        return $store;
    }

    protected function getData()
    {
        $handler = new DataHandler();
        $xlsxData = $handler->readXLSXFile();
        $rows = array();

        if (is_array($xlsxData)) {
            foreach ($xlsxData as $k => $r) {
                if ($k === 0) {
                    $this->headers = $r;
                    continue;
                }

                $rows[] = array_combine($this->headers, $r);
            }

            return $rows;
        }

        return $xlsxData;
    }

    protected function getDataLastRow()
    {
        return count($this->data) - 1;
    }
}