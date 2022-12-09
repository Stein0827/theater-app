import { connectDB } from './dbInit.js';
import { MongoClient} from 'mongodb';
import { AdminException } from '../models/adminModel.js';

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