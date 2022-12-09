import { connectDB } from './dbInit.js';
import { MongoClient} from 'mongodb';

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
    console.log(`false inside of hasZIP: ${hasZipCode}`);
    await mongo.close();
    return hasZipCode;
}

// export function updateZipCode(zipcode: string, theaterIDs: string[]) {
//     db[zipcode] = theaterIDs;
// }