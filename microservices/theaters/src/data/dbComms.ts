import { connectDB } from './dbInit.js';
import { TheaterModel } from '../models/TheaterModel.js';
import { MongoClient, ObjectId } from 'mongodb';

export async function createTheater(model: TheaterModel) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const obj = {"name": model.name, "address": model.address, "zip": model.zip, "description": model.description, "movies": model.movies};
    const res = await theaters.insertOne(obj);
    return res;
}

export async function updateTheater(model: TheaterModel) {
    const objectId = new ObjectId(model.id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const _id = {"_id": objectId}
    const obj = {"name": model.name, "address": model.address, "zip": model.zip, "description": model.description, "movies": model.movies};
    for (const property in obj) {
        if (obj[property as keyof typeof obj] === undefined) {
            delete obj[property as keyof typeof obj];
        }
    }

    await theaters.updateOne(_id, {'$set': obj});
    return model;
}

export async function deleteTheater(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const res = await theaters.deleteOne({"_id": objectId});
    return res;
}

export async function getTheater(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const res = await theaters.findOne({"_id": objectId});
    return res;
}

export async function getAllTheaters() {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const cursor = theaters.find();
    const res: any = []
    await cursor.forEach( mydoc => {
        res.push(mydoc);
    });
    return res;
}

export async function hasTheater(id: string): Promise<boolean> {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    try {
        const objectId = new ObjectId(id);
        const result = await theaters.findOne({ _id: objectId });
        return result !== null;
    } catch (err) {
        console.log(err);
        return false;
    }
}