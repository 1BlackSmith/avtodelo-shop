<?php
namespace Smith\B2B\Internals;

class TradeAgreementsIndividual extends EO_TradeAgreementIndividual_Collection
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