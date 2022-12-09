"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startupDB = exports.db = void 0;
const mysql_1 = __importDefault(require("mysql"));
require("dotenv/config");
try {
    const database = mysql_1.default.createConnection({
        host: process.env.DATABASE_URL,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });
    const sqlQuery = 'CREATE TABLE IF NOT EXISTS emails(id int AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), PRIMARY KEY(id))';
    database.query(sqlQuery, (err) => {
        if (err)
            throw err;
        console.log('Table created!');
    });
}
catch (err) {
    console.log("PLEASE BITCH");
}
exports.db = {};
function initDB() {
    exports.db["1"] = {
        id: "1",
        name: "Harry Potter and the Chamber of Comp. Sci.",
        desc: "An ancient prophecy seems to be coming true  when a mysterious presence begins stalking the corridors of a school of magic and leaving its victims paralyzed.",
        length: "2h 41m",
        rating: "PG",
        //thumbnail: new File(["foo"], "foo.txt"),
        trailer: "https://www.youtube.com/watch?v=NtMvNh0WFVM"
    };
    exports.db["2"] = {
        id: "2",
        name: "test",
        desc: "heros journey",
        length: "2h 41m",
        rating: "PG",
        //thumbnail: new File(["foo"], "foo.txt"),
        trailer: "https://www.youtube.com/watch?v=NtMvNh0WFVM"
    };
}
function startupDB() {
    // connect to db
    initDB();
}
exports.startupDB = startupDB;
