/**
 * Created by Zang on 2017/3/23.
 */

(function () {
    'use strict';
    var MaxSafeInteger = Number.MAX_SAFE_INTEGER;
    Array.prototype._push = function () {
        var n = this.length, m = arguments.length;
        if (m + n > MaxSafeInteger) {
            throw '数组长度超过最大安全值';
        }
        for (var i = 0; i < m; i += 1) {
            this[n + i] = arguments[i];
        }
        var length = m + n;
        this.length = length;
        return length;
    };
    Array.prototype._remove = function (index) {
        if (!Number._isInteger(index) || index > this.length) {
            throw '参数必须为整数';
        }
        var value;
        for (var i = 0, j = 0; i < this.length; i++) {
            if (i !== index) {
                this[j++] = this[i];
            } else {
                value = this[i];
            }
        }
        this.length -= 1;
        return value;
    };
    Array.prototype._pop = function () {
        var n = this.length;
        if (n === 0) {
            return;
        }
        n--;
        var value = this[n];
        this._remove(n);
        return value;
    };
    Array.prototype._shift = function () {
        if (this.length === 0) {
            return;
        }
        var value = this[0];
        this._remove(0);
        return value;
    };
    Array.prototype._concat = function () {
        var MAX = this.length;
        var argsLength = arguments.length;
        for (var i = 0; i < argsLength; i += 1) {
            if (!(arguments[i] instanceof Array)) {
                throw '参数类型出错';
            }
            MAX += arguments[i].length;
            if (MAX > MaxSafeInteger) {
                throw '数组长度超过最大安全值';
            }
        }
        var new_array = [];
        var new_array_length = 0;
        for (i = 0; i < this.length; i += 1) {
            new_array[new_array_length] = this[i];
            new_array_length += 1;
        }
        for (i = 0; i < argsLength; i += 1) {
            for (var j = 0; j < arguments[i].length; j += 1) {
                new_array[new_array_length] = arguments[i][j];
                new_array_length += 1;
            }
        }
        new_array.length = new_array_length;
        return new_array;
    };
    Array.prototype._unshift = function () {
        var n = this.length, m = arguments.length;
        if (m + n > MaxSafeInteger) {
            throw '数组长度超过最大安全值';
        }
        var length = m + n;
        this.length = length;
        for (var i = n - 1; i >= 0; i -= 1) {
            this[--length] = this[i];
        }
        for (i = m - 1; i >= 0; i -= 1) {
            this[--length] = arguments[i];
        }
        return this.length;
    };
    Array.prototype._slice = function () {
        var start = arguments[0], end = arguments[0];
        if (isNaN(start) || isNaN(end)) {
            throw '参数类型出错';
        }
        var len = this.length;
        if (start < 0) {
            start += len;
            if (start < 0) {
                start = 0;
            }
        } else {
            if (start > len) {
                start = len;
            }
        }
        if (end < 0) {
            end += len;
            if (end < 0) {
                end = 0;
            }
        } else {
            if (end > len) {
                end = len;
            }
        }
        var new_array = [];
        if (start > end) {
            return new_array;
        }
        new_array.length = end - start;
        for (var i = 0; start < end; start += 1, i += 1) {
            new_array[i] = this[start];
        }
        return new_array;
    };
    Array.prototype._reverse = function () {
        var start = 0, end = this.length - 1, temp;
        for (; start < end; start++, end--) {
            temp = this[end];
            this[end] = this[start];
            this[start] = temp;
        }
        return this;
    };
    Array.prototype._splice = function () {
        var arg_len = arguments.length;
        if (arg_len < 2) {
            throw '参数输入有误';
        }
        var index = arguments[0], num = arguments[1], array_len = this.length;
        if (isNaN(index) || isNaN(num) || num < 0) {
            throw '参数输入有误';
        }
        // 起始下标
        if (index < 0) {
            index += array_len;
            if (index < 0) {
                index = 0;
            }
        } else {
            if (index > array_len) {
                index = array_len;
            }
        }
        // 删除个数
        if (index + num > array_len) {
            num = array_len - index;
        }
        // 删除
        var new_array = [];
        new_array.length = num;
        for (var i = 0, k = 0; i < array_len; i += 1) {
            if (i !== index) {
                this[k++] = this[i];
            } else {
                for (var j = 0; j < num; j += 1) {
                    new_array[j] = this[i++];
                }
                i -= 1;
            }
        }
        // 插入数据
        this.length = array_len - num - 2 + arg_len;
        if (arg_len === 2) {
            return new_array;
        }
        array_len -= num;
        for (i = this.length - 1; i >= 0; i -= 1) {
            if (i !== index + arg_len - 3) {
                this[i] = this[--array_len];
            } else {
                for (j = arg_len - 1; j > 1; j -= 1, i -= 1) {
                    this[i] = arguments[j];
                }
                i += 1;
            }
        }
        return new_array;
    };
    Array.prototype._indexOf = function () {
        var len = this.length, start = 0;
        if (len === 0) {
            return -1;
        }
        if (arguments[1] < 0) {
            start += len;
            if (start < 0) {
                start = 0;
            }
        } else {
            start = arguments[1];
        }
    };
})();

var test = [1, 2, 3, '5'];
var ss = test._remove('-4');
console.log(ss);
console.log(test);