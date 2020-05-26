function settingsAddStore(a)
{
    var example = BX('store-example').cloneNode(true);
    var container = BX('stores');

    BX.adjust(example, {props: {id: ''}, style: {display: 'block'}});
    container.appendChild(example);
}