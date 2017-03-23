/**
 * Created by Zang on 2017/3/23.
 */

(function () {
    'use strict';
    Number['_isInteger'] = function (obj) {
        return typeof obj === 'number' && obj % 1 === 0;
    };
    Number['_isNum'] = function (obj) {
        return typeof obj === 'number'
    };
})();