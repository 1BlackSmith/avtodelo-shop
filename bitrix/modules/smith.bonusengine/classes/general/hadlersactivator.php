<?

use \Bitrix\Main\EventManager;
use \Bitrix\Main\Config\Option;
use \Smith\Bonusengine\EventTable;

class SBHandlersCallback
{
    const MODULE_ID = 'smith.bonusengine';

    public function callback()
    {
        $userId = CUser::GetID();
        $arEvent = unserialize(Option::get('smith.bonusengine', 'tmp_event'));
        $message = $arEvent['MODULE_CODE'] . ' - ' . $arEvent['EVENT_CODE'];

        // if (CModule::IncludeModule('sale')) {
        //     CSaleUserAccount::UpdateAccount($userId, $arEvent['POINTS'], 'RUB', $message);
        // }

        \Bitrix\Main\IO\File::putFileContents($_SERVER['DOCUMENT_ROOT'] . '/log.txt', print_r($arEvent, true));
    }
}