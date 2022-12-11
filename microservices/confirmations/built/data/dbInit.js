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
exports.initDB = exports.connectDB = void 0;
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
function initDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("initing db");
        const mongo = yield connectDB();
        const db = mongo.db();
        if (yield db.listCollections({ name: 'confirmations' }).hasNext()) {
            console.log('Collection already exists. Skipping initialization.');
            return;
        }
        const confirmations = db.collection('confirmations');
        const result = yield confirmations.insertMany([
            { name: 'bruh', type: 'ehhhasdfklas', price: 22, image: "asdgkjsdg" },
            { name: 'ddd', type: 'dddd', price: 11, image: "asdfdf" },
            { name: '12312sa', type: 'zxcvdf', price: 224, image: "asdggkk" },
        ]);
        console.log(`Initialized ${result.insertedCount} products`);
        console.log(`Initialized:`);
        for (let key in result.insertedIds) {
            console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
        }
    });
}
exports.initDB = initDB;
