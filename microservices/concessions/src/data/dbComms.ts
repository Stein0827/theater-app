// These will be the querying functions
import { connectDB } from './dbInit.js';
import { ConcessionModel } from '../models/ConcessionModel';
import { MongoClient, ObjectId } from 'mongodb';
// import { db } from './dbInit.js';

// These functions will contain actual queries in them
export async function createConcession(model: ConcessionModel) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    const obj = {"name": model.name, "type": model.type, "price": model.price, "image": model.image};
    const res = await concessions.insertOne(obj);
    return res;
}

export async function updateConcession(model: ConcessionModel) {
    const objectId = new ObjectId(model.id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    const _id = {"_id": objectId}
    const obj = {"name": model.name, "type": model.type, "price": model.price, "image": model.image};
    for (const property in obj) {
        if (obj[property as keyof typeof obj] === undefined) {
            delete obj[property as keyof typeof obj];
        }
    }

    await concessions.updateOne(_id, {'$set': obj});
    return model;
    // This will look different with sql in how to update 
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}

export async function deleteConcession(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    const res = await concessions.deleteOne({"_id": objectId});
    return res;
    // With actual db, we want to first check if the movie exists in the model layer, and then delete
}

export async function getConcession(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    const res = await concessions.findOne({"_id": objectId});
    return res;
}

export async function getAllConcessions() {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    const cursor = concessions.find();
    const res: any = []
    await cursor.forEach( mydoc => {
        res.push(mydoc);
    });
    return res;
}

export async function hasConcession(id: string): Promise<boolean> {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    try {
        const objectId = new ObjectId(id);
        const result = await concessions.findOne({ _id: objectId });
        return result !== null;
    } catch (err) {
        // ObjectId.isValid() will return false for invalid ID strings
        console.log(err);
        return false;
    }
}