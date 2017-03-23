/**
 * Created by Zang on 2017/3/21.
 */

/**
 * 书籍管理
 * 书籍基本属性：id title author price
 * 书籍状态：availability(可用) checkoutDate(借出日期) checkoutMember(借出人) dueReturnDate(归还时间)
 */
// 没有优化之前
function Book(id, title, author, checkoutDate, checkoutMember, dueReturnDate, availability) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = dueReturnDate;
    this.availability = availability;
}

Book.prototype = {
    getID: function () {
        return this.id;
    },
    getTitle: function () {
        return this.title;
    },
    getAuthor: function () {
        return this.author;
    },
    // 更新书籍的状态
    updateCheckoutStatus: function (checkoutDate, checkoutMember, dueReturnDate, availability) {
        this.checkoutDate = checkoutDate;
        this.checkoutMember = checkoutMember;
        this.dueReturnDate = dueReturnDate;
        this.availability = availability;
    },
    // 续借书籍
    extendCheckoutPeriod: function (dueReturnDate) {
        this.dueReturnDate = dueReturnDate;
    },
    // 是否到期
    isPastDue: function (id) {
        var currentDate = new Date();
        return currentDate.getTime() > Date.parse(this.dueReturnDate);
    }
};

/********************************************************************/
// 优化目标函数，剥离外部数据
function Book(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
}

Book.prototype = {
    getID: function () {
        return this.id;
    },
    getTitle: function () {
        return this.title;
    },
    getAuthor: function () {
        return this.author;
    }
};

// 控制该类的实例化的工厂
var BookFactory = (function () {
    var existingBooks = {};
    return {
        createBook: function (id, title, author) {
            /*查找之前是否创建*/
            var existingBook = existingBooks[id];
            if (existingBook) {
                return existingBook;
            } else {
                /* 如果没有，就创建一个，然后保存*/
                var book = new Book(id, title, author);
                existingBooks[id] = book;
                return book;
            }
        }
    }
})();

// 数据的管理器
var BookRecordManager = (function () {
    var bookRecordDatabase = {};
    return {
        /*添加借书记录*/
        addBookRecord: function (id, title, author, checkoutDate, checkoutMember, dueReturnDate, availability) {
            var book = BookFactory.createBook(id, title, author);
            bookRecordDatabase[id] = {
                checkoutMember: checkoutMember,
                checkoutDate: checkoutDate,
                dueReturnDate: dueReturnDate,
                availability: availability,
                book: book
            };
        },
        // 更新书籍的状态
        updateCheckoutStatus: function (id, checkoutDate, checkoutMember, dueReturnDate, availability) {
            bookRecordDatabase[id].availability = availability;
            bookRecordDatabase[id].checkoutDate = checkoutDate;
            bookRecordDatabase[id].checkoutMember = checkoutMember;
            bookRecordDatabase[id].dueReturnDate = dueReturnDate;
        },
        // 续借书籍
        extendCheckoutPeriod: function (id, dueReturnDate) {
            bookRecordDatabase[id].dueReturnDate = dueReturnDate;
        },
        // 是否到期
        isPastDue: function (id) {
            var currentDate = new Date();
            return currentDate.getTime() > Date.parse(bookRecordDatabase[id].dueReturnDate);
        }
    };
})();