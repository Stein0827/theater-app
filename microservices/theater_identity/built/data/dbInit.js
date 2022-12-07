"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startupDB = exports.db = void 0;
exports.db = {};
function initDB() {
    exports.db["ilya"] = {
        "username": "ilya",
        "password": "$2a$10$wN1d.QZzEUV08jymXs.Am.V/l5g0Lpa8r5J4BZXRxCJmLUgmXjxJ2",
        "theaterId": "abcdefg"
    };
    exports.db["bob"] = {
        "username": "bob",
        "password": "$2a$10$yoxw/adZkv5prX3VkWimveVVzHQ3SNj5jkHFbrV7Tzk5urtpDmG62",
        "theaterId": "123456"
    };
}
function startupDB() {
    // connect to db
    initDB();
}
exports.startupDB = startupDB;
