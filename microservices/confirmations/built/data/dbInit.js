"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startupDB = exports.db = void 0;
exports.db = {};
function initDB() {
    exports.db["1"] = {
        id: "1",
        movieId: "1231925sdfs",
        theaterId: "alwekjkalset12",
        creditCard: "91231ksdlg",
        address: "123dlfjkads",
        price: "44",
        email: "xiuquanshi@umass.edu",
    };
    exports.db["2"] = {
        id: "2",
        movieId: "asdfsdfasd",
        theaterId: "dfdfdfdfd",
        creditCard: "12321ass",
        address: "xzcvzxcvzxcv",
        price: "555",
        email: "xiuquanshi@umass.edu"
    };
}
function startupDB() {
    // connect to db
    initDB();
}
exports.startupDB = startupDB;
