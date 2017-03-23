/**
 * Created by Zang on 2017/3/22.
 */

Array.prototype._push = function (value) {
    this[this.length] = value;
};



String.prototype.mysplit = function (args) {
    var arrayStr = [];
    var str = this;
    var i = 10;
    while (true) {
        var flag = str.indexOf(args);
        if (flag === -1) {
            arrayStr.push(str.substring(0));
            break;
        }
        arrayStr.push(str.substring(0, flag));
        str = str.substring(flag + 1);
    }
    return arrayStr;
};
console.log(String.prototype.split);