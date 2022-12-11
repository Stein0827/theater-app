"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = exports.create_table = void 0;
exports.create_table = "CREATE TABLE IF NOT EXISTS Payments (" +
    "payment_id int NOT NULL AUTO_INCREMENT," +
    "movie_id int NOT NULL," +
    "theater_id varchar(80) NOT NULL," +
    "time varchar(20) NOT NULL," +
    "price varchar(20) NOT NULL," +
    "email varchar(20) NOT NULL," +
    "fname varchar(20) NOT NULL," +
    "lname varchar(20) NOT NULL," +
    "cardnum varchar(30) NOT NULL," +
    "seccode varchar(7) NOT NULL," +
    "cardexp varchar(8) NOT NULL," +
    "bstreet varchar(100) NOT NULL," +
    "bunit varchar(10) NOT NULL," +
    "bstate varchar(10) NOT NULL," +
    "bcountry varchar(30) NOT NULL," +
    "zip varchar(10) NOT NULL," +
    "PRIMARY KEY (payment_id));";
exports.insert = "INSERT INTO Payments (" +
    "movie_id, theater_id, time, price,email,fname, lname," +
    "cardnum, seccode, cardexp, bstreet, bunit, bstate, bcountry,zip) " +
    "VALUES (?);";
