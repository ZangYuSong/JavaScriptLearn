/**
 * Created by Zang on 2017/3/12.
 */
var basketModel = (function () {
    // 私有
    var _items = [];
    var _addItem = function (item) {
        _items.push(item);
    };
    var _getItemCount = function () {
        console.log(_items.length);
    };
    var _getTotalPrices = function () {
        if (_items.length === 0) {
            console.log('购物车为空');
            return;
        }
        var totalPrices = 0.0;
        _items.forEach(function (item) {
            totalPrices += item.number * item.prices;
        });
        console.log(totalPrices);
    };
    return {
        // 公有
        addItem: _addItem,
        getItemCount: _getItemCount,
        getTotalPrices: _getTotalPrices
    };
})();

basketModel.addItem({
    name: 'JavaScript设计模式',
    number: 1,
    prices: 49.00
});
basketModel.addItem({
    name: '精通AngularJS',
    number: 1,
    prices: 79.00
});
basketModel.getItemCount(); // 2
basketModel.getTotalPrices(); // 128
console.log(basketModel._items); // undefined