// These will be the querying functions
import { OperationsModel } from '../models/operationsModel';
import { MongoClient, ObjectId } from 'mongodb';
import { connectDB } from './dbInit.js';
import { Logistics, MongoDoc } from '../types';

export async function createMovieops(model: OperationsModel) { //create operation and logistics for theater and movie
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const obj = { "theater_id": model.theater_id, "operations": [{movie_id: model.movie_id, logistics: model.operations}]};
    const res = await movieops.insertOne(obj);
    await mongo.close();
    return res;
}


export async function updateOperations(theaterid: string, ops: any) { // updates the logistics of a movie and theater, changes logistics or adds time if not there
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const res = await movieops.updateOne({"theater_id": theaterid}, {$set: {"operations": ops}});
    await mongo.close();
    return res;
}

export async function addOperation(model: OperationsModel) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const obj = { "movie_id": model.movie_id, "logistics": model.operations };
    const res = await movieops.updateOne({"theater_id": model.theater_id}, {'$push': { "operations" : obj}});
    await mongo.close();
    return res;
}


export async function deleteOperations(movie_id: number, theater_id: string) { // deletes a movie operation from theater
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const res = await movieops.deleteOne({"theater_id": theater_id, "operations.movie_id": movie_id});
    await mongo.close();
    return res;
}

export async function getOperations(model: OperationsModel) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('movieops');
    const doc = await concessions.findOne({theater_id: model.theater_id});
    await mongo.close();
    return doc;
}

export async function hasTheater(movie_id: number, theaterid: string) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const doc = await movieops.findOne({theater_id: theaterid});
    await mongo.close();

    if (doc === null) {
        return false;
    }

    return true;
}

export async function getAllOperations() {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const cursor = movieops.find();
    const res: any = []
    await cursor.forEach( mydoc => {
        res.push(mydoc);
    });
    await mongo.close();
    return res;
}

