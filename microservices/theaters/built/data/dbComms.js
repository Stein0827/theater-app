// These will be the querying functions
import { db } from './dbInit.js';
// These functions will contain actual queries in them
export function createTheater(model) {
    db[model.id] = model;
    return model;
}
export function updateTheater(model) {
    db[model.id] = model;
    return model;
    // This will look different with sql in how to update 
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
export function deleteTheater(id) {
    delete db[id];
    return true;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}
export function getTheater(id) {
    return db[id];
}
export function getNewID() {
    const newid = Date.now().toString();
    return newid;
}
export function getAllTheaters() {
    return db;
}
export function hasTheater(id) {
    if (id in db) {
        return true;
    }
    return false;
}
