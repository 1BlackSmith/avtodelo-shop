<?php 
namespace Smith\B2B\Internals;

class TradeAgreementsGroup extends EO_TradeAgreementGroup_Collection
{
    public function collectValues($type)
    {
        $agreements = [];
        foreach ($this as $agreement) {
            $agreements[] = $agreement->collectValues($type);
        }
        return $agreements;
    }
}

?>