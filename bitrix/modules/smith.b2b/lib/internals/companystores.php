<?php
namespace Smith\B2B\Internals;

class CompanyStores extends EO_CompanyStore_Collection
{
    public function collectValues($type)
    {
        $stores = [];
        foreach ($this as $store) {
            $stores[] = $store->collectValues($type);
        }
        return $stores;
    }
}

?>