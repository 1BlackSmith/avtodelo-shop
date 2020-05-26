;(function () {

    SmithB2BEventTable = function() 
    {
    };


    SmithB2BEventTable.prototype = {


        /**
         * Привязка события к добавленному элементу
         */
        addHandlerInNewElem: function (className, eventName, func)
        {
            var elems = document.getElementsByClassName(className);
            var elemLast = elems.length - 1;

            BX.bind(elems[elemLast], eventName, BX.delegate(func, elems[elemLast]));
        },

        /**
         * Получает массив событий модуля и добавляет их в список
         */
        ajaxAddDataInEventsSelect: function (moduleName)
        {
            var select = this;

            BX.ajax({  
                url: '/bitrix/tools/smith.cimport/get_module_events.php',
                data: {
                    module: moduleName
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
        },

        ajaxDeleteEventItem: function (itemId)
        {
            BX.ajax({  
                url: '/bitrix/tools/smith.cimport/delete_event_item.php',
                data: {
                    item_id: itemId
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
                        
                    }
                },
                onfailure: function() { console.log('lol'); }
            });
        }
    };


    BX.ready(function() {

        /* Кастомизация работы со списком элементов */
        HTMLCollection.prototype.forEach = Array.prototype.forEach;
        NodeList.prototype.forEach = Array.prototype.forEach;
        HTMLCollection.prototype.bind = collectionBind;
        NodeList.prototype.bind = collectionBind;

        var select = document.getElementsByClassName('smith-select-module');
        var btnAdd = document.querySelectorAll('[data-smith-options-add-block]');
        var btnDeleteItem = document.getElementsByClassName('adm-btn-delete-item');
        var EventTable = new SmithB2BEventTable();

        /* При выборе модуля заполняет список событий */
        select.bind('change', onChangeSelectModule);

        btnDeleteItem.bind('click', onClickBtnDelete);

        /* Добавление новой строки */
        btnAdd.bind('click', function () {
            var blockName = this.getAttribute('data-smith-options-add-block');
            var insertBlock = document.getElementById('tab_user_sets-proto').cloneNode(true);
            var container = document.querySelector('[data-smith-options-container="' + blockName + '"]');

            insertBlock.removeAttribute('id');
            insertBlock.removeAttribute('style');

            container.append(insertBlock);

            /* При добавлении строки добавляет обработчик новым элементам */
            setTimeout(
                EventTable.addHandlerInNewElem, 
                100,
                'smith-select-module',
                'change',
                onChangeSelectModule
            );
            setTimeout(
                EventTable.addHandlerInNewElem, 
                100,
                'adm-btn-delete-item',
                'click',
                onClickBtnDelete
            );
        });

    });


    // Вспомагательные функции /////////////////////////////////////////////////////

    function collectionBind(event, func) 
    {
        this.forEach(function (item) {
            BX.bind(item, event, BX.delegate(func, item));
        });
    }

    function onChangeSelectModule()
    {
        var EventTable = new SmithB2BEventTable();
        BX.delegate(EventTable.ajaxAddDataInEventsSelect, this)(this.value);
    }

    function onClickBtnDelete()
    {
        var EventTable = new SmithB2BEventTable();
        var itemId = this.getAttribute('delete-target');
        var container = BX.findParent(this, {'class' : 'tab_user_sets'});

        BX.cleanNode(container, true);

        if (itemId) {
            BX.delegate(EventTable.ajaxDeleteEventItem, this)(itemId);
        }
    }

})();