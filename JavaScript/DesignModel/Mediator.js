/**
 * Created by Zang on 2017/3/14.
 */

var Mediator = (function () {
    var topics = {};
    // uuid 标识符生成器
    var generatorUUID = function () {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    // 订阅者构造函数
    var Subscriber = function (namespace, fn) {
        var uuid = generatorUUID();
        if (!topics[namespace]) {
            topics[namespace] = {};
        }
        topics[namespace][uuid] = {
            namespace: namespace,
            uuid: uuid,
            fn: fn
        };
        return uuid;
    };
    // 获取订阅者信息
    var GetSubscriber = function (uuid) {
        var subscriber = null;
        for (var k in topics) {
            if (topics[k][uuid]) {
                subscriber = topics[k][uuid];
            }
        }
        return subscriber;
    };
    // 传播信息
    var Publish = function (namespace, data, from, to) {
        if (!namespace) {
            for (var k in topics) {
                for (var l in topics[k]) {
                    topics[k][l].fn(data, GetSubscriber(from), GetSubscriber(l));
                }
            }
        } else if (!to) {
            for (var k in topics[namespace]) {
                topics[namespace][k].fn(data, GetSubscriber(from), GetSubscriber(k));
            }
        } else {
            topics[namespace][to].fn(data, GetSubscriber(from), GetSubscriber(to));
        }
    };

    return {
        Subscriber: Subscriber,
        Publish: Publish
    };
})();

var fn = function (data, from, to) {
    console.log(from.namespace + ':' + from.uuid + ' 发送消息 ：' + data + ' 发送给 ' + to.uuid);
};

// A1的uuid为：97304d19-83bf-467c-b866-b3546e91a1b3
// A2的uuid为：c3d3d371-8ba7-47ca-b8db-5a40b00d9bb2
// B的uuid为：75f26c2c-0f12-4bc3-ace0-f48108148975
var A1 = Mediator.Subscriber('A', fn);
console.log('A1的uuid为：' + A1);
var A2 = Mediator.Subscriber('A', fn);
console.log('A2的uuid为：' + A2);
var B = Mediator.Subscriber('B', fn);
console.log('B的uuid为：' + B);

// A:97304d19-83bf-467c-b866-b3546e91a1b3 发送消息 ：你好 发送给 97304d19-83bf-467c-b866-b3546e91a1b3
// A:97304d19-83bf-467c-b866-b3546e91a1b3 发送消息 ：你好 发送给 c3d3d371-8ba7-47ca-b8db-5a40b00d9bb2
// A:97304d19-83bf-467c-b866-b3546e91a1b3 发送消息 ：你好 发送给 75f26c2c-0f12-4bc3-ace0-f48108148975
Mediator.Publish('', '你好', A1);
// A:97304d19-83bf-467c-b866-b3546e91a1b3 发送消息 ：你好 发送给 97304d19-83bf-467c-b866-b3546e91a1b3
// A:97304d19-83bf-467c-b866-b3546e91a1b3 发送消息 ：你好 发送给 c3d3d371-8ba7-47ca-b8db-5a40b00d9bb2
Mediator.Publish('A', '你好', A1);
// A:97304d19-83bf-467c-b866-b3546e91a1b3 发送消息 ：你好 发送给 c3d3d371-8ba7-47ca-b8db-5a40b00d9bb2
Mediator.Publish('A', '你好', A1, A2);
// B:75f26c2c-0f12-4bc3-ace0-f48108148975 发送消息 ：你好 发送给 75f26c2c-0f12-4bc3-ace0-f48108148975
Mediator.Publish('B', '你好', B);
// 报错 在B这个命名空间中没有A2
Mediator.Publish('B', '你好', B, A2);

