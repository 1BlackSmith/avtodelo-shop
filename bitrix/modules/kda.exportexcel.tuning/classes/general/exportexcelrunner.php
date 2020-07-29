<? 
class CKDAExportExcelRunnerTuning extends CKDAExportExcelRunner
{ 
    static function ExportIblock($params = array(), $fparams = array(), $stepparams = false, $pid = false)
    {  
        $export = new CKDAExportExcelTuning($params, $fparams, $stepparams, $pid); 
        return $export->Export();
    }
}