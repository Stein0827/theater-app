// These will be the querying functions
import { db } from './dbInit.js';
import { TheaterModel } from '../models/TheaterModel.js';

// These functions will contain actual queries in them
export function createTheater(model: TheaterModel) {
    db[model.id as string] = model;
    return model;
}

export function updateTheater(model: TheaterModel) {
    db[model.id as string] = model;
    return model;
    // This will look different with sql in how to update 
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}

export function deleteTheater(id: string) {
    delete db[id];
    return true;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}

export function getTheater(id: string) {
    return db[id];
}

export function getNewID() {
    const newid: string = Date.now().toString();
    return newid;
}

export function getAllTheaters() {
    return db;
}

export function hasTheater(id: string) {
    if (id in db) {
        return true;
    }
    return false;
}