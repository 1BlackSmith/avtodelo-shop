<?php
namespace Smith\B2B;

use Smith\B2B\Internals\GroupProductTable;
use Smith\B2B\Internals\GroupTable;

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
        try {
            if (!$productId) {
                throw new \Bitrix\Main\ArgumentException("ID Продукта не должен быть равен 0");
            }  
        } catch (\Bitrix\Main\ArgumentException $e) {
            \CAdminMessage::ShowMessage($e->getMessage());
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
        $group->removeAllProducts();
        $group->delete();
    }

    public static function deleteProduct($groupId, $productId)
    {
        GroupProductTable::getList([
            'filter' => ['GROUP_ID' => $groupId, 'PRODUCT_ID' => $productId]
        ])->fetchObject()->delete();
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
        try {
            $obj->save();
            if ($obj->primary['ID'] > 0) {
                return $obj;
            } else {
                throw new \Bitrix\Main\DB\SqlException("Ошибка сохранения сущности ".get_class($obj));
            }
        } catch (\Bitrix\Main\DB\SqlException $e) {
            \CAdminMessage::ShowMessage($e->getMessage());
        }
    }

    protected static function saveCollection($objCollection)
    {
        try {
            $objCollection->save();
            if (count($objCollection->getIdList() > 0)) {
                return $objCollection;
            } else {
                throw new \Bitrix\Main\DB\SqlException("Ошибка сохранения сущности ".get_class($objCollection));
            }
        } catch (\Bitrix\Main\DB\SqlException $e) {
            \CAdminMessage::ShowMessage($e->getMessage());
        }
    }
}