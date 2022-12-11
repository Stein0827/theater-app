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
exports.hasConfirmation = exports.getConfirmation = exports.deleteConfirmation = exports.createConfirmation = void 0;
const dbInit_js_1 = require("./dbInit.js");
const mongodb_1 = require("mongodb");
// These functions will contain actual queries in them
function createConfirmation(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const confirmations = db.collection('confirmations');
        const obj = { "movieId": model.movieId, "theaterId": model.theaterId, "creditCard": model.creditCard, "address": model.address, "price": model.price, "email": model.email };
        const res = yield confirmations.insertOne(obj);
        yield mongo.close();
        return res;
    });
}
exports.createConfirmation = createConfirmation;
function deleteConfirmation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectId = new mongodb_1.ObjectId(id);
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const confirmations = db.collection('confirmations');
        const res = yield confirmations.deleteOne({ "_id": objectId });
        yield mongo.close();
        return res;
        // With actual db, we want to first check if the movie exists in the model layer, and then delete
    });
}
exports.deleteConfirmation = deleteConfirmation;
function getConfirmation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const objectId = new mongodb_1.ObjectId(id);
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const confirmations = db.collection('confirmations');
        const res = yield confirmations.findOne({ "_id": objectId });
        yield mongo.close();
        return res;
    });
}
exports.getConfirmation = getConfirmation;
function hasConfirmation(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongo = yield (0, dbInit_js_1.connectDB)();
        const db = mongo.db();
        const confirmations = db.collection('confirmations');
        try {
            const objectId = new mongodb_1.ObjectId(id);
            const result = yield confirmations.findOne({ _id: objectId });
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
exports.hasConfirmation = hasConfirmation;
