import { connectDB } from './dbInit.js';
export async function createMovieops(model) {
    const mongo = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const obj = { "theater_id": model.theater_id, "operations": [] };
    const res = await movieops.insertOne(obj);
    await mongo.close();
    return res;
}
export async function updateOperations(theaterid, ops) {
    const mongo = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const res = await movieops.updateOne({ "theater_id": theaterid }, { $set: { "operations": ops } });
    await mongo.close();
    return res;
}
export async function addOperation(model) {
    const mongo = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const obj = { "movie_id": model.movie_id, "logistics": model.operations };
    const res = await movieops.updateOne({ "theater_id": model.theater_id }, { '$push': { "operations": obj } });
    await mongo.close();
    return res;
}
export async function getOperations(model) {
    const mongo = await connectDB();
    const db = mongo.db();
    const concessions = db.collection('movieops');
    const doc = await concessions.findOne({ theater_id: model.theater_id });
    await mongo.close();
    return doc;
}
export async function hasTheater(movie_id, theaterid) {
    const mongo = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const doc = await movieops.findOne({ theater_id: theaterid });
    await mongo.close();
    if (doc === null) {
        return false;
    }
    return true;
}
export async function getAllOperations() {
    const mongo = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const cursor = movieops.find();
    const res = [];
    await cursor.forEach(mydoc => {
        res.push(mydoc);
    });
    await mongo.close();
    return res;
}
export async function deleteOperations(movie_id, theater_id) {
    const mongo = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const res = await movieops.deleteOne({ "theater_id": theater_id, "operations.movie_id": movie_id });
    await mongo.close();
    return res;
}
export async function deleteTheaterOperations(theaterId) {
    const mongo = await connectDB();
    const db = mongo.db();
    const movieops = db.collection('movieops');
    const res = await movieops.deleteOne({ "theater_id": theaterId });
    await mongo.close();
    return res;
}
