/**
 * Created by Zang on 2017/3/20.
 */

function MacBook() {
    this.size = 13;
    this.ram = 4;
}

function Ram(macbook, num) {
    macbook.ram += num;
}

function Size(macbook, num) {
    macbook.size += num;
}

// 17英寸4GB内存
var macbook1 = new MacBook();
Size(macbook1, 4);
// MacBook {size: 17, ram: 4}
console.log(macbook1);

// 15英寸16GB内存
var macbook2 = new MacBook();
Size(macbook2, 2);
Ram(macbook2, 12);
// MacBook {size: 15, ram: 16}
console.log(macbook2);