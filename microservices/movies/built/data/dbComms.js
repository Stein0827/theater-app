"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasMovie = exports.getallMovies = exports.getNewID = exports.getMovie = exports.deleteMovie = exports.updateMovie = exports.createMovie = void 0;
// These will be the querying functions
const dbInit_js_1 = require("./dbInit.js");
// These functions will contain actual queries in them
function createMovie(model) {
    dbInit_js_1.db[model.id] = model;
    return model;
}
exports.createMovie = createMovie;
function updateMovie(model) {
    dbInit_js_1.db[model.id] = model;
    return model;
    // This will look different with sql in how to update 
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
exports.updateMovie = updateMovie;
function deleteMovie(id) {
    delete dbInit_js_1.db[id];
    return true;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
exports.deleteMovie = deleteMovie;
function getMovie(id) {
    return dbInit_js_1.db[id];
}
exports.getMovie = getMovie;
function getNewID() {
    const newid = Date.now().toString();
    return newid;
}
exports.getNewID = getNewID;
function getallMovies() {
    return dbInit_js_1.db;
}
exports.getallMovies = getallMovies;
function hasMovie(id) {
    if (id in dbInit_js_1.db) {
        return true;
    }
    return false;
}
exports.hasMovie = hasMovie;
