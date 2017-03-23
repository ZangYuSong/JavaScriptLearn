/**
 * Created by Zang on 2017/3/13.
 * 通过 extend(new Subject(), concreteSubject) 创建具体目标
 * 通过 AddNewObserver() 创建新的观察者，并将观察者加入具体目标
 *
 * 目标是一个 checkbox，观察者也是一个 checkout
 * 当目标 checkbox.checked 发生变化的时候，通知所有的观察者做出相应的改变
 */

// 观察者
function Observer() {
    this.observerList = [];
}
Observer.prototype.Add = function (obj) {
    this.observerList.push(obj);
};
Observer.prototype.Count = function () {
    return this.observerList.length;
};
Observer.prototype.Get = function (index) {
    if (index > -1 && index < this.Count()) {
        return this.observerList[index];
    }
};

// 目标
function Subject() {
    this.observer = new Observer();
}
Subject.prototype.AddObserver = function (obj) {
    this.observer.Add(obj);
};
Subject.prototype.Notify = function (context) {
    for (var i = 0; i < this.observer.Count(); i++) {
        this.observer.Get(i).Update(context);
    }
};

// 属性扩展
function extend(obj, extension) {
    for (var key in obj) {
        extension[key] = obj[key];
    }
}

var concreteSubject;
window.onload = function () {
    var addNewObserver = document.getElementById('addNewObserver');
    concreteSubject = document.getElementById('concreteSubject');
    var concreteObserver = document.getElementById('concreteObserver');
    addNewObserver['onclick'] = AddNewObserver;
    // 创建具体目标 concreteSubject
    extend(new Subject(), concreteSubject);
    concreteSubject['onclick'] = new Function("concreteSubject.Notify(concreteSubject.checked)");
    // 添加新的观察者
    function AddNewObserver() {
        var check = document.createElement('input');
        check.type = 'checkbox';
        // 创建具体的观察者 check
        extend(new Observer(), check);
        check.Update = function (value) {
            this.checked = value;
        };
        concreteSubject.AddObserver(check); // 加入具体目标
        concreteObserver.appendChild(check);
    }
};
