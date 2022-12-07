"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevenue = exports.theaterExists = void 0;
const dbInit_js_1 = require("../data/dbInit.js");
function theaterExists(theaterId) {
    return theaterId in dbInit_js_1.db;
}
exports.theaterExists = theaterExists;
function getRevenue(theaterId) {
    return dbInit_js_1.db[theaterId];
}
exports.getRevenue = getRevenue;
