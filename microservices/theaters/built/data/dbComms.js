"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTheater = exports.getAllTheaters = exports.getNewID = exports.getTheater = exports.deleteTheater = exports.updateTheater = exports.createTheater = void 0;
const dbInit_js_1 = require("./dbInit.js");
// These functions will contain actual queries in them
function createTheater(model) {
    dbInit_js_1.db[model.id] = model;
    return model;
}
exports.createTheater = createTheater;
function updateTheater(model) {
    dbInit_js_1.db[model.id] = model;
    return model;
    // This will look different with sql in how to update 
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
exports.updateTheater = updateTheater;
function deleteTheater(id) {
    delete dbInit_js_1.db[id];
    return true;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
exports.deleteTheater = deleteTheater;
function getTheater(id) {
    return dbInit_js_1.db[id];
}
exports.getTheater = getTheater;
function getNewID() {
    const newid = Date.now().toString();
    return newid;
}
exports.getNewID = getNewID;
function getAllTheaters() {
    return dbInit_js_1.db;
}
exports.getAllTheaters = getAllTheaters;
function hasTheater(id) {
    if (id in dbInit_js_1.db) {
        return true;
    }
    return false;
}
exports.hasTheater = hasTheater;
