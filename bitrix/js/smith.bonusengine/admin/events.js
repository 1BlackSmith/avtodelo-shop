function addDataInSelect(d) {
    select = this;
    BX.ajax({  
        url: '/bitrix/tools/smith.bonusengine/get_module_events.php',
        data: {
            module: d
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
                var container = BX.findParent(select, {'tag' : 'tr'});
                var targetSelect = BX.findChild(container, {'class' : 'smith-select-event'}, true);

                BX.cleanNode(targetSelect);
                data['RESULT'].forEach(function (event) {
                    BX.append(
                        BX.create({
                            'tag'   : 'option',
                            'attrs' : { 'value' : event },
                            'text'  : event
                        }), targetSelect
                    );
                });
            }
        },
        onfailure: function() { console.log('lol'); }
    });
}

function addSelectHandler() 
{
    select = document.getElementsByClassName('smith-select-module');
    var selectLast = select.length - 1;
    BX.bind(select[selectLast], 'change', function () {
        BX.delegate(addDataInSelect, this)(this.value);
    });
}

function collectionBind(event, func) 
{
    this.forEach(function (item) {
        BX.bind(item, event, BX.delegate(func, item));
    });
}

BX.ready(function() {
    /* Кастомизация работы со списком элементов */
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
    NodeList.prototype.forEach = Array.prototype.forEach;
    HTMLCollection.prototype.bind = collectionBind;
    NodeList.prototype.bind = collectionBind;

    var select = document.getElementsByClassName('smith-select-module');
    var btnAdd = document.querySelectorAll('[data-smith-options-add-block]');

    /* При выборе модуля заполняет список событий */
    select.bind('change', function () {
        BX.delegate(addDataInSelect, this)(this.value);
    });

    /* При добавлении строки добавляет обработчик новым элементам */
    btnAdd.bind('click', function () {
        setTimeout(BX.delegate(addSelectHandler, this), 100);
    });
});