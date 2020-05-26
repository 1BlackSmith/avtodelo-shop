function ElementSearch(props) 
{
    this.props = Object.assign({}, this.getDefaultProps(), props);
    this._dialogSearch = null;
};

ElementSearch.prototype.getDefaultProps = function() 
{
    return {
        event: 'onSelectElement',
        lang: 'ru',
        allow_select_parent: 'Y',
        url: '/bitrix/admin/cat_product_search_dialog.php'
    }
}

ElementSearch.prototype.compileUrl = function() 
{
    return BX.util.add_url_param(this.props.url, this.props);
}

ElementSearch.prototype.dialogSearch = function() 
{
    this._dialogSearch = new BX.CDialog({
        title: 'Поиск элементов',
        width: 1350,
        height: 800,
        content_url: this.compileUrl(),
        ESD: true
    });

    this._dialogSearch.SetButtons([{
        title: BX.message('JS_CORE_WINDOW_SAVE'),
        id: 'savebtn',
        name: 'savebtn',
        className: BX.browser.IsIE() && BX.browser.IsDoctype() && !BX.browser.IsIE10() ? '' : 'adm-btn-save',
        action: () => {
        this._dialogSearch.Close();
        }
    }]);

    return this;
}

ElementSearch.prototype.getDialog = function() 
{
    return this._dialogSearch
}

ElementSearch.prototype.getEvent = function() 
{
    return this.props.event;
}

