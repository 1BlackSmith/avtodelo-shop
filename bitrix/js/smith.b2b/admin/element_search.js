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
        url: '/bitrix/admin/cat_product_search_dialog.php',
        title: 'Каталог товаров',
        buttons: [
            {
                title: BX.message('JS_CORE_WINDOW_SAVE'),
                id: 'savebtn',
                name: 'savebtn',
                className: BX.browser.IsIE() && BX.browser.IsDoctype() && !BX.browser.IsIE10() ? '' : 'adm-btn-save',
                action: () => {
                    this._dialogSearch.Close();
                }
            }
        ]
    }
}

ElementSearch.prototype.compileUrl = function() 
{
    return BX.util.add_url_param(this.props.url, this.props);
};

ElementSearch.prototype.dialogSearch = function() 
{
    this._dialogSearch = new BX.CDialog({
        content_url: this.compileUrl(),
        title: this.props.title,
        height: Math.max(500, window.innerHeight-400),
        width: Math.max(800, window.innerWidth-400),
        draggable: true,
        resizable: true,
        min_height: 500,
        min_width: 800
    });
    this._dialogSearch.SetTitle(this.props.title);
    this._dialogSearch.SetButtons(this.props.buttons);

    return this;
};

ElementSearch.prototype.refreshDialog = function()
{
    this._dialogSearch.Close();
    this.dialogSearch().getDialog().Show();
};

ElementSearch.prototype.getDialog = function() 
{
    return this._dialogSearch;
};

ElementSearch.prototype.getEvent = function() 
{
    return this.props.event;
};

