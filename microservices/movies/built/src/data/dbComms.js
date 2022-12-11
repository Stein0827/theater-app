import { db } from '../index.js';
export function createMovie(model) {
    const values = [model.name, model.desc, model.length, model.rating, model.thumbnail, model.trailer];
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO Movies (name,`desc`,length,rating,thumbnail,trailer) VALUES (?);", [values], (error, result) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            model.id = result.insertId;
            resolve(model);
        });
    });
}
export function updateMovie(model) {
    const updateVariablesString = model.getUpdateString();
    return new Promise((resolve, reject) => {
        db.query("UPDATE Movies SET " + updateVariablesString + " WHERE movie_id = " + model.id + ";", (error, result) => {
            console.log(error);
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(result);
        });
    });
}
export function deleteMovie(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM Movies WHERE movie_id=?;", [id], (error) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(true);
        });
    });
}
export function getMovie(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Movies WHERE movie_id=?;", [id], (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(results[0]);
        });
    });
}
export function getallMovies() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Movies;", (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            resolve(results);
        });
    });
}
export function hasMovie(id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Movies WHERE movie_id=?;", [id], (error, results) => {
            if (error) {
                reject(new DatabaseException(error.message));
            }
            if (results.length === 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
}
class DatabaseException {
    constructor(message) {
        this.name = "Database Exception";
        this.message = message;
    }
}
