/**
 * Created by Zang on 2017/3/21.
 */

var clientObject = {
    str1: 'foo',
    str2: 'bar',
    str3: 'baz'
};
function interfaceMethod(str1, str2, str3) {
    console.log(str1 + ' ' + str2 + ' ' + str3);
}

// 把clientObject作为参数传递给interfaceMethod，需要用到适配器
function clientToInterfaceAdapter(o) {
    interfaceMethod(o.str1, o.str2, o.str3);
}