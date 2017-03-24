/**
 * Created by Zang on 2017/3/23.
 */

(function () {
    'use strict';
    var MaxSafeInteger = Number.MAX_SAFE_INTEGER;
    Array['_isArray'] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    Array.prototype._push = function () {
        var n = this.length, m = arguments.length;
        if (m + n > MaxSafeInteger) {
            throw '数组长度超过最大安全值';
        }
        for (var i = 0; i < m; i++) {
            this[n + i] = arguments[i];
        }
        var length = m + n;
        this.length = length;
        return length;
    };
    Array.prototype._remove = function () {
        var index = arguments[0];
        if (!Number._isInteger(index)) {
            throw '参数必须为整数';
        }
        var value, len = this.length;
        if (index < 0) {
            index += len;
            if (index < 0) {
                index = 0;
            }
        }
        for (var i = 0, j = 0; i < this.length; i++) {
            if (i !== index) {
                this[j++] = this[i];
            } else {
                value = this[i];
                len--;
            }
        }
        this.length = len;
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
        // 判断最终数组的长度是否超出最大安全值
        for (var i = 0; i < argsLength; i++) {
            if (Array._isArray(arguments[i])) {
                MAX += arguments[i].length;
            } else {
                MAX++;
            }
            if (MAX > MaxSafeInteger) {
                throw '数组长度超过最大安全值';
            }
        }
        var new_array = [];
        var new_array_length = 0;
        for (i = 0; i < this.length; i++) {
            new_array[new_array_length++] = this[i];
        }
        for (i = 0; i < argsLength; i++) {
            if (Array._isArray(arguments[i])) {
                for (var j = 0; j < arguments[i].length; j++) {
                    new_array[new_array_length++] = arguments[i][j];
                }
            } else {
                new_array[new_array_length++] = arguments[i];
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
        for (var i = n - 1; i >= 0; i--) {
            this[--length] = this[i];
        }
        for (i = m - 1; i >= 0; i--) {
            this[--length] = arguments[i];
        }
        return this.length;
    };
    Array.prototype._slice = function () {
        var start = arguments[0], end = this.length;
        if (arguments.length > 1) {
            end = arguments[1];
        }
        if (!Number._isInteger(start) || !Number._isInteger(end)) {
            throw '参数必须为整数';
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
        for (var i = 0; start < end; start++, i++) {
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
            throw '至少输入两个参数';
        }
        var index = arguments[0], num = arguments[1], array_len = this.length;
        if (!Number._isInteger(index) || !Number._isInteger(num) || num < 0) {
            throw '前两项参数必须为整数，且第二个参数不能小于0';
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
        for (var i = 0, k = 0; i < array_len; i++) {
            if (i !== index) {
                this[k++] = this[i];
            } else {
                for (var j = 0; j < num; j++) {
                    new_array[j] = this[i++];
                }
                i--;
            }
        }
        // 插入数据
        this.length = array_len - num - 2 + arg_len;
        if (arg_len === 2) {
            return new_array;
        }
        array_len -= num;
        for (i = this.length - 1; i >= 0; i--) {
            if (i !== index + arg_len - 3) {
                this[i] = this[--array_len];
            } else {
                for (j = arg_len - 1; j > 1; j--, i--) {
                    this[i] = arguments[j];
                }
                i++;
            }
        }
        return new_array;
    };
    Array.prototype._indexOf = function () {
        var len = this.length, start = 0;
        if (len === 0 || arguments.length < 1) {
            return -1;
        }
        if (arguments.length > 1) {
            if (!Number._isNum(arguments[1])) {
                throw '第二个参数必须为整数';
            }
            start = arguments[1];
        }
        if (start > len) {
            return -1;
        }
        if (start < 0) {
            start += len;
            if (start < 0) {
                start = 0;
            }
        }
        for (; start < len; start++) {
            if (start in this && this[start] === arguments[0]) {
                return start;
            }
        }
        return -1;
    };
    // 元素交换
    var swap = function (arr, from, to) {
        if (from === to) return;
        var temp = arr[from];
        arr[from] = arr[to];
        arr[to] = temp;
    };
    // 默认排序的方式
    var sortDefault = function (a, b) {
        return a > b ? 1 : -1;
    };
    // 选择基准元素
    var getPivot = function (arr, from, to) {
        var middle = (from + to) >> 1;
        var a = arr[from];
        var b = arr[to];
        var c = arr[middle];
        var temp;
        if (a < b) {
            temp = a;
            a = b;
            b = temp;
        }
        if (a < c) {
            temp = a;
            a = c;
            c = temp;
        }
        if (b < c) {
            temp = b;
            b = c;
            c = temp;
        }
        return b;
    };
    // 排序
    var QuickSortWithPartition = function (arr, fn, from, to) {
        if (from >= to) return;
        var pivot = getPivot(arr, from, to); // 快排序的基准元素
        var smallEnd = from;   // 小数区的终止下标
        var bigEnd = from + 1;  // 大数区的终止下标
        for (; bigEnd <= to; bigEnd++) {
            if (fn(pivot, arr[bigEnd]) > 0) {
                // 基准值比对比值大的时候进入
                // smallEnd++ 表示小数区增加一个
                // 随后交换，这样smallEnd左边的是小数，右边是大数
                smallEnd++;
                var a = bigEnd, b = smallEnd;
                // for (; a === b; a--) {
                //     if (fn(pivot, arr[a]) === 0) break;
                //     swap(arr, a, arr[a]);
                // }
                swap(arr, smallEnd, a);
            }
        }
        // 将基准元素于小数区的元素终止的元素交换，这样基准元素的右边就是大数，左边是小数
        swap(arr, smallEnd, from);
        // 递归小数区
        QuickSortWithPartition(arr, fn, from, smallEnd - 1);
        // 递归大数区
        QuickSortWithPartition(arr, fn, smallEnd + 1, to);
    };
    Array.prototype._sort = function () {
        var len = this.length;
        var fn = arguments[0] || sortDefault;
        if (len <= 0) return [];
        if (len === 1) return arr;
        QuickSortWithPartition(this, fn, 0, len - 1);
    };
})();

var test = ['a', 'c', 'w', 'e', 'r'];
test._sort(function (a, b) {
    return a < b ? 1 : -1;
});
console.log(test);