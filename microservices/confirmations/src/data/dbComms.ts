// These will be the querying functions
import { db } from './dbInit.js';
import { ConfirmationModel } from '../models/ConfirmationModel.js';

// These functions will contain actual queries in them
export function createConfirmation(model: ConfirmationModel) {
    db[model.id as string] = model;
    return model;
}


export function deleteConfirmation(id: string) {
    delete db[id];
    return true;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}

export function getConfirmation(id: string) {
    return db[id];
}

export function getNewID() {
    const newid: string = Date.now().toString();
    return newid;
}

export function hasConfirmation(id: string) {
    if (id in db) {
        return true;
    }
    return false;
}