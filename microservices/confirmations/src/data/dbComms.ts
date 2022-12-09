// These will be the querying functions
import { ConfirmationModel } from '../models/ConfirmationModel.js';
import { connectDB } from './dbInit.js';
import { MongoClient, ObjectId } from 'mongodb';
// These functions will contain actual queries in them
export async function createConfirmation(model: ConfirmationModel) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const confirmations = db.collection('confirmations');
    const obj = {"movieId": model.movieId, "theaterId": model.theaterId, "creditCard": model.creditCard, "address": model.address, "price": model.price, "email": model.email};
    const res = await confirmations.insertOne(obj);
    await mongo.close();
    return res;
}


export async function deleteConfirmation(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const confirmations = db.collection('confirmations');
    const res = await confirmations.deleteOne({"_id": objectId});
    await mongo.close();
    return res;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}

export async function getConfirmation(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const confirmations = db.collection('confirmations');
    const res = await confirmations.findOne({"_id": objectId});
    await mongo.close();
    return res;
}


export async function hasConfirmation(id: string) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const confirmations = db.collection('confirmations');
    try {
        const objectId = new ObjectId(id);
        const result = await confirmations.findOne({ _id: objectId });
        await mongo.close();
        return result !== null;
    } catch (err) {
        console.log(err);
        await mongo.close();
        return false;
    }
}