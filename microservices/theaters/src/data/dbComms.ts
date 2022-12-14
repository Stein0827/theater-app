import { connectDB } from './dbInit.js';
import { TheaterModel } from '../models/TheaterModel.js';
import { MongoClient, ObjectId } from 'mongodb';

export async function createTheater(model: TheaterModel) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const obj = {"name": model.name, "address": model.address, "zip": model.zip, "description": model.description, "movies": model.movies};
    const id = (await theaters.insertOne(obj)).insertedId;
    const res = {"id": id, "zip": model.zip};
    await mongo.close();
    return res;
}

export async function updateTheater(model: TheaterModel) {
    const objectId = new ObjectId(model.id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const _id = {"_id": objectId}
    /*
    get original doc including original movie ids array
    find movie that has been added or deleted to the original movies array
    publish event for either delete or update
    */
    const obj = {"name": model.name, "address": model.address, "zip": model.zip, "description": model.description, "movies": model.movies};
    for (const property in obj) {
        if (obj[property as keyof typeof obj] === undefined) {
            delete obj[property as keyof typeof obj];
        }
    }

    await theaters.updateOne(_id, {'$set': obj});
    await mongo.close();
    return model;
}

export async function deleteTheater(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const res = await theaters.findOneAndDelete({"_id": objectId});
    await mongo.close();
    return res;
}

export async function getTheater(id: string) {
    const objectId = new ObjectId(id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const res = await theaters.findOne({"_id": objectId});
    await mongo.close();
    return res;
}

export async function getTheatersByZip(zip: number) {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const cursor = theaters.find();
    const res: any = [];
    await cursor.forEach( mydoc => {
        if (Math.abs(+zip - +mydoc.zip) <= 75)
            res.push(mydoc)
    });
    await mongo.close();
    return res;
}


export async function getAllTheaters() {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const cursor = theaters.find();
    const res: any = [];
    await cursor.forEach( mydoc => {
        res.push(mydoc);
    });
    await mongo.close();
    return res;
}

export async function updateMoviesOfTheater(model: TheaterModel) {
    const objectId = new ObjectId(model.id);
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const _id = {"_id": objectId};
    const curr_movie = await getTheater(model.id as string);
    const res = {"movieAdded": false, "movie_id": 0, "theater_id": objectId};
    let iterable = new Set(curr_movie!.movies as number[]);
    let comparable = new Set(model!.movies as number[]);

    if (curr_movie!.movies.length < model.movies!.length) {
        res.movieAdded = true;
        iterable = new Set(model!.movies as number[]);
        comparable = new Set(curr_movie!.movies as number[]);
    }
    
    iterable.forEach((movie) => {
        if (!comparable.has(movie)) {
            res.movie_id = movie;
        }
    });

    const obj = {"movies": model.movies};
    await theaters.updateOne(_id, {'$set': obj});
    await mongo.close();
    return res;
}

export async function hasTheater(id: string): Promise<boolean> {
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    try {
        const objectId = new ObjectId(id);
        const result = await theaters.findOne({ _id: objectId });
        await mongo.close();
        return result !== null;
    } catch (err) {
        console.log(err);
        await mongo.close();
        return false;
    }
}