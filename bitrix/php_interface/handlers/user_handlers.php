<?php

use Bitrix\Main;
use Bitrix\Main\UserTable;
use Bitrix\Main\Application;
use Smith\B2B\Company;

CModule::IncludeModule('smith.b2b');

AddEventHandler(
    'main',
    'OnAdminTabControlBegin',
    [
        'AdminHandler',
        'OnAdminTabControlBegin'
    ]
);

AddEventHandler(
    'main',
    'OnAfterUserAdd',
    [
        'AdminHandler',
        'OnAfterUserAdd'
    ]
);

AddEventHandler(
    'main',
    'OnAfterUserUpdate',
    [
        'AdminHandler',
        'OnAfterUserUpdate'
    ]
);


/*
    0 => [
    *   'ID' => 240,
        'DIRECT_ID' => 123,
        'MANAGER_ID' => 123,
        'COMPANIES' => [
            0 => [
                'OWNERSHIP_TYPE' => 'ИП',
                'NAME' => 'Рога и Ко',
                'BRAND' => 'Рога',
    *           'INN' => 123123,
                'OGRN' => 123123,
                'KPP' => 123123,
                'ADDRESS' => 'адрес',
                'STORES' => [
                    0 => [
    *                   'NAME' => '123123',
                        'ADDRESS' => '123123'
                    ],
                    1 => [
                        'NAME' => '123123',
                        'ADDRESS' => '123123' 
                    ]
                ]
            ]
        ]
    ]
*/


class AdminHandler
{
    public function OnAfterUserAdd(&$arFields)
    {
        if (
            $GLOBALS["APPLICATION"]->GetCurPage() == "/bitrix/admin/user_edit.php" &&
            $_SERVER["REQUEST_METHOD"] == "POST"
        )
        {
            if ($arData = self::getData($arFields))
            {
                $company = new Company($arData);
                $company->add();
            }
        }
    }

    public function OnAfterUserUpdate(&$arFields)
    {
        if (
            $GLOBALS["APPLICATION"]->GetCurPage() == "/bitrix/admin/user_edit.php" &&
            $_SERVER["REQUEST_METHOD"] == "POST"
        )
        {
            if ($arData = self::getData($arFields))
            {
                $request = Application::getInstance()->getContext()->getRequest();
                $userId = $arFields['ID'];
                $company = Company::getByID($userId);
                $company->change($arData);
            }
        }
    }

    protected static function getData($arFields)
    {
        $request = Application::getInstance()->getContext()->getRequest();
        $userData = $request->toArray();

        if (empty($userData['COMPANY_INN']))
            return false;

        return array(
            'ID'         => $arFields['ID'],
            'DIRECT_ID'  => $userData['COMPANY_DIRECT_ID'],
            'MANAGER_ID' => $userData['COMPANY_MANAGER'],
            'COMPANIES'  => 
            array(
                array(
                    'ID'             => $userData['COMPANY_ID'],
                    'OWNERSHIP_TYPE' => $userData['COMPANY_OWNERSHIP_TYPE'],
                    'NAME'           => $userData['COMPANY_NAME'],
                    'BRAND'          => $userData['COMPANY_BRAND'],
                    'INN'            => $userData['COMPANY_INN'],
                    'OGRN'           => $userData['COMPANY_OGRN'],
                    'KPP'            => $userData['COMPANY_KPP'],
                    'ADDRESS'        => $userData['COMPANY_ADDRESS'],
                    'STORES'         => self::getStoresData($request)
                )
            )
        );
    }

    protected static function getStoresData($request)
    {
        $res = array();

        $arIDs = $request->getPost('COMPANY_STORE_ID');
        $arNames = $request->getPost('COMPANY_STORE_NAME');
        $arAddresses = $request->getPost('COMPANY_STORE_ADDRESS');

        foreach ($arAddresses as $k => $v) {
            if (!$v) continue;
            $res[] = array(
                'ID'      => $arIDs[$k] ? $arIDs[$k] : false,
                'NAME'    => $arNames[$k],
                'ADDRESS' => $v
            );
        }
        
        return $res;
    }

    public function OnAdminTabControlBegin(&$form)
    {
        if ($GLOBALS["APPLICATION"]->GetCurPage() == "/bitrix/admin/user_edit.php")
        {
            $request = Application::getInstance()->getContext()->getRequest();
            $userId = $request->get('ID');

            $company = Company::getByID($userId);
            
            if ($company) {
                $arProfile = $company->getProfile();
                $arCompany = $company->getCompanies()[0];

                $user = CUser::getByID($userId)->Fetch();
            }

            Bitrix\Main\Page\Asset::getInstance()->addJs('/bitrix/js/smith.b2b/admin/user_edit.js');

            $arManagers = array(
                "REFERENCE" =>
                    array("Потапов Д.Н.", "Николаева Е.Н.", "Козьяков Р.Н.", "Титов А.", "Кузнецов П.К."),
                "REFERENCE_ID" =>
                    array(108, 98, 100, 101, 33),
            );

            $arOwnership = array(
                "REFERENCE" =>
                    array("ИП", "ООО", "АО", "ПАО"),
                "REFERENCE_ID" =>
                    array("ИП", "ООО", "АО", "ПАО"),
            ); 

            $rows = self::getRow(array(
                'NAME' => 'Директор', 
                'HIGHTLIGHT' => true,
                'INPUT' => FindUserID("COMPANY_DIRECT_ID", $arProfile['DIRECT_ID'], '', 'user_edit_form')
            ));
            $rows .= self::getRow(array(
                'NAME' => 'Менеджер',
                'HIGHTLIGHT' => true,
                'INPUT' => SelectBoxFromArray("COMPANY_MANAGER", $arManagers, $arProfile['MANAGER_ID'], "", "")
            ));

            $rows .= self::getDelimiter('Реквизиты');
            $rows .= self::getRow(array(
                'NAME' => 'Форма собственности',
                'INPUT' => SelectBoxFromArray("COMPANY_OWNERSHIP_TYPE", $arOwnership, $arCompany['OWNERSHIP_TYPE'], "", "")
            ));
            $rows .= self::getRow(array(
                'NAME' => 'Наименование',
                'INPUT' => '<input type="hidden" name="COMPANY_ID" value="'.$arCompany['ID'].'">
                            <input type="text" name="COMPANY_NAME" value="'.$arCompany['NAME'].'" size="30">'
            ));
            $rows .= self::getRow(array(
                'NAME' => 'Бренд',
                'INPUT' => '<input type="text" name="COMPANY_BRAND" value="'.$arCompany['BRAND'].'" size="30">'
            ));
            $rows .= self::getRow(array(
                'NAME' => 'ИНН',
                'HIGHTLIGHT' => true,
                'INPUT' => '<input type="text" name="COMPANY_INN" value="'.$arCompany['INN'].'" size="30">'
            ));
            $rows .= self::getRow(array(
                'NAME' => 'ОГРН',
                'INPUT' => '<input type="text" name="COMPANY_OGRN" value="'.$arCompany['OGRN'].'" size="30">'
            ));
            $rows .= self::getRow(array(
                'NAME' => 'КПП',
                'INPUT' => '<input type="text" name="COMPANY_KPP" value="'.$arCompany['KPP'].'" size="30">'
            ));
            $rows .= self::getRow(array(
                'NAME' => 'Юридический адрес',
                'INPUT' => '<input type="text" name="COMPANY_ADDRESS" value="'.$arCompany['ADDRESS'].'" size="50">'
            ));
            $rows .= self::getRow(array(
                'NAME' => 'Номер в 1С',
                'INPUT' => '<input type="text" name="UF_1C_NUMBER" value="'.$user['UF_1C_NUMBER'].'" size="50">'
            ));

            $rows .= self::getDelimiter('Торговые точки');
            foreach ($arCompany['STORES'] as $store) {
                $rows .= self::getRow(array(
                    'NAME' => '<input type="hidden" name="COMPANY_STORE_ID[]" value="'.$store['ID'].'">
                               <input type="text" name="COMPANY_STORE_NAME[]" value="'.$store['NAME'].'" size="20" placeholder="Название">',
                    'INPUT' => '<input type="text" name="COMPANY_STORE_ADDRESS[]" value="'.$store['ADDRESS'].'" size="50" placeholder="Адрес">
                               <a href="javascript:;" class="adm-btn adm-btn-delete adm-btn-delete-item" delete-target="'.$store['ID'].'" onclick="onClickBtnDelete(this)">Удалить</a>'
                ));
            }
            $rows .= self::getRow(array(
                'NAME' => '<input type="text" name="COMPANY_STORE_NAME[]" value="" size="20" placeholder="Название">',
                'INPUT' => '<input type="text" name="COMPANY_STORE_ADDRESS[]" value="" size="50" placeholder="Адрес">'
            ));

            $rows .= '<tr>
                <td width="40" class="adm-detail-content-cell-l"></td>
                <td width="60%" class="adm-detail-content-cell-r">
                    <a href="javascript:;" class="adm-btn" hide-focus="true" onclick="settingsAddStore(this)">Добавить</a>
                </td>
            </tr>';

            $form->tabs[] = array(
                "DIV" => "company", 
                "TAB" => "Компания", 
                "ICON" => "main_user_edit", 
                "TITLE" => "Компания", 
                "CONTENT" => $rows
            );
        }
    }

    protected static function getDelimiter($name = '')
    {
        return "<tr class=\"heading\"><td colspan=\"2\">$name</td></tr>";
    }

    protected static function getRow($sets)
    {
        if (empty($sets['HIGHTLIGHT']))
            $sets['HIGHTLIGHT'] = false;

        $row = self::rowBegin();
        $row .= self::cellBegin(40, 'l');
        $row .= $sets['HIGHTLIGHT'] ? "<b>{$sets['NAME']}:</b>" : "{$sets['NAME']}:";
        $row .= self::cellEnd();
        $row .= self::cellBegin(60, 'r');
        $row .= $sets['INPUT'];
        $row .= self::cellEnd();
        $row .= self::rowEnd();

        return $row;
    }

    protected static function rowBegin()
    {
        return "<tr>";
    }

    protected static function rowEnd()
    {
        return "</tr>";
    }

    protected static function cellBegin($percent = 50, $float = 'l')
    {
        return "<td width=\"$percent%\" class=\"adm-detail-content-cell-$float\">";
    }

    protected static function cellEnd()
    {
        return "</td>";
    }
}
