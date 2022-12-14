import { connectDB } from './dbInit.js';
import { MongoClient, ObjectId} from 'mongodb';
import { DeletionData, TheaterData } from '../types';
import { TheaterLocateException } from '../models/theaterLocationModel.js';

export async function getTheaters(zipcode: string): Promise<string[]> {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const theaters = await theaterLocations.findOne({"zipcode": zipcode});
    await mongo.close();
    return theaters?.theaters;
}

export async function hasZipCode(zipcode: string) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    
    const hasZipCode = await theaterLocations.find({zipcode: zipcode}).hasNext();
    await mongo.close();
    return hasZipCode;
}

export async function addTheaterZipcode(theater: TheaterData) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const zipcode = theater["zip" as keyof typeof theater];
    let ret: string | ObjectId;

    const theaterWithZip = await theaterLocations.findOne({zipcode: zipcode});
    if (theaterWithZip) {
        theaterWithZip.theaters = theaterWithZip.theaters.push(zipcode);
        ret = zipcode;
    } else {
        ret = await createZipEntry(zipcode as string, theater.theaterId);
    }
    await mongo.close();
    return ret;
}

export async function createZipEntry(zipcode: string, theaterId: string) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    
    const entry = {
        zipcode,
        theaters: [theaterId]
    }

    const res = await theaterLocations.insertOne(entry);
    if (!res.acknowledged) {
        throw new TheaterLocateException("Failed to insert theater zipcode", [`${zipcode}`]);
    }

    await mongo.close();
    return res.insertedId;
}

export async function removeTheaterZipcode(data: DeletionData) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLocations = db.collection('theaterLocations');
    const zipcode = data.zip;
    const theaterId = data.theaterId;

    const theatersWithZip = await theaterLocations.findOne({zipcode: zipcode});
    if (!theatersWithZip) {
        throw new TheaterLocateException("Failed to delete theater, zipcode does not exist", [`${zipcode}`])
    }

    const theaterIds = theatersWithZip.theaters;
    // remove theaterId from list
    theaterIds.splice(theaterIds.indexOf(theaterId), 1);
    theatersWithZip.theaters = theaterIds;

    const updatedList = await theaterLocations.updateOne({zipcode: zipcode}, {'$set': theatersWithZip });
    await mongo.close();
    return updatedList;
}