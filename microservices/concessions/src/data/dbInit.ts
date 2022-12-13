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

    if (await db.listCollections({ name: 'concessions' }).hasNext()) {
        console.log('Collection already exists. Skipping initialization.');
        return;
    }

    const concessions = db.collection('concessions');
    const result = await concessions.insertMany([
        { name: 'coke', type: 'soft drink', price: 2.99, image: "https://static.specsonline.com/wp-content/uploads/2020/10/004900000634.jpg" },
        { name: 'popcorn', type: 'snack', price: 6.99, image: "https://img.freepik.com/premium-vector/popcorn-striped-tub_157999-54.jpg?w=2000" },
        { name: "Lay's chip classic", type: 'snack', price: 3.99, image: "https://m.media-amazon.com/images/I/813axPlVxBL.jpg" },
        { name: "Lay's chip onion", type: 'snack', price: 3.99, image: "https://images.albertsons-media.com/is/image/ABS/970009650-C1N1?$ng-ecom-pdp-mobile$&defaultImage=Not_Available" },
        { name: "Lay's chip barbecue", type: 'snack', price: 3.99, image: "https://m.media-amazon.com/images/I/919O9NwammL.jpg" },
    ]);

    console.log(`Initialized ${result.insertedCount} products`);
    console.log(`Initialized:`);

    for (let key in result.insertedIds) {
        console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
    }
}
