import { connectDB } from './dbInit.js';
import { AdminException } from '../models/adminModel.js';
export async function theaterExists(theaterId) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');
    const theaterExists = await theaterAdmin.find({ theaterId: theaterId }).hasNext();
    await mongo.close();
    return theaterExists;
}
export async function getRevenue(theaterId) {
    // check if theater exists
    if (!(await theaterExists(theaterId))) {
        throw new AdminException("Can not get revenue: theater does not exist", [theaterId]);
    }
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');
    const theaterRevenue = await theaterAdmin.findOne({ theaterId: theaterId });
    await mongo.close();
    return theaterRevenue === null || theaterRevenue === void 0 ? void 0 : theaterRevenue.revenue;
}
export async function addRevenue(revenue) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');
    const theaterId = revenue.eventData.theater_id;
    const date = new Date(revenue.eventData.date);
    const ticketRev = revenue.eventData.tickets;
    const concessionRev = revenue.eventData.concession;
    const theaterObj = await theaterAdmin.findOne({ theaterId: theaterId });
    if (!theaterObj) {
        throw new AdminException("Can not add revenue: theater does not exist", [theaterId]);
    }
    const theaterRev = theaterObj === null || theaterObj === void 0 ? void 0 : theaterObj.revenue;
    const revObjIndex = theaterRev.findIndex((revObj) => revObj.date.toDateString() === date.toDateString());
    if (revObjIndex !== -1) {
        const revObj = theaterRev[revObjIndex];
        revObj.ticketRevenue += ticketRev;
        revObj.concessionsRevenue += concessionRev;
        theaterRev[revObjIndex] = revObj;
    }
    else {
        const revEntry = {
            ticketRevenue: ticketRev,
            concessionRevenue: concessionRev,
            date: date
        };
        theaterRev.push(revEntry);
    }
    theaterObj.revenue = theaterRev;
    const res = await theaterAdmin.updateOne({ "theaterId": theaterId }, { '$set': theaterObj });
    await mongo.close();
    return res;
}
export async function createTheaterRev(theaterData) {
    // check if theater exists
    if ((await theaterExists(theaterData.eventData.theater_id))) {
        throw new AdminException("Can not create theater: theater already exists", [theaterData.eventData.theater_id]);
    }
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');
    const theaterId = theaterData.eventData.theater_id;
    const theaterRevEntry = {
        theaterId,
        revenue: []
    };
    const res = await theaterAdmin.insertOne(theaterRevEntry);
    await mongo.close();
    return res;
}
export async function deleteTheaterRev(theaterData) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterAdmin = db.collection('theaterAdmin');
    const theaterId = theaterData.eventData.theater_id;
    const res = await theaterAdmin.deleteOne({ theaterId: theaterId });
    await mongo.close();
    return res;
}
