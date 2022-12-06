import { db } from '../data/dbInit.js';

export function getTheaters(zipcode: string): string[] {
    return db[zipcode]
}

export function hasZipCode(zipcode:string): boolean {
    return zipcode in db;
}

export function updateZipCode(zipcode: string, theaterIDs: string[]) {
    db[zipcode] = theaterIDs;
}


