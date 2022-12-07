"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startupDB = exports.db = void 0;
exports.db = {};
function initDB() {
    exports.db["abc"] = [
        {
            "theaterId": "abc",
            "ticketRevenue": 10000,
            "concessionsRevenue": 20000,
            "date": new Date()
        }
    ];
    exports.db["abc"].push({
        "theaterId": "abc",
        "ticketRevenue": 30000,
        "concessionsRevenue": 40000,
        "date": new Date()
    });
    exports.db["def"] = [
        {
            "theaterId": "def",
            "ticketRevenue": 50000,
            "concessionsRevenue": 60000,
            "date": new Date()
        }
    ];
}
function startupDB() {
    // connect to db
    initDB();
}
exports.startupDB = startupDB;
