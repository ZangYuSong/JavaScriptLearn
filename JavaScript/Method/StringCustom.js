/**
 * Created by Zang on 2017/3/22.
 */

(function () {
    // String.prototype._split = function (args) {
    //     var arrayStr = [];
    //     var str = this;
    //     var i = 10;
    //     while (true) {
    //         var flag = str.indexOf(args);
    //         if (flag === -1) {
    //             arrayStr.push(str.substring(0));
    //             break;
    //         }
    //         arrayStr.push(str.substring(0, flag));
    //         str = str.substring(flag + 1);
    //     }
    //     return arrayStr;
    // };
    String.prototype._slice = function () {
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
        var new_str = '';
        if (start > end) {
            return new_str;
        }
        for (; start < end; start++) {
            new_str += this[start];
        }
        return new_str;
    }
})();