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
        var n = this.length,
            m = arguments.length;
        if (m + n > MaxSafeInteger) {
            throw new TypeError();
        }
        for (var i = 0; i < m; i++) {
            this[n + i] = arguments[i];
        }
        var length = m + n;
        this.length = length;
        return length;
    };
    Array.prototype._remove = function () {
        var index = parseInt(arguments[0]) ? parseInt(arguments[0]) : 0,
            value,
            len = this.length;
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
        var MAX = this.length,
            argsLength = arguments.length;
        // 判断最终数组的长度是否超出最大安全值
        for (var i = 0; i < argsLength; i++) {
            if (Array._isArray(arguments[i])) {
                MAX += arguments[i].length;
            } else {
                MAX++;
            }
            if (MAX > MaxSafeInteger) {
                throw new TypeError();
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
        var n = this.length,
            m = arguments.length;
        if (m + n > MaxSafeInteger) {
            throw new TypeError();
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
        var len = this.length,
            start = parseInt(arguments[0]) ? parseInt(arguments[0]) : 0,
            end = parseInt(arguments[1]) ? parseInt(arguments[1]) : len;
        if (start < 0) {
            start += len;
            if (start < 0) {
                start = 0;
            }
        }
        if (end < 0) {
            end += len;
            if (end < 0) {
                end = 0;
            }
        }
        if (end > len) {
            end = len;
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
        var start = 0,
            end = this.length - 1,
            temp;
        for (; start < end; start++, end--) {
            temp = this[end];
            this[end] = this[start];
            this[start] = temp;
        }
        return this;
    };
    Array.prototype._splice = function () {
        var arg_len = arguments.length,
            array_len = this.length,
            index = parseInt(arguments[0]) ? parseInt(arguments[0]) : 0,
            num = parseInt(arguments[1]) ? (parseInt(arguments[1]) < 0 ? 0 : parseInt(arguments[1])) : 0;
        if (arguments.length === 0) return [];
        // 起始下标
        if (index < 0) {
            index += array_len;
            if (index < 0) {
                index = 0;
            }
        }
        // 删除个数
        if (index + num > array_len) {
            num = array_len - index;
        }
        // 删除
        var new_array = [];
        if (num > 0) {
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
        }
        // 插入数据
        this.length = array_len - num + (arg_len < 2 ? 0 : arg_len - 2);
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
        var len = this.length,
            start = parseInt(arguments[1]) ? parseInt(arguments[1]) : 0;
        if (len === 0 || arguments.length < 1) {
            return -1;
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
    Array.prototype._lastIndexOf = function () {
        var len = this.length,
            start = parseInt(arguments[1]) ? parseInt(arguments[1]) : len - 1
        if (len === 0 || arguments.length < 1) {
            return -1;
        }
        if (start < 0) {
            return -1;
        }
        if (start > len - 1) {
            start -= len;
            if (start > len - 1) {
                start = len - 1;
            }
        }
        for (; start < len; start--) {
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
        return a > b ? 1 : a === b ? 0 : -1;
    };
    // 选择基准元素
    var getPivot = function (arr, fn, from, to) {
        var a = from,
            b = (from + to) >> 1,
            c = to,
            temp;
        if (fn(arr[a], arr[b]) < 0) {
            temp = a;
            a = b;
            b = temp;
        }
        if (fn(arr[a], arr[c]) < 0) {
            temp = a;
            a = c;
            c = temp;
        }
        if (fn(arr[b], arr[c]) < 0) {
            temp = b;
            b = c;
            c = temp;
        }
        if (from !== b) {
            temp = arr[from];
            arr[from] = arr[b];
            arr[b] = temp;
        }
        return arr[from];
    };
    // 排序
    var QuickSortWithPartition = function (arr, fn, from, to) {
        if (from >= to) return;
        var pivot = getPivot(arr, fn, from, to), // 快排序的基准元素
            smallEnd = from,    // 小数区的终止下标
            bigEnd = from + 1,  // 大数区的终止下标
            pivotTrue = 0;      // 实际小数区的终止下标
        for (; bigEnd <= to; bigEnd++) {
            if (fn(arr[bigEnd], pivot) < 0) {
                // 基准值比对比值大的时候进入
                // smallEnd++ 表示小数区增加一个
                // 随后交换，这样smallEnd左边的是小数，右边是大数
                smallEnd++;
                swap(arr, smallEnd, bigEnd);
                if (pivotTrue !== 0) {
                    // 小于和等于的元素在基准元素左边
                    // 必须保持 pivotTrue 与 smallEnd 之间的元素等于基准元素，其在左边的最右边
                    // 例如 4为基准元素 左边区域目前为 2,4,4,1交换后为  2,1,4,4
                    // 交换之后保持所有等于基准元素排列在一起 pivotTrue++
                    swap(arr, smallEnd, pivotTrue);
                    pivotTrue++;
                }
            }
            else if (fn(arr[bigEnd], pivot) === 0) {
                smallEnd++;
                swap(arr, smallEnd, bigEnd);
                if (pivotTrue === 0) {
                    pivotTrue = smallEnd;
                }
            }
        }
        // 将基准元素于小数区的元素终止的元素交换，这样基准元素的右边就是大数，左边是小数
        pivotTrue--;
        swap(arr, pivotTrue > 0 ? pivotTrue : smallEnd, from);
        // 递归小数区
        QuickSortWithPartition(arr, fn, from, pivotTrue === -1 ? smallEnd - 1 : pivotTrue - 1);
        // 递归大数区
        QuickSortWithPartition(arr, fn, smallEnd + 1, to);
    };
    Array.prototype._sort = function () {
        var len = this.length,
            fn = arguments[0] || sortDefault;
        if (len < 2) return;
        QuickSortWithPartition(this, fn, 0, len - 1);
    };
    Array.prototype._join = function () {
        var separator = arguments[0] || ',',
            len = this.length,
            result = '';
        for (var i = 0; i < len; i++) {
            result += this[i];
            if (i !== len - 1) {
                result += separator;
            }
        }
        return result;
    };
    Array.prototype._forEach = function () {
        if (typeof arguments[0] !== "function") {
            throw new TypeError();
        }
        var len = this.length,
            fn = arguments[0],
            thisP = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                fn.call(thisP, this[i], i, this);
            }
        }
    };
    Array.prototype._filter = function () {
        var len = this.length;
        if (typeof arguments[0] !== "function") {
            throw new TypeError();
        }
        if (len === 0) {
            return [];
        }
        var fn = arguments[0],
            res = [],
            thisP = arguments[1];
        for (var i = 0; i < len; i++) {
            var val = this[i];
            if (fn.call(thisP, val, i, this)) {
                res.push(val);
            }
        }
        return res;
    };
    Array.prototype._every = function () {
        var len = this.length;
        if (typeof arguments[0] !== "function") {
            throw new TypeError();
        }
        if (len === 0) {
            return false;
        }
        var fn = arguments[0],
            thisP = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this && !fn.call(thisP, this[i], i, this)) {
                return false;
            }
        }
        return true;
    };
    Array.prototype._some = function () {
        var len = this.length;
        if (typeof arguments[0] !== "function") {
            throw new TypeError();
        }
        if (len === 0) {
            return false;
        }
        var fn = arguments[0],
            thisP = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this && fn.call(thisP, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
    Array.prototype._map = function () {
        var len = this.length;
        if (typeof arguments[0] !== "function") {
            throw new TypeError();
        }
        if (len === 0) {
            return [];
        }
        var fn = arguments[0],
            thisP = arguments[1],
            res = [];
        for (var i = 0; i < len; i++) {
            res[i] = fn.call(thisP, this[i], i, this);
        }
        return res;
    };
    Array.prototype._reduce = function () {
        var len = this.length;
        if (typeof arguments[0] !== "function") {
            throw new TypeError();
        }
        if (len === 0 && arguments.length === 1) {
            return 0;
        }
        var fn = arguments[0],
            res, i = 0;
        if (arguments[1]) {
            res = arguments[1];
        } else {
            res = this[0];
            i++;
        }
        for (; i < len; i++) {
            res = fn.call(null, res, this[i], i, this);
        }
        return res;
    };
    Array.prototype._reduceRight = function () {
        var len = this.length;
        if (typeof arguments[0] !== "function") {
            throw new TypeError();
        }
        if (len === 0 && arguments.length === 1) {
            return 0;
        }
        var fn = arguments[0],
            res, i = len - 1;
        if (arguments[1]) {
            res = arguments[1];
        } else {
            res = this[i];
            i--;
        }
        for (; i >= 0; i--) {
            res = fn.call(null, res, this[i], i, this);
        }
        return res;
    };
})();