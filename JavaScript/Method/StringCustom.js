/**
 * Created by Zang on 2017/3/22.
 */

(function () {
    String.prototype._slice = function () {
        var len = this.length,
            start = parseInt(arguments[0]) ? parseInt(arguments[0]) : 0,
            end = parseInt(arguments[1]) ? parseInt(arguments[1]) : len;
        if (len === 0) {
            return '';
        }
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
        var new_str = '';
        if (start > end) {
            return new_str;
        }
        for (; start < end; start++) {
            new_str += this[start];
        }
        return new_str;
    };
    String.prototype._indexOf = function () {
        var len = this.length,
            arr = arguments[0],
            from = parseInt(arguments[1]) ? parseInt(arguments[1]) : 0,
            flag = false,
            result = -1;
        if (len === 0) return '';
        if (from < 0) from = 0;
        for (var i = from; i < len; i++) {
            if (this[i] === arr[0]) {
                flag = true;
                for (var j = 1; j < arr.length; j++) {
                    if (this[i + j] !== arr[j]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    result = i;
                    break;
                }
            }
        }
        return result;
    };
    String.prototype._split = function () {
        var arrayStr = [],
            str = this.valueOf(),
            i = 10,
            args = arguments[0] || '';
        while (true) {
            var flag = str._indexOf(args);
            if (flag === -1) {
                arrayStr.push(str._slice(0));
                break;
            }
            arrayStr.push(str._slice(0, flag));
            str = str._slice(flag + 1);
        }
        return arrayStr;
    };
    String.prototype._substr = function () {
        var len = this.length,
            start = parseInt(arguments[0]) ? parseInt(arguments[0]) : 0,
            end = parseInt(arguments[1]) ? parseInt(arguments[1]) : len;
        if (len === 0 || end < 0) {
            return '';
        }
        if (start < 0) {
            start += len;
            if (start < 0) {
                start = 0;
            }
        }
        len = (end + start) > len ? len : end + start;
        var new_str = '';
        for (; start < len; start++) {
            new_str += this[start];
        }
        return new_str;
    };
    String.prototype.isIDCord = function () {
        var value = this.valueOf();
        if (!value || !/^\d{6}(19|20)\d{9}(\d|X)$/i.test(value)) {
            return false;
        }
        // 校验生日
        var birthday = value._slice(6, 10) + '-' + value._slice(10, 12) + '-' + value._slice(12, 14);
        if (new Date(birthday).toString() === 'Invalid Date' || new Date(birthday).toString() === 'NaN') {
            return false;
        }
        // 校验地区 只校验省份
        var city = {
            11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
            21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
            33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
            42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
            51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
            63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
        };
        if (!city[value._slice(0, 2)]) {
            return false;
        }
        // 校验码
        var code = value.split('');
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        for (var i = 0; i < code.length - 1; i++) {
            sum += parseInt(code[i]) * factor[i];
        }
        if (parity[sum % 11] !== code[17]) {
            return false;
        }
        return true;
    };
})();