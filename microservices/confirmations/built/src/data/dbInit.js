import { MongoClient } from 'mongodb';
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
    console.log("initing db");
    const mongo = await connectDB();
    const db = mongo.db();
    if (await db.listCollections({ name: 'confirmations' }).hasNext()) {
        console.log('Collection already exists. Skipping initialization.');
        return;
    }
    const confirmations = db.collection('confirmations');
    const result = await confirmations.insertMany([
        { name: 'bruh', type: 'ehhhasdfklas', price: 22, image: "asdgkjsdg" },
        { name: 'ddd', type: 'dddd', price: 11, image: "asdfdf" },
        { name: '12312sa', type: 'zxcvdf', price: 224, image: "asdggkk" },
    ]);
    console.log(`Initialized ${result.insertedCount} products`);
    console.log(`Initialized:`);
    for (let key in result.insertedIds) {
        console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
    }
}
