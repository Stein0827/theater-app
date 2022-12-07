import { db } from '../data/dbInit.js';

export function theaterExists(theaterId: string) {
    return theaterId in db;
}

export function getRevenue(theaterId: string) {
    return db[theaterId];
}