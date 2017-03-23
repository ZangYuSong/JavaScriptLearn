/**
 * Created by Zang on 2017/3/21.
 */

// Tom同学生病了，让别人帮忙向老师Joke请假
var Student = function (name, teacher) {
    this.name = name;
    this.send = function () {
        console.log(teacher.name + ' 老师，' + this.name + '同学生病了，请假一天！');
    };
};

var Teacher = function (name) {
    this.name = name;
};

var Proxy = function (studentName, teacherName) {
    this.send = function () {
        (new Student(studentName, new Teacher(teacherName))).send();
    };
};


var proxy = new Proxy('Tom', 'Joke');
proxy.send();   // Joke 老师，Tom同学生病了，请假一天！

// 虚拟代理 虚拟代理是把一些开销很大的对象，延迟到真正需要它的时候才去创建执行
// 例如：做一个文件同步的功能，当我们选中一个文件时，就同步到另外一台备用服务器上
// 文件同步函数
var syncFile = function (id) {
    console.log("开始同步文件，id为：" + id);
};

// 使用代理合并同步请求
var proxySyncFile = (function () {
    var cache = [], timer = null;
    return function (id) {
        cache.push(id);
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            syncFile(cache.join(','));
            cache = [];
            timer = null;
            clearTimeout(cache);
        }, 3000);
    };
})();

window.onload = function () {
    var checkbox = document.getElementsByName("input");
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].onclick = function () {
            if (this.checked === true) {
                proxySyncFile(this.id);
            }
        };
    }
};

// 缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以返回前面的运算结果。
// 示例: 为加法创建缓存代理

var plus = function () {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
};

var createProxyFactory = function (fn) {
    var cache = [];
    return function () {
        var args = Array.prototype.join.call(arguments, '-');
        if (args in cache) {
            console.log('使用缓存代理');
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    }
};

var proxyPlus = createProxyFactory(plus);
// 10
console.log(proxyPlus(1, 2, 3, 4));
// 使用缓存代理 10
console.log(proxyPlus(1, 2, 3, 4));