// These will be the querying functions
import { db } from './dbInit.js';
import { ConcessionModel } from '../models/ConcessionModel.js';

// These functions will contain actual queries in them
export function createConcession(model: ConcessionModel) {
    db[model.id as string] = model;
    return model;
}

export function updateConcession(model: ConcessionModel) {
    db[model.id as string] = model;
    return model;
    // This will look different with sql in how to update 
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}

export function deleteConcession(id: string) {
    delete db[id];
    return true;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}

export function getConcession(id: string) {
    return db[id];
}

export function getNewID() {
    const newid: string = Date.now().toString();
    return newid;
}

export function getAllConcessions() {
    return db;
}

export function hasConcession(id: string) {
    if (id in db) {
        return true;
    }
    return false;
}