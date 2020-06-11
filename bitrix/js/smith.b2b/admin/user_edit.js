function onClickBtnDelete(a, id)
{
    var row = BX.findParent(a, { "tag": "tr"});
    var entity = a.getAttribute("data-entity");
    BX.cleanNode(row, true);
    if (id && entity) {
        ajaxDeleteEventItem(id, entity);
    }
}

function ajaxDeleteEventItem(id, entity)
{
    BX.ajax({  
        url: '/bitrix/tools/smith.b2b/delete_'+ entity +'.php',
        data: {
            id: id
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
            } else {
                alert(data['ERRORS']);
            }
        }
    });
}

function settingsAdd(a)
{
    var row = BX.findParent(a, { "tag": "tr"});
    var tbl = row.parentNode;
    var tableRow = tbl.rows[row.rowIndex-1].cloneNode(true);
    tbl.insertBefore(tableRow, row);
}