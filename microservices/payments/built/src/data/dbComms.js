"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPayment = exports.getPayment = exports.createPayment = void 0;
const index_js_1 = require("../index.js");
const queries_js_1 = require("./queries.js");
function createPayment(model) {
    const values = Object.values(model);
    values.shift();
    return new Promise((resolve, reject) => {
        index_js_1.db.query(queries_js_1.insert, [values], (error, result) => {
            console.log(error);
            if (error) {
                reject(new DatabaseException(error.message));
            }
            model.payment_id = result.insertId;
            resolve(model);
        });
    });
}
exports.createPayment = createPayment;
function getPayment(id) {
    return new Promise((resolve, reject) => {
        index_js_1.db.query("SELECT * FROM Payments WHERE payment_id=?;", [id], (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(results[0]);
        });
    });
}
exports.getPayment = getPayment;
function hasPayment(id) {
    return new Promise((resolve, reject) => {
        index_js_1.db.query("SELECT * FROM Payments WHERE payment_id=?;", [id], (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            if (results.length === 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}
exports.hasPayment = hasPayment;
class DatabaseException {
    constructor(message) {
        this.name = "Database Exception";
        this.message = message;
    }
}
