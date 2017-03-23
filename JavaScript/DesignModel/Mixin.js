/**
 * Created by Zang on 2017/3/20.
 */

var Car = function (setting) {
    this.model = setting.model || 'no model';
    this.color = setting.color || 'no color';
};

function augment(recive, source) {
    if (arguments[2]) {
        for (var i = 2; i < arguments.length; i++) {
            recive.prototype[arguments[i]] = source.prototype[arguments[i]];
        }
    }
    else {
        for (var key in source.prototype) {
            if (!recive.prototype[key]) {
                recive.prototype[key] = source.prototype[key];
            }
        }
    }
}

var Mixin = function () {
};
Mixin.prototype = {
    sayHello: function () {
        console.log('hello');
    },
    sayHi: function () {
        console.log('hi');
    }
};

// 增加特定的方法
augment(Car, Mixin, 'sayHello');

var car1 = new Car({
    model: 'car1',
    color: 'blue'
});
car1.sayHello();    // hello
// car1.sayHi();       // car1.sayHi is not a function

// 增加所有的方法
augment(Car, Mixin);

var car2 = new Car({
    model: 'car2',
    color: 'blue'
});
car2.sayHello();    // hello
car2.sayHi();       // hi