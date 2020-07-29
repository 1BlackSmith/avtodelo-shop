<?
class CKDAExportExcelTuning extends CKDAExportExcel
{
    public function CheckExtServices($outputFile)
    {
        parent::CheckExtServices($outputFile);

        $mailTo = COption::GetOptionString(static::$moduleId, 'NOTIFY_EMAIL');

        $profileName = $this->params['PROFILE_NAME'];

        if ($this->params['EXPORT_FILE_TO_EMAIL'] == "Y") {
            $arMailFields = array(
                'DATE' => date('d.m.Y'),
                'DATETIME' => date('d.m.Y H:i:s'),
                'EMAIL_TO' => $mailTo,
                'PROFILE_NAME' => $profileName,
            );
            \CEvent::Send($this->params['MAIL_TEMPLATE_EVENT'], $this->GetDefaultSiteId(), $arMailFields, 'Y', "", array($outputFile));
        }
    }
}
