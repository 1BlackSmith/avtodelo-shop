function ajaxDeleteEventItem(storeId)
{
    BX.ajax({  
        url: '/bitrix/tools/smith.b2b/delete_store.php',
        data: {
            store_id: storeId
        },
        method: 'POST',
        dataType: 'json',
        timeout: 30,
        async: true,
        processData: true,
        scriptsRunFirst: true,
        emulateOnload: true,
        start: true,
        cache: false,
        onsuccess: function (data) {
            if (data['STATUS'] === 'OK') {
                console.log('success');
            }
        },
        onfailure: function() { console.log('lol'); }
    });
}

function onClickBtnDelete(a)
{
    var storeId = a.getAttribute('delete-target');
    var row = BX.findParent(a, { "tag": "tr"});

    BX.cleanNode(row, true);

    if (storeId) {
        ajaxDeleteEventItem(storeId);
    }
}

function settingsAdd(a)
{
    var row = BX.findParent(a, { "tag": "tr"});
    var tbl = row.parentNode;

    var tableRow = tbl.rows[row.rowIndex-1].cloneNode(true);
    tbl.insertBefore(tableRow, row);
}