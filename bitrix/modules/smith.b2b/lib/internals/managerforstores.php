<?php
namespace Smith\B2B\Internals;

class ManagerForStores extends EO_ManagerForStore_Collection
{
    public function collectValues($type)
    {
        $employees = [];
        foreach ($this as $employee) {
            $employees[] = $employee->collectValues($type);
        }
        return $employees;
    }
}

?>