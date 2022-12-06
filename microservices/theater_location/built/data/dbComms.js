import { db } from '../data/dbInit.js';
export function getTheaters(zipcode) {
    return db[zipcode];
}
export function hasZipCode(zipcode) {
    return zipcode in db;
}
export function updateZipCode(zipcode, theaterIDs) {
    db[zipcode] = theaterIDs;
}
