import mysql from 'mysql2';
import 'dotenv/config';
import * as query from './queries.js';
function connectDB() {
    try {
        const database = mysql.createConnection({
            host: process.env.MYSQL_URL,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log("SUCCESS: DB CONNECTION CREATED");
        return database;
    }
    catch (err) {
        console.log("Error: Issue connecting to the database");
    }
}
function initDB(db) {
    if (db === undefined) {
        throw console.log("ERROR: DB UNDEFINED");
    }
    db.query(query.create_table, (error, results) => {
        if (error) {
            return console.log("Create Table Error:", error.message);
        }
    });
    db.query(query.insert, [query.insert_values], (error, results) => {
        if (error) {
            return console.log("Insert Values Error: ", error);
        }
    });
}
export function startupDB() {
    const db = connectDB();
    initDB(db);
    return db;
}
