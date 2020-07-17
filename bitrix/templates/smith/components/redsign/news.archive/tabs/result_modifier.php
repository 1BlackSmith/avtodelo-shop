<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Localization\Loc;
?>

<? // Переформирование данных
function GetData($IBLOCK_ID, $PROPERTY_CODE) 
{  
    global $DB;
    $strSql = "
        SELECT b_iblock_element.DATE_CREATE, b_iblock_property_enum.XML_ID
        FROM b_iblock_element INNER JOIN b_iblock_element_property ON b_iblock_element.ID = b_iblock_element_property.IBLOCK_ELEMENT_ID
        INNER JOIN b_iblock_property_enum ON b_iblock_element_property.VALUE = b_iblock_property_enum.ID
        INNER JOIN b_iblock_property ON b_iblock_property_enum.PROPERTY_ID = b_iblock_property.ID
        WHERE b_iblock_element.IBLOCK_ID = $IBLOCK_ID AND b_iblock_property.CODE LIKE \"$PROPERTY_CODE\";
        ";
    $res = $DB->Query($strSql);
    return $res;
}



$results = GetData($arParams["IBLOCK_ID"], "DISPLAY");

$years = array();

while ($row = $results->Fetch()) {
	if ($row['XML_ID'] !== SITE_ID) continue;

	$d = explode("-", $row['DATE_CREATE']);
	$date['YEAR'] = +$d[0];
	$date['MONTH'] = +$d[1];
	unset($d);

	if (!isset($years[$date['YEAR']])) {
		$years[$date['YEAR']] = array(
			'NAME' => $date['YEAR'],
			'SELECTED' => ($date['YEAR'] === +$_GET['YEAR']) ? true : false,
			'ARCHIVE_URL' => '/news/?YEAR='.$date['YEAR'],
			'COUNT' => 1,
			'MONTHS' => array(
				$date['MONTH'] => array(
					'COUNT' => 1,
					'MONTH' => $date['MONTH'],
					'YEAR' => $date['YEAR'],
					'NAME' => Loc::getMessage('MONTH')[$date['MONTH'] - 1],
					'ARCHIVE_URL' => '/news/?MONTH='.$date['MONTH']
				)
			)
		);
	} else {
		$years[$date['YEAR']]['COUNT']++;
		$months = &$years[$date['YEAR']]['MONTHS'];

		if (!isset($months[$date['MONTH']])) {
			$months[$date['MONTH']] = array(
				'COUNT' => 1,
				'MONTH' => $date['MONTH'],
				'YEAR' => $date['YEAR'],
				'NAME' => Loc::getMessage('MONTH')[$date['MONTH'] - 1],
				'ARCHIVE_URL' => '/news/?MONTH='.$date['MONTH']
			);
		} else {
			$months[$date['MONTH']]['COUNT']++;
		}
	}
}

$arResult['YEARS'] = $years;
?>
