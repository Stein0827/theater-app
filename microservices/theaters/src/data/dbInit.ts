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
  console.log("initing db");
  const mongo: MongoClient = await connectDB();
  const db = mongo.db();

  if (await db.listCollections({ name: 'theaters' }).hasNext()) {
    console.log('Collection already exists. Skipping initialization.');
    return;
  }

  const theaters = db.collection('theaters');
  const result = await theaters.insertMany([
    { _id: new ObjectId("00000001639189e929544c75"), name: 'Amherst Cinema', address: '28 Amity St, Amherst, MA', zip: "01002", description: "Cinema screening independent, classic & current films, plus theater, dance & music performances.", image: "https://amherstcinema.org/sites/default/files/AmherstCinemaTower2.jpg", movies: [1, 2, 3] },
    { _id: new ObjectId("00000001639189e929544c76"), name: 'Cinemark at Hampshire Mall and XD', address: '367 Russell St, Hadley, MA', zip: "01035", description: "Chain of movie theaters, some with multiple screens, stadium seats & self-service ticketing kiosks.", image: "https://www.masslive.com/resizer/9d6RPT3LDuV1Mc81sqj5x36FIQg=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/AAAMLCVC3ZFG5NYGB5P2PSNUS4.jpg",movies: [1, 4, 5] },
    { _id: new ObjectId("00000001639189e929544c77"), name: "South Hadley's Tower Theaters", address: 'The Village Commons, 19 College St, South Hadley, MA', zip: "01075", description: "Movie theater in South Hadley, Massachusetts", image: "https://fastly.4sqi.net/img/general/600x600/6909497_5AKqVfCBd3SBf4Msw6Hwn9vP1fD2UIXBAyl5n-E5fnk.jpg", movies: [1, 2, 3] },
    { _id: new ObjectId("00000001639189e929544c78"), name: 'Greenfield Garden Cinemas', address: '361 Main St, Greenfield, MA', zip: "01090", description: "The Garden Theater Block is a historic commercial block and theater at 353-367 Main Street in Greenfield, Massachusetts. The Colonial Revival block was completed in 1929, and is home to the city's largest theatrical performance venue", image: "https://s3-media0.fl.yelpcdn.com/bphoto/X4H-mCrMDaVUM5W0u07NJg/348s.jpg", movies: [1, 4, 5] },
  ]);

  console.log(`Initialized ${result.insertedCount} products`);
  console.log(`Initialized:`);

  for (let key in result.insertedIds) {
    console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
  }
}
