/**
 * Created by Zang on 2017/3/20.
 */

var model = (function () {
    var private = {
        i: 5,
        get: function () {
            return this.i;
        },
        set: function (val) {
            this.i = val;
        },
        run: function () {
            console.log('running');
        }
    };
    return {
        facade: function (args) {
            if (args.run) {
                private.run();
                private.set(args.val);
                console.log(private.get());
            }
        }
    };
})();

// 这就是一个外观模式，开发者只需要使用 facade 方法，就可以执行函数内部的一大串程序。
model.facade({run: true, val: 10});

