BX.Sale.Input.Manager.StoresInput = StoresInput;
BX.Sale.Input.Utils.extend(StoresInput, BX.Sale.Input.BaseInput);
BX.Sale.Input.Manager.register('STORES', StoresInput);

function StoresInput(name, settings, value, publicO)
{
    StoresInput.__super__.constructor.call(this, name, settings, value, publicO);
}

StoresInput.prototype.createEditorSingle = function (name, value)
{
    var settings = this.settings;

    var select = document.createElement('select');
    select.name = name;
    //select.setAttribute('data-target', name);

    BX.Sale.Input.Utils.applyBooleanAttributesTo(select, settings, BX.Sale.Input.Utils.globalBooleanAttributes, {DISABLED:'', AUTOFOCUS:'', REQUIRED:''});
    BX.Sale.Input.Utils.applyValueAttributesTo(select, settings, BX.Sale.Input.Utils.globalValueAttributes, {FORM:1, SIZE:1});
    this.applyEventAttributesTo(select, settings, BX.Sale.Input.Utils.globalEventAttributes);

    var item = [select];

    this.setOptions(select);
    //this.addEventSingle(item, 'change', this.onChange);

    return item;
};

StoresInput.prototype.setOptions = function (select)
{
    var self = this;

    BX.ajax({
        url: '/bitrix/tools/smith.b2b/company_stores.php',
        method: 'post',
        dataType: 'json',
        data: { 'stores': true },
        onsuccess: function (options) 
        {
            if (!options) return;

            var settings = self.settings;

            self.createEditorOptions(select, options,
                function (container, value, text)
                {
                    var option = document.createElement('option');

                    option.text = text;
                    option.value = value;

                    container.appendChild(option);
                }
            );

            if (settings.REQUIRED == "N") {
                var option = document.createElement('option');
                option.text = BX.message('INPUT_ENUM_EMPTY_OPTION');
                option.value = 0;
                option.selected = "selected";

                select.insertBefore(option, select.firstChild);
            }
        },
        onfailure: function (type, e) 
        {
        }
    });
};

// StoresInput.prototype.onChange = function (event)
// {
//     var select = event.target;

//     var inputName = select.getAttribute('data-target');
//     var input = document.body.querySelector('[name="'+inputName+'"]');

//     input.value = select.value;
// }

StoresInput.prototype.createEditorOptions = function (container, options, option)
{
    var key, value;

    for (key in options) {
        if (options.hasOwnProperty(key)) {
            value = options[key];
            option(container, key, value);
        }
    }
};

StoresInput.prototype.afterEditorSingleInsert = function (item)
{
    item[0].focus();
};

StoresInput.prototype.setValueSingle = function (item, value)
{
    item[0].value = value;
};

StoresInput.prototype.getValueSingle = function (item)
{
    var element = item[0];
    return element.value;
};

StoresInput.prototype.setDisabledSingle = function (item, disabled)
{
    item[0].disabled = disabled;
};

StoresInput.prototype.addEventSingle = function (item, name, action)
{
    BX.Sale.Input.Utils.addEventTo(item[0], name, action);
};
