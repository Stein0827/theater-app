import { connectDB } from './dbInit.js';
import { ConcessionModel } from '../models/ConcessionModel';
import { MongoClient, ObjectId } from 'mongodb';

export async function createConcession(model: ConcessionModel) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    const obj = {"name": model.name, "type": model.type, "price": model.price, "image": model.image};
    const res = await concessions.insertOne(obj);
    await mongo.close();
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
    await mongo.close();
    return model;
}

export async function deleteConcession(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    const res = await concessions.deleteOne({"_id": objectId});
    return res;
}

export async function getConcession(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    const res = await concessions.findOne({"_id": objectId});
    await mongo.close();
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
    await mongo.close();
    return res;
}

export async function hasConcession(id: string): Promise<boolean> {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('concessions');
    try {
        const objectId = new ObjectId(id);
        const result = await concessions.findOne({ _id: objectId });
        await mongo.close();
        return result !== null;
    } catch (err) {
        console.log(err);
        await mongo.close();
        return false;
    }
}