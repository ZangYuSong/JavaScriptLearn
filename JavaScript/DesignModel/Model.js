/**
 * Created by Zang on 2017/3/12.
 * 通过 Model 模式模拟实现购物车
 */
var basketModel = (function () {
    // 私有
    var _items = [];
    return {
        // 公有
        addItem: function (item) {
            _items.push(item);
        },
        getItemCount: function () {
            console.log(_items.length);
        },
        getTotalPrices: function () {
            if (_items.length === 0) {
                console.log('购物车为空');
                return;
            }
            var totalPrices = 0.0;
            _items.forEach(function (item) {
                totalPrices += item.number * item.prices;
            });
            console.log(totalPrices);
        }
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