import { MongoClient, ObjectId } from 'mongodb';

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

  const theaterLocations = db.collection('theaterLocations');
  const result = await theaterLocations.insertMany([
    { zipcode: "01002", theaters: [new ObjectId("00000001639189e929544c75").toString()] },
    { zipcode: "01035", theaters: [new ObjectId("00000001639189e929544c76").toString()] },
    { zipcode: "01075", theaters: [new ObjectId("00000001639189e929544c77").toString()] },
    { zipcode: "01090", theaters: [new ObjectId("00000001639189e929544c78").toString()] },
  ]);

  console.log(`Initialized ${result.insertedCount} products`);
  console.log(`Initialized:`);

  for (let key in result.insertedIds) {
    console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
  }
}