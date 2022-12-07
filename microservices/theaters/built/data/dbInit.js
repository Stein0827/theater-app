"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB1 = exports.connectDB = exports.startupDB = exports.db = void 0;
exports.db = {};
function initDB() {
    exports.db["1"] = {
        id: "1",
        name: "brh.",
        address: "asdfasdf",
        movies: ["asdf", "brasdf", "aslkdfa"]
    };
    exports.db["2"] = {
        id: "2",
        name: "brddfdh.",
        address: "asdfasdf",
        movies: ["asdf", "brasdf", "aslkdfa"]
    };
}
function startupDB() {
    // connect to db
    initDB();
}
exports.startupDB = startupDB;
const mongodb_1 = require("mongodb");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = process.env.DATABASE_URL;
        if (uri === undefined) {
            throw Error('DATABASE_URL environment variable is not specified');
        }
        const mongo = new mongodb_1.MongoClient(uri);
        yield mongo.connect();
        return yield Promise.resolve(mongo);
    });
}
exports.connectDB = connectDB;
function initDB1() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongo = yield connectDB();
        const db = mongo.db();
        if (yield db.listCollections({ name: 'theaters' }).hasNext()) {
            console.log('Collection already exists. Skipping initialization.');
            return;
        }
        const theaters = db.collection('theaters');
        const result = yield theaters.insertMany([
            { name: 'bruh', address: 'ehhhasdfklas', zip: 22525, description: "asdgkjsdg", movies: ["asdfa", "lasdlkfs"] },
            { name: 'assd', address: 'asdfddd', zip: 12321, description: "asdgadsgas", movies: ["dfd", "lasdlfdfdkfs"] },
            { name: 'dfdfg', address: 'qieke', zip: 22444, description: "asdfdggb", movies: ["dd", "gggg"] },
        ]);
        console.log(`Initialized ${result.insertedCount} products`);
        console.log(`Initialized:`);
        for (let key in result.insertedIds) {
            console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
        }
    });
}
exports.initDB1 = initDB1;
