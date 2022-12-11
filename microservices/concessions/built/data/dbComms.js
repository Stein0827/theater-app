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
exports.hasConcession = exports.getAllConcessions = exports.getConcession = exports.deleteConcession = exports.updateConcession = exports.createConcession = void 0;
const dbInit_js_1 = require("./dbInit.js");
const mongodb_1 = require("mongodb");
function createConcession(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const concessions = db.collection('concessions');
        const obj = { "name": model.name, "type": model.type, "price": model.price, "image": model.image };
        const res = yield concessions.insertOne(obj);
        yield mongo.close();
        return res;
    });
}
exports.createConcession = createConcession;
function updateConcession(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectId = new mongodb_1.ObjectId(model.id);
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const concessions = db.collection('concessions');
        const _id = { "_id": objectId };
        const obj = { "name": model.name, "type": model.type, "price": model.price, "image": model.image };
        for (const property in obj) {
            if (obj[property] === undefined) {
                delete obj[property];
            }
        }
        yield concessions.updateOne(_id, { '$set': obj });
        yield mongo.close();
        return model;
    });
}
exports.updateConcession = updateConcession;
function deleteConcession(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectId = new mongodb_1.ObjectId(id);
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const concessions = db.collection('concessions');
        const res = yield concessions.deleteOne({ "_id": objectId });
        yield mongo.close();
        return res;
    });
}
exports.deleteConcession = deleteConcession;
function getConcession(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectId = new mongodb_1.ObjectId(id);
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const concessions = db.collection('concessions');
        const res = yield concessions.findOne({ "_id": objectId });
        yield mongo.close();
        return res;
    });
}
exports.getConcession = getConcession;
function getAllConcessions() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const concessions = db.collection('concessions');
        const cursor = concessions.find();
        const res = [];
        yield cursor.forEach(mydoc => {
            res.push(mydoc);
        });
        yield mongo.close();
        return res;
    });
}
exports.getAllConcessions = getAllConcessions;
function hasConcession(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const concessions = db.collection('concessions');
        try {
            const objectId = new mongodb_1.ObjectId(id);
            const result = yield concessions.findOne({ _id: objectId });
            yield mongo.close();
            return result !== null;
        }
        catch (err) {
            console.log(err);
            yield mongo.close();
            return false;
        }
    });
}
exports.hasConcession = hasConcession;
