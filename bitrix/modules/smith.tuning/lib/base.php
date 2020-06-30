<?php
namespace Smith\Tuning;

class Base 
{
    protected static function checkAgreementDate($agreement)
    {
        $begin = $agreement['BEGIN'] instanceof \Bitrix\Main\Type\Date ? $agreement['BEGIN']->getTimestamp() : 0;
        $end = $agreement['END'] instanceof \Bitrix\Main\Type\Date ? $agreement['END']->getTimestamp() : INF;
        return $begin < time() && time() < $end;
    }
}