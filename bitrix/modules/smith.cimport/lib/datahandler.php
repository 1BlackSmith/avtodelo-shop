<?

namespace Smith\CImport;

use CFile;
use \Smith\CImport\SimpleXLSX;

class DataHandler
{
    protected $arFile = array();
    protected $request;

    const MODULE_ID = "smith.cimport";

    public function __construct()
    {
        $this->request = \Bitrix\Main\HttpApplication::getInstance()->getContext()->getRequest();
    }

    public function readXLSXFile()
    {
        if (empty($this->arFile))
            $this->loadFile();

        $filePath = CFile::getPath($this->arFile['ID']);
        if ($xlsx = SimpleXLSX::parse($_SERVER['DOCUMENT_ROOT'].$filePath)) 
        {
            $this->deleteFile();
            return $xlsx->rows();
        }
        else 
        {
            return SimpleXLSX::parseError();
        }
    }

    public function loadFile()
    {
        $this->getFile();

        $this->arFile['MODULE_ID'] = self::MODULE_ID;
        $this->arFile['ID'] = CFile::SaveFile($this->arFile, $this->arFile['MODULE_ID']);
    }

    protected function getFile()
    {
        $FIELD_FILE = 'FILE';
        $this->arFile = $this->request->getFile($FIELD_FILE);
    }

    protected function deleteFile()
    {
        CFile::Delete($this->arFile['ID']);
    } 
}