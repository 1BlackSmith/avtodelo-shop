<?php
namespace Smith\B2B;

use Smith\B2B\Internals\GroupProductTable;
use Smith\B2B\Internals\GroupTable;

use \CAdminMessage;

class ProductGroups 
{
    public static function addGroup(String $name)
    {
        $newGroup = GroupTable::createObject();
        $newGroup->setName($name);
        return static::saveObj($newGroup);
    }

    public static function addProduct($groupId, $productId, $save = true)
    {
        if (static::getProductObj($groupId, $productId) !== null) {
            throw new \Bitrix\Main\DB\SqlException("Товар уже добавлен в группу");
            return;
        }
        if (!$productId) {
            throw new \Bitrix\Main\ArgumentException("ID Продукта не должен быть равен 0");
            return;
        }  

        $group = GroupTable::wakeUpObject($groupId);
        $newProduct = GroupProductTable::createObject();
        $newProduct->setProductId($productId);
        $newProduct->setGroup($group);

        if ($save) {
            return static::saveObj($newProduct);
        }

        return $newProduct;
    }

    public static function addProducts($groupId, Array $productsId, $save = true)
    {
        $newProducts = GroupProductTable::createCollection();
        foreach ($productsId as $pId) {
            $newProducts[] = static::addProduct($groupId, $pId, false);
        }

        if ($save) {
            return static::saveCollection($newProducts);
        }

        return $newProducts;
    }

    public static function deleteGroup($id)
    {
        $group = GroupTable::wakeUpObject($id);
        $group->fill();
        
        if ($group->getName() === null) {
            throw new \Bitrix\Main\DB\SqlException("Группа не найдена");
        }

        $group->removeAllProducts();
        $group->delete();
    }

    public static function deleteProduct($groupId, $productId)
    {
        $product = static::getProductObj($groupId, $productId);
        if ($product instanceof \Smith\B2B\Internals\EO_GroupProduct) {
            $product->delete();
        } else {
            throw new \Bitrix\Main\DB\SqlException("Ошибка удаления товара из группы");
        }
    }

    public static function renameGroup($id, $name)
    {
        $group = GroupTable::wakeUpObject($id);
        $group->setName($name);
        return static::saveObj($group);
    }

    public static function getGroups()
    {
        return GroupTable::getList()->fetchAll();
    }

    public static function getProductsId($groupId) 
    {
        $group = GroupTable::wakeUpObject($groupId);
        $group->fill();
        $productsId = [];
        foreach ($group->getProducts() as $product) {
            $productsId[] = $product['PRODUCT_ID'];
        }
        return $productsId;
    }

    public static function hasProduct($groupId, $productId)
    {
        $product = static::getProductObj($groupId, $productId);
        return empty($product) ? false : true;
    }

    public static function checkProduct($id, $iblockId, $name)
    {
        $arOrder = array('SORT' => 'ASC');
        $arSelectedFields = array('ID');
        $arElementFilter = array(
            '=IBLOCK_ID' => $iblockId,
            '=ID' => $id,
            'NAME' => $name
        );
        $rsElement = \CIBlockElement::GetList($arOrder, $arElementFilter, false, false, $arSelectedFields);
        return $rsElement->SelectedRowsCount() ? true : false;
    }

    protected static function getProductObj($groupId, $productId)
    {
        return GroupProductTable::getList([
            'select' => ['*'],
            'filter' => ['=GROUP_ID' => $groupId, '=PRODUCT_ID' => $productId],
            'limit' => 1
        ])->fetchObject();
    }

    protected static function collectArValues($collection)
    {
        $arr = [];
        foreach ($collection as $obj) {
            $arr[] = $obj->collectValues();
        }
        return $arr;
    }

    protected static function saveObj($obj)
    {
        $obj->save();
        if ($obj->primary['ID'] > 0) {
            return $obj;
        } else {
            throw new \Bitrix\Main\DB\SqlException("Ошибка сохранения сущности ".get_class($obj));
        }
    }

    protected static function saveCollection($objCollection)
    {
        $objCollection->save();
        if (count($objCollection->getIdList() > 0)) {
            return $objCollection;
        } else {
            throw new \Bitrix\Main\DB\SqlException("Ошибка сохранения сущности ".get_class($objCollection));
        }
    }
}