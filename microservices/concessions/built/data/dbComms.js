// These will be the querying functions
import { db } from './dbInit.js';
// These functions will contain actual queries in them
export function createConcession(model) {
    db[model.id] = model;
    return model;
}
export function updateConcession(model) {
    db[model.id] = model;
    return model;
    // This will look different with sql in how to update 
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
export function deleteConcession(id) {
    delete db[id];
    return true;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
export function getConcession(id) {
    return db[id];
}
export function getNewID() {
    const newid = Date.now().toString();
    return newid;
}
export function getAllConcessions() {
    return db;
}
export function hasConcession(id) {
    if (id in db) {
        return true;
    }
    return false;
}
