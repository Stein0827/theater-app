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
  console.log("initing db");
  const mongo: MongoClient = await connectDB();
  const db = mongo.db();

  if (await db.listCollections({ name: 'theaters' }).hasNext()) {
    console.log('Collection already exists. Skipping initialization.');
    return;
  }

  const theaters = db.collection('theaters');
  const result = await theaters.insertMany([
    { name: 'Amherst Cinema', address: '28 Amity St, Amherst, MA', zip: "01002", description: "Cinema screening independent, classic & current films, plus theater, dance & music performances.", movies: [1, 2, 3] },
    { name: 'Cinemark at Hampshire Mall and XD', address: '367 Russell St, Hadley, MA', zip: "01035", description: "Chain of movie theaters, some with multiple screens, stadium seats & self-service ticketing kiosks.", movies: [1, 4, 5] },
    { name: "South Hadley's Tower Theaters", address: 'The Village Commons, 19 College St, South Hadley, MA', zip: "01075", description: "Movie theater in South Hadley, Massachusetts", movies: [1, 2, 3] },
    { name: 'Greenfield Garden Cinemas', address: '361 Main St, Greenfield, MA', zip: "01090", description: "The Garden Theater Block is a historic commercial block and theater at 353-367 Main Street in Greenfield, Massachusetts. The Colonial Revival block was completed in 1929, and is home to the city's largest theatrical performance venue", movies: [1, 4, 5] },
  ]);

  console.log(`Initialized ${result.insertedCount} products`);
  console.log(`Initialized:`);

  for (let key in result.insertedIds) {
    console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
  }
}
