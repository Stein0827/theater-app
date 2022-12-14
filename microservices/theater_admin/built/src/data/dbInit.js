import { MongoClient, ObjectId } from 'mongodb';
export async function connectDB() {
    const uri = process.env.DATABASE_URL;
    if (uri === undefined) {
        throw Error('DATABASE_URL environment variable is not specified');
    }
    const mongo = new MongoClient(uri);
    await mongo.connect();
    return await Promise.resolve(mongo);
}
export async function initDB() {
    console.log("Initializing database");
    const mongo = await connectDB();
    const db = mongo.db();
    if (await db.listCollections({ name: 'theaterAdmin' }).hasNext()) {
        console.log('Collection already exists. Skipping initialization.');
        return;
    }
    const theaterAdmin = db.collection('theaterAdmin');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterday2 = new Date();
    yesterday2.setDate(yesterday2.getDate() - 2);
    const result = await theaterAdmin.insertMany([
        {
            theaterId: new ObjectId("00000001639189e929544c75").toString(),
            revenue: [
                { ticketRevenue: 1061, concessionsRevenue: 632, date: yesterday2 },
                { ticketRevenue: 786, concessionsRevenue: 473, date: yesterday },
                { ticketRevenue: 690, concessionsRevenue: 326, date: new Date() }
            ]
        },
        {
            theaterId: new ObjectId("00000001639189e929544c76").toString(),
            revenue: [
                { ticketRevenue: 931, concessionsRevenue: 582, date: yesterday2 },
                { ticketRevenue: 942, concessionsRevenue: 549, date: yesterday },
                { ticketRevenue: 833, concessionsRevenue: 456, date: new Date() }
            ]
        },
    ]);
    console.log(`Initialized ${result.insertedCount} products`);
    console.log(`Initialized:`);
    for (let key in result.insertedIds) {
        console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
    }
}
