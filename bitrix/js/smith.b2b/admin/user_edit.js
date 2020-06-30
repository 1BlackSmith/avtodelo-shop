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

function openCatalogPopup(a) 
{
    catalogPopup.dialogSearch().getDialog().Show();
    a.classList.add('ind-cliked');
}

var catalogPopup = new ElementSearch({
    IBLOCK_ID: 3,
    url: '/bitrix/admin/cat_product_search_dialog.php',
    buttons: [
    ]
});

BX.addCustomEvent(catalogPopup.getEvent(), (dataEvent) => {
    catalogPopup.getDialog().Close();
    var a = document.querySelector('.ind-cliked');
    var td = a.parentNode;
    var row = td.parentNode;
    var tbl = row.parentNode;
    tbl.append(row.cloneNode(true));

    var product = BX.create({tag: 'span', html: dataEvent.name});
    product.style = 'display: inline-block; width: 300px; vertical-align: middle; text-align: right; margin-right: 5px;';
    td.insertBefore(product, a);
    a.remove();

    var btn = BX.create('a', {
        attrs: {
            href: 'javascript:;',
            className: 'adm-btn adm-btn-delete adm-btn-delete-item',
            onclick: 'onClickBtnDelete(this)'
        },
        text: 'Удалить'
    });
    td.append(btn);

    var input = BX.findChild(BX(td), {"class" : "ind-product-id"});
    input.value = dataEvent.id;
});