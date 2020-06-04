<?php

use Bitrix\Main;

AddEventHandler(
    "main", 
    "OnBeforeUserRegister", 
    [
        "Register", 
        "OnBeforeUserRegister"
    ]
);

AddEventHandler(
    "main", 
    "OnBeforeUserSimpleRegister", 
    [
        "Register", 
        "OnBeforeUserSimpleRegister"
    ]
); 

class Register {
    public function OnBeforeUserRegister($arFields)
    {
        $russianWord = "/^[А-ЯЁа-яё]+$/u";
        
        if (preg_match($russianWord, $arFields['NAME']) === 0) {
            $GLOBALS['APPLICATION']->ThrowException('Имя должно быть введено строго на кириллице');
            return false;
        }

        if (!empty($arFields['LAST_NAME']) && preg_match($russianWord, $arFields['LAST_NAME']) === 0) {
            $GLOBALS['APPLICATION']->ThrowException('Фамилия должна быть введена строго на кириллице');
            return false;
        }
    }

    public function OnBeforeUserSimpleRegister(&$arFields)
    {
        $GLOBALS['APPLICATION']->ThrowException('Данный вид регистрации не работает');
        return false;
    }
}