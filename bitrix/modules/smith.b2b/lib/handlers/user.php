<?php

namespace Smith\B2B\Handlers;

use Bitrix\Main;
use Bitrix\Main\UserTable;
use Bitrix\Main\Application;
use \CAdminCalendar;
use Smith\B2B\Company;
use Smith\B2B\CompanyBase;

class User
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
                $company = CompanyBase::add($arData);
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
                $company = CompanyBase::getByID($userId);
                $company->change($arData);
            }
        }
    }

    public function OnBeforeUserDelete($userId)
    {
        if ($company = CompanyBase::getByID($userId)) {
            $company->delete();
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
            ),
            'AGREEMENT_GROUPS' => self::getAgreementGroupsData($request),
            'AGREEMENT_INDIVIDUAL' => self::getAgreementGroupsIndividual($request)
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

    protected static function getAgreementGroupsData($request)
    {
        $res = array();

        $arIDs = $request->getPost('AGREEMENT_GROUP_ID');
        $arCatalogGroups = $request->getPost('CATALOG_GROUP');
        $arPriceGroups = $request->getPost('PRICE_GROUP');
        $arDateBegin = $request->getPost('DATE_BEGIN_GROUP');
        $arDateEnd = $request->getPost('DATE_END_GROUP');

        foreach ($arCatalogGroups as $k => $v) {
            if (!$v) continue;
            $res[] = array(
                'ID'         => $arIDs[$k] ? $arIDs[$k] : false,
                'CATALOG_GROUP_ID' => $v,
                'PRICE_GROUP_ID'   => $arPriceGroups[$k],
                'DATE_BEGIN'       => $arDateBegin[$k],
                'DATE_END'         => $arDateEnd[$k]
            );
        }

        return $res;
    }

    protected static function getAgreementGroupsIndividual($request)
    {
        $res = array();

        $arIDs = $request->getPost('AGREEMENT_IND_ID');
        $arProductIDs = $request->getPost('AGREEMENT_IND_PRODUCT_ID');
        $arPrices = $request->getPost('AGREEMENT_IND_PRICE');
        $arCurrencies = $request->getPost('AGREEMENT_IND_CURRENCY');
        $arDateBegin = $request->getPost('AGREEMENT_IND_BEGIN');
        $arDateEnd = $request->getPost('AGREEMENT_IND_END');

        foreach ($arProductIDs as $k => $v) {
            if (!$v || !$arPrices[$k]) continue;
            $res[] = array(
                'ID'         => $arIDs[$k] ? $arIDs[$k] : false,
                'PRODUCT'    => $v,
                'PRICE'      => $arPrices[$k],
                'CURRENCY'   => $arCurrencies[$k],
                'DATE_BEGIN' => $arDateBegin[$k],
                'DATE_END'   => $arDateEnd[$k],
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

            $company = CompanyBase::getByID($userId);

            if ($company) {
                $arProfile = $company->getProfile();
                $arCompany = $company->getCompany();
                $groupAgreements = $company->getGroupAgreements();
                $individualAgreements = $company->getIndividualAgreements();
                $arIndividualProducts = self::collectIndAgreementsProducts($individualAgreements);

                $user = \CUser::getByID($userId)->Fetch();
            }

            \CJSCore::Init(array("jquery","date"));
            \Bitrix\Main\Page\Asset::getInstance()->addJs('/bitrix/js/smith.b2b/admin/element_search.js');
            \Bitrix\Main\Page\Asset::getInstance()->addJs('/bitrix/js/smith.b2b/admin/user_edit.js');


            $arManagers = array(
                "REFERENCE" =>
                    array("Потапов Д.Н.", "Потапова Н.В.", "Николаева Е.Н.", "Козьяков Р.Н.", "Титов А.А.", "Савоськин А.В.", "Кузнецов П.К."),
                "REFERENCE_ID" =>
                    array(108, 96, 98, 100, 101, 99, 33),
            );

            $arOwnership = array(
                "REFERENCE" =>
                    array("ИП", "КФХ", "ООО", "АО", "ПАО", "ЗАО"),
                "REFERENCE_ID" =>
                    array("ИП", "КФХ", "ООО", "АО", "ПАО", "ЗАО"),
            );

            $catalogGroups = array(
                "REFERENCE" => array("Группа товаров"),
                "REFERENCE_ID" => array(0)
            );
            $sections = \Smith\B2B\ProductGroups::getGroups();
            foreach ($sections as $section) {
                $catalogGroups["REFERENCE"][] = $section["NAME"];
                $catalogGroups["REFERENCE_ID"][] = $section["ID"];
            }

            $priceGroups = array(
                "REFERENCE" => array("Ценовая группа"),
                "REFERENCE_ID" => array(0)
            );
            $prices = \CCatalogGroup::GetList(array("SORT" => "ASC"));
            while ($price = $prices->GetNext()) {
                $priceGroups["REFERENCE"][] = $price["NAME"];
                $priceGroups["REFERENCE_ID"][] = $price["ID"];
            }

            $catalogGroup = array(
                "REFERENCE" =>
                    array(123, 321),
                "REFERENCE_ID" =>
                    array(1, 2),
            ); 

            $currencies = array(
                "REFERENCE" =>
                    array("RUB", "USD", "EUR"),
                "REFERENCE_ID" =>
                    array("RUB", "USD", "EUR"),
            );

            $rows = self::getRow(array(
                'NAME' => 'Директор', 
                'HIGHTLIGHT' => true,
                'INPUT' => FindUserID("COMPANY_DIRECT_ID", $arProfile['COMPANY_USER_ID'], '', 'user_edit_form')
            ));
            $rows .= self::getRow(array(
                'NAME' => 'Менеджер',
                'HIGHTLIGHT' => true,
                'INPUT' => SelectBoxFromArray("COMPANY_MANAGER", $arManagers, $arProfile['COMPANY_MANAGER_ID'], "", "")
            ));

            $rows .= self::getDelimiter('Реквизиты');
            $rows .= self::getRow(array(
                'NAME' => 'Форма собственности',
                'INPUT' => SelectBoxFromArray("COMPANY_OWNERSHIP_TYPE", $arOwnership, $arCompany['OWNERSHIP_TYPE'], "", "")
            ));
            $rows .= self::getRow(array(
                'NAME' => 'Наименование',
                'INPUT' => '<input type="hidden" name="COMPANY_ID" value="'.$arCompany['ID'].'">
                            <textarea name="COMPANY_NAME" cols="60" rows="1">'.$arCompany['NAME'].'</textarea>'
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
                               <a href="javascript:;" class="adm-btn adm-btn-delete adm-btn-delete-item" data-entity="store" onclick="onClickBtnDelete(this, '.$store['ID'].')">Удалить</a>'
                ));
            }
            $rows .= self::getRow(array(
                'NAME' => '<input type="text" name="COMPANY_STORE_NAME[]" value="" size="20" placeholder="Название">',
                'INPUT' => '<input type="text" name="COMPANY_STORE_ADDRESS[]" value="" size="50" placeholder="Адрес">'
            ));
            $rows .= '<tr>
                <td width="40" class="adm-detail-content-cell-l"></td>
                <td width="60%" class="adm-detail-content-cell-r">
                    <a href="javascript:;" class="adm-btn" hide-focus="true" onclick="settingsAdd(this)">Добавить</a>
                </td>
            </tr>';

            $rows .= self::getDelimiter('Групповые торговые соглашения');
            foreach ($groupAgreements as $agreement) {
                $rows .= self::getMultipleRow(
                    '<input type="hidden" name="AGREEMENT_GROUP_ID[]" value="'.$agreement['ID'].'">'.
                    SelectBoxFromArray("CATALOG_GROUP[]", $catalogGroups, $agreement['CATALOG_GROUP'], "", "")."&nbsp;".
                    SelectBoxFromArray("PRICE_GROUP[]", $priceGroups, $agreement['PRICE_GROUP'], "", "")."&nbsp;".
                    '<input type="text" value="'.$agreement['BEGIN'].'" name="DATE_BEGIN_GROUP[]" onclick="BX.calendar({node: this, field: this, bTime: false});">'."&nbsp;".
                    '<input type="text" value="'.$agreement['END'].'" name="DATE_END_GROUP[]" onclick="BX.calendar({node: this, field: this, bTime: false});">'."&nbsp;".
                    '<a href="javascript:;" class="adm-btn adm-btn-delete adm-btn-delete-item" data-entity="agreement_group" onclick="onClickBtnDelete(this, '.$agreement['ID'].')">Удалить</a>'
                );
            }
            unset($groupAgreements, $agreement);
            $rows .= self::getMultipleRow(
                '<input type="hidden" name="AGREEMENT_GROUP_ID[]">'.
                SelectBoxFromArray("CATALOG_GROUP[]", $catalogGroups, "", "", "")."&nbsp;".
                SelectBoxFromArray("PRICE_GROUP[]", $priceGroups, "", "", "")."&nbsp;".
                '<input type="text" value="" name="DATE_BEGIN_GROUP[]" onclick="BX.calendar({node: this, field: this, bTime: false});">'."&nbsp;".
                '<input type="text" value="" name="DATE_END_GROUP[]" onclick="BX.calendar({node: this, field: this, bTime: false});">'
            );
            $rows .= '<tr>
                <td width="40" class="adm-detail-content-cell-l"></td>
                <td width="60%" class="adm-detail-content-cell-r">
                    <a href="javascript:;" class="adm-btn" hide-focus="true" onclick="settingsAdd(this)">Добавить</a>
                </td>
            </tr>';

            $rows .= self::getDelimiter('Индивидуальные торговые соглашения');
            \Bitrix\Main\IO\File::putFileContents($_SERVER['DOCUMENT_ROOT'] . '/log.txt', print_r($individualAgreements, true));
            foreach ($individualAgreements as $agreement) {
                $productId = $agreement['PRODUCT'];
                $productName = $arIndividualProducts[$productId]['NAME'];
                $productArtnumber = $arIndividualProducts[$productId]['ARTNUMBER'];
                $rows .= self::getMultipleRow(
                    '<input type="hidden" name="AGREEMENT_IND_ID[]" value="'.$agreement['ID'].'">'.
                    '<input type="hidden" class="ind-product-id" name="AGREEMENT_IND_PRODUCT_ID[]" value="'.$productId.'">'.
                    '<span style="display: inline-block; width: 300px; vertical-align: middle; text-align: right; margin-right: 5px;">'.$productName."<br>Артикул: ".$productArtnumber.'</span>'."&nbsp;".
                    '<input type="text" name="AGREEMENT_IND_PRICE[]" size="6" placeholder="Цена" value="'.$agreement['PRICE'].'">'."&nbsp;".
                    SelectBoxFromArray("AGREEMENT_IND_CURRENCY[]", $currencies, $agreement['CURRENCY'], "", "")."&nbsp;".
                    '<input type="text" value="'.$agreement['BEGIN'].'" name="AGREEMENT_IND_BEGIN[]" onclick="BX.calendar({node: this, field: this, bTime: false});" size="8">'."&nbsp;".
                    '<input type="text" value="'.$agreement['END'].'" name="AGREEMENT_IND_END[]" onclick="BX.calendar({node: this, field: this, bTime: false});" size="8">'."&nbsp;".
                    '<a href="javascript:;" class="adm-btn adm-btn-delete adm-btn-delete-item" data-entity="agreement_ind" onclick="onClickBtnDelete(this, '.$agreement['ID'].')">Удалить</a>'
                );
            }
            unset($individualAgreements, $agreement);
            $rows .= self::getMultipleRow(
                '<input type="hidden" name="AGREEMENT_IND_ID[]">'.
                '<input type="hidden" class="ind-product-id" name="AGREEMENT_IND_PRODUCT_ID[]">'.
                '<a style="margin-left: 170px; margin-right: 5px;" href="javascript:void(0)" onclick="openCatalogPopup(this)" class="adm-btn adm-btn-save">Выбрать товар</a>'."&nbsp;".
                '<input type="text" name="AGREEMENT_IND_PRICE[]" size="6" placeholder="Цена">'."&nbsp;".
                SelectBoxFromArray("AGREEMENT_IND_CURRENCY[]", $currencies, "", "", "")."&nbsp;".
                '<input type="text" value="" name="AGREEMENT_IND_BEGIN[]" onclick="BX.calendar({node: this, field: this, bTime: false});" size="8">'."&nbsp;".
                '<input type="text" value="" name="AGREEMENT_IND_END[]" onclick="BX.calendar({node: this, field: this, bTime: false});" size="8">'."&nbsp;"
            );

            $form->tabs[] = array(
                "DIV" => "company", 
                "TAB" => "Компания", 
                "ICON" => "main_user_edit", 
                "TITLE" => "Компания", 
                "CONTENT" => $rows
            );
        }
    }

    protected static function collectIndAgreementsProducts($agreements)
    {
        $productsId = array();
        $arProducts = array();
        
        foreach ($agreements as $agreement) {
            $productsId[] = $agreement['PRODUCT'];
        }

        $arSelect = Array('ID', 'IBLOCK_ID', 'NAME', 'PROPERTY_ARTNUMBER');
        $arFilter = Array('IBLOCK_ID' => 3, 'ACTIVE' => 'Y', 'ID' => $productsId);
        $res = \CIBlockElement::GetList(Array(), $arFilter, false, Array(), $arSelect);
        while ($ob = $res->GetNextElement()) {
            $arFields = $ob->GetFields();
            $arProducts[$arFields['ID']] = Array(
                'NAME' => $arFields['NAME'],
                'ARTNUMBER' => $arFields['PROPERTY_ARTNUMBER_VALUE'],
            );
        }

        return $arProducts;
    }

    protected static function getDelimiter($name = '')
    {
        return "<tr class=\"heading\"><td colspan=\"2\">$name</td></tr>";
    }

    protected static function getMultipleRow($content)
    {
        $row = self::rowBegin();
        $row .= "<td style=\"padding-left: 25%; padding-bottom: 5px;\" colspan=\"2\">$content</td>";
        $row .= self::rowEnd();

        return $row;
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
