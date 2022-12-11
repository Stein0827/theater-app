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
    if (await db.listCollections({ name: 'movieops' }).hasNext()) {
        console.log('Collection already exists. Skipping initialization.');
        return;
    }
    const movieops = db.collection('movieops');
    const result = await movieops.insertMany([
        {
            "theater_id": "abcdefg",
            "operations": [
                { "movie_id": 1, "logistics": { "1:00pm": 30, "1:30pm": 30, "2:00pm": 20 } },
                { "movie_id": 2, "logistics": { "1:00pm": 30, "1:30pm": 30, "2:00pm": 20 } },
                { "movie_id": 3, "logistics": { "1:00pm": 30, "1:30pm": 30, "2:00pm": 20 } },
            ]
        }
    ]);
    console.log(`Initialized ${result.insertedCount} products`);
    console.log(`Initialized:`);
    for (let key in result.insertedIds) {
        console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
    }
}
