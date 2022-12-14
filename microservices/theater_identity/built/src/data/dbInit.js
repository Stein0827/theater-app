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
    if (await db.listCollections({ name: 'theaterLogin' }).hasNext()) {
        console.log('Collection already exists. Skipping initialization.');
        return;
    }
    const theaterLogin = db.collection('theaterLogin');
    const result = await theaterLogin.insertMany([
        { username: "amherstCinemaAdmin", password: "$2a$10$wN1d.QZzEUV08jymXs.Am.V/l5g0Lpa8r5J4BZXRxCJmLUgmXjxJ2", theaterId: new ObjectId("00000001639189e929544c75").toString() },
        { username: "cinemarkAdmin", password: "$2a$10$yoxw/adZkv5prX3VkWimveVVzHQ3SNj5jkHFbrV7Tzk5urtpDmG62", theaterId: new ObjectId("00000001639189e929544c76").toString() }, // password: dylan
    ]);
    console.log(`Initialized ${result.insertedCount} products`);
    console.log(`Initialized:`);
    for (let key in result.insertedIds) {
        console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
    }
}
