import { connectDB } from './dbInit.js';
import { TheaterLocateException } from '../models/theaterLocationModel.js';
export async function getTheaters(zipcode) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    //TODO: test if findOne does not find element
    const theaters = await theaterLocations.findOne({ "zipcode": zipcode });
    await mongo.close();
    return theaters === null || theaters === void 0 ? void 0 : theaters.theaters;
}
export async function hasZipCode(zipcode) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const hasZipCode = await theaterLocations.find({ zipcode: zipcode }).hasNext();
    await mongo.close();
    return hasZipCode;
}
export async function addTheaterZipcode(theater) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const zipcode = theater["zip"];
    const theaterWithZip = await theaterLocations.findOne({ zipcode: zipcode });
    if (theaterWithZip) {
        theaterWithZip.theaters = theaterWithZip.theaters.push(zipcode);
    }
    else {
        await createZipEntry(zipcode, theater.id);
    }
}
export async function createZipEntry(zipcode, theaterId) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const entry = {
        zipcode,
        theaters: [theaterId]
    };
    const res = await theaterLocations.insertOne(entry);
    await mongo.close();
    if (!res.acknowledged) {
        throw new TheaterLocateException("Failed to insert theater zipcode", [`${zipcode}`]);
    }
}
export async function removeTheaterZipcode(data) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const zipcode = data.zip;
    const theaterId = data.theaterId;
    const theatersWithZip = await theaterLocations.findOne({ zipcode: zipcode });
    if (!theatersWithZip) {
        throw new TheaterLocateException("Failed to delete theater, zipcode does not exist", [`${zipcode}`]);
    }
    const theaterIds = theatersWithZip.theaters;
    // remove theaterId from list
    theaterIds.splice(theaterIds.indexOf(theaterId), 1);
    theatersWithZip.theaters = theaterIds;
    const updatedList = await theaterLocations.updateOne({ zipcode: zipcode }, { '$set': theatersWithZip });
    await mongo.close();
    return updatedList;
}
