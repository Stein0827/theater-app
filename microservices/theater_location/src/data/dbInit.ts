import { MongoClient } from 'mongodb';

export async function connectDB(): Promise<MongoClient> {
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
  const mongo: MongoClient = await connectDB();
  const db = mongo.db();

  if (await db.listCollections({ name: 'theaterLocations' }).hasNext()) {
    console.log('Collection already exists. Skipping initialization.');
    return;
  }

  const theaters = db.collection('theaterLocations');
  const result = await theaters.insertMany([
    { zipcode: "12345", theaters: ["abcdef", "ghijklm"] },
    { zipcode: "67890", theaters: ["wwwwww", "yyyyyyy"] },
    { zipcode: "1a2b3", theaters: ["zzzzzz", "aaaaaaa"] },
  ]);

  console.log(`Initialized ${result.insertedCount} products`);
  console.log(`Initialized:`);

  for (let key in result.insertedIds) {
    console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
  }
}