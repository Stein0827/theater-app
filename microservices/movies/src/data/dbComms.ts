import { OkPacket } from 'mysql2';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { db } from '../index.js';
import { MovieModel } from '../models/movieModel.js';
import { IMovie } from '../types.js';
import { insert } from './queries.js'

export function createMovie(model: MovieModel) {
    const values: string[] = [model.name as string, model.desc as string, model.length as string, model.rating as string, model.thumbnail as string, model.trailer as string];
    console.log("values", values);
    return new Promise((resolve, reject) => {
        (db as Connection).query<OkPacket>(
        "INSERT INTO Movies (name,`desc`,length,rating,thumbnail,trailer) VALUES (?);", 
        [values], (error, result) => {                
            if (error) {
                reject(new DatabaseException(error.message));
            }
            
            model.id = result.insertId;
            resolve(model);
        });        
    });
}

export function updateMovie(model: MovieModel) {
    const updateVariablesString = model.getUpdateString();
    return new Promise((resolve, reject) => {
        (db as Connection).query<OkPacket>(
            "UPDATE Movies SET " + updateVariablesString + " WHERE movie_id = " + model.id + ";",
            (error, result) => {
            console.log(error);
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(result);
        });
    });
}

export function deleteMovie(id: number) {
    return new Promise((resolve, reject) => {
        (db as Connection).query<OkPacket>(
            "DELETE FROM Movies WHERE movie_id=?;", [id],
            (error) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(true);
        });
    });
}

export function getMovie(id: number): any {
    return new Promise((resolve, reject) => {
        (db as Connection).query<IMovie[]>(
            "SELECT * FROM Movies WHERE movie_id=?;", [id],
            (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(results[0]);
        });
    });
}

export function getallMovies() {
    return new Promise((resolve, reject) => {
        (db as Connection).query<IMovie[]>(
            "SELECT * FROM Movies;",
            (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(results);
        });
    });
}

export function hasMovie(id: number) {
    return new Promise<boolean>((resolve, reject) => {
        (db as Connection).query<IMovie[]>(
            "SELECT * FROM Movies WHERE movie_id=?;", [id],
            (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            if (results.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });  
}

class DatabaseException{
    name: string;
    message: string;

    constructor (message:string) {
        this.name = "Database Exception";
        this.message = message;
    }
}