"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasConfirmation = exports.getNewID = exports.getConfirmation = exports.deleteConfirmation = exports.createConfirmation = void 0;
// These will be the querying functions
const dbInit_js_1 = require("./dbInit.js");
// These functions will contain actual queries in them
function createConfirmation(model) {
    dbInit_js_1.db[model.id] = model;
    return model;
}
exports.createConfirmation = createConfirmation;
function deleteConfirmation(id) {
    delete dbInit_js_1.db[id];
    return true;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
exports.deleteConfirmation = deleteConfirmation;
function getConfirmation(id) {
    return dbInit_js_1.db[id];
}
exports.getConfirmation = getConfirmation;
function getNewID() {
    const newid = Date.now().toString();
    return newid;
}
exports.getNewID = getNewID;
function hasConfirmation(id) {
    if (id in dbInit_js_1.db) {
        return true;
    }
    return false;
}
exports.hasConfirmation = hasConfirmation;
