import { connectDB } from './dbInit.js';
import { ObjectId } from 'mongodb';
export async function createTheater(model) {
    const mongo = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const obj = { "name": model.name, "address": model.address, "zip": model.zip, "description": model.description, "movies": model.movies };
    const id = (await theaters.insertOne(obj)).insertedId;
    const res = { "id": id, "zip": model.zip };
    await mongo.close();
    return res;
}
export async function updateTheater(model) {
    const objectId = new ObjectId(model.id);
    const mongo = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const _id = { "_id": objectId };
    /*
    get original doc including original movie ids array
    find movie that has been added or deleted to the original movies array
    publish event for either delete or update
    */
    const obj = { "name": model.name, "address": model.address, "zip": model.zip, "description": model.description, "movies": model.movies };
    for (const property in obj) {
        if (obj[property] === undefined) {
            delete obj[property];
        }
    }
    await theaters.updateOne(_id, { '$set': obj });
    await mongo.close();
    return model;
}
export async function deleteTheater(id) {
    const objectId = new ObjectId(id);
    const mongo = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const res = await theaters.findOneAndDelete({ "_id": objectId });
    await mongo.close();
    return res;
}
export async function getTheater(id) {
    const objectId = new ObjectId(id);
    const mongo = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const res = await theaters.findOne({ "_id": objectId });
    await mongo.close();
    return res;
}
export async function getAllTheaters() {
    const mongo = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const cursor = theaters.find();
    const res = [];
    await cursor.forEach(mydoc => {
        res.push(mydoc);
    });
    await mongo.close();
    return res;
}
export async function updateMoviesOfTheater(model) {
    const objectId = new ObjectId(model.id);
    const mongo = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    const _id = { "_id": objectId };
    const curr_movie = await getTheater(model.id);
    const res = { "movieAdded": false, "id": 0 };
    let iterable = new Set(curr_movie.movies);
    let comparable = new Set(model.movies);
    if (curr_movie.movies.length < model.movies.length) {
        res.movieAdded = true;
        iterable = new Set(model.movies);
        comparable = new Set(curr_movie.movies);
    }
    iterable.forEach((movie) => {
        if (!comparable.has(movie)) {
            res.id = movie;
        }
    });
    const obj = { "movies": model.movies };
    await theaters.updateOne(_id, { '$set': obj });
    await mongo.close();
    return res;
}
export async function hasTheater(id) {
    const mongo = await connectDB();
    const db = mongo.db();
    const theaters = db.collection('theaters');
    try {
        const objectId = new ObjectId(id);
        const result = await theaters.findOne({ _id: objectId });
        await mongo.close();
        return result !== null;
    }
    catch (err) {
        console.log(err);
        await mongo.close();
        return false;
    }
}
