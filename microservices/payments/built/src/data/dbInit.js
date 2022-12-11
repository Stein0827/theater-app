"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startupDB = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv/config");
const query = __importStar(require("./queries"));
function connectDB() {
    try {
        const database = mysql2_1.default.createConnection({
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
}
function startupDB() {
    const db = connectDB();
    initDB(db);
    return db;
}
exports.startupDB = startupDB;
