/**
 * Created by Zang on 2017/3/13.
 */
var pubSub = {};

(function (q) {
    var topics = {}, subUid = -1;
    // 发布者
    q.publish = function (topic, args) {
        if (!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic];
        subscribers.forEach(function (item) {
            item.Event(item, args);
        });
    };
    // 订阅者
    q.subscribe = function (topic, Event, name) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        var obj = {
            name: name,
            topic: topic,
            token: token,
            Event: Event
        };
        topics[topic].push(obj);
        return obj;
    };
    // 取消订阅
    q.unSubscribe = function (obj) {
        for (var i = 0; i < topics[obj.topic].length; i++) {
            if (topics[obj.topic][i] === obj) {
                topics[obj.topic].splice(i, 1);
                return;
            }
        }
    };
})(pubSub);

var message = function (item, data) {
    console.log(item.name + ':' + item.topic + ':' + item.token + ':' + data);
};

var subscribeA1 = pubSub.subscribe('A', message, 'subscribeA1');
var subscribeA2 = pubSub.subscribe('A', message, 'subscribeA2');
var subscribeB = pubSub.subscribe('B', message, 'subscribeB');

// subscribeA1:A:0:hello
// subscribeA2:A:1:hello
pubSub.publish('A', 'hello');

// subscribeB:B:2:hello
pubSub.publish('B', 'hello');

// subscribeA1:A:0:hi
// subscribeA2:A:1:hi
// subscribeA3:A:3:hi
var subscribeA3 = pubSub.subscribe('A', message, 'subscribeA3');
pubSub.publish('A', 'hi');

// subscribeA1:A:0:hi,helo
// subscribeA3:A:3:hi,helo
pubSub.unSubscribe(subscribeA2);
pubSub.publish('A', 'hi,helo');