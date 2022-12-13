import { connectDB } from './dbInit.js';
import { MongoClient} from 'mongodb';
import { AdminException } from '../models/adminModel.js';
import { paymentCreated, theaterCreated, theaterDeleted } from '../../eventTypes';

export async function theaterExists(theaterId: string) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');

    const theaterExists = await theaterAdmin.find({theaterId: theaterId}).hasNext();
    await mongo.close();
    return theaterExists;
}

export async function getRevenue(theaterId: string) {
    // check if theater exists
    if (!(await theaterExists(theaterId))) {
        throw new AdminException("Can not get revenue: theater does not exist", [theaterId as string]);
    }
    
     // connect to db
     const mongo: MongoClient = await connectDB();
     const db = mongo.db();
     const theaterAdmin = db.collection('theaterAdmin');
 
     const theaterRevenue = await theaterAdmin.findOne({theaterId: theaterId});
     await mongo.close();
     return theaterRevenue?.revenue;
}

export async function addRevenue(revenue: paymentCreated) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');
    
    const theaterId = revenue.eventData.theater_id;
    const date = new Date(revenue.eventData.date!);
    const ticketRev = revenue.eventData.tickets;
    const concessionRev = revenue.eventData.concession;
    const theaterObj = await theaterAdmin.findOne({theaterId: theaterId});
    
    if (!theaterObj) {
        throw new AdminException("Can not add revenue: theater does not exist", [theaterId as string]);
    }

    const theaterRev = theaterObj?.revenue;
    const revObjIndex = theaterRev.findIndex((revObj: {ticketRevenue: number, concessionRevenue: number, date: Date}) => revObj.date.toDateString() === date.toDateString());

    if (revObjIndex !== -1) {
        const revObj = theaterRev[revObjIndex];
        revObj.ticketRevenue += ticketRev;
        revObj.concessionsRevenue += concessionRev;
        theaterRev[revObjIndex] = revObj;
    } else {
        const revEntry = {
            ticketRevenue: ticketRev,
            concessionRevenue: concessionRev,
            date: date
        }
        theaterRev.push(revEntry);
    }

    theaterObj.revenue = theaterRev;
    const res = await theaterAdmin.updateOne({"theaterId" : theaterId}, {'$set': theaterObj});
    
    await mongo.close();
    return res;
}

export async function createTheaterRev(theaterData: theaterCreated) {
    // check if theater exists
    if ((await theaterExists(theaterData.eventData.theater_id))) {
        throw new AdminException("Can not create theater: theater already exists", [theaterData.eventData.theater_id as string]);
    }
    
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');

    const theaterId = theaterData.eventData.theater_id;
    const theaterRevEntry = {
        theaterId,
        revenue: []
    }

    console.log(`THEATER CREATED: ${JSON.stringify(theaterRevEntry)}`);

    const res = await theaterAdmin.insertOne(theaterRevEntry);
    await mongo.close();
    return res;
}

export async function deleteTheaterRev(theaterData: theaterDeleted) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');

    const theaterId = theaterData.eventData.theater_id;

    console.log(`THEATER DELETED: ${JSON.stringify(theaterId)}`);


    const res = await theaterAdmin.deleteOne({theaterId: theaterId});
    await mongo.close();
    return res;
}