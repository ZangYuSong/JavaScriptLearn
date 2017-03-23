/**
 * Created by Zang on 2017/3/12.
 */

var singleton = (function () {
    var instance = null;
    var init = function () {
        var _privateRandomNumber = Math.random();
        return {
            getPrivateRandomNumber: function () {
                return _privateRandomNumber;
            }
        };
    };
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

var badSingleton = (function () {
    var instance = null;
    var init = function () {
        var _privateRandomNumber = Math.random();
        return {
            getPrivateRandomNumber: function () {
                return _privateRandomNumber;
            }
        };
    };
    return {
        getInstance: function () {
            instance = init();
            return instance;
        }
    };
})();

var singletonA = singleton.getInstance();
var singletonB = singleton.getInstance();
console.log(singletonA.getPrivateRandomNumber() === singletonB.getPrivateRandomNumber());   // true

var badSingletonA = badSingleton.getInstance();
var badSingletonB = badSingleton.getInstance();
console.log(badSingletonA.getPrivateRandomNumber() === badSingletonB.getPrivateRandomNumber());   // false