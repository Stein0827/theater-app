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
        { name: 'coke', type: 'soft drink', price: 2.99, image: "https://preview.redd.it/r7da8ziv4n711.jpg?auto=webp&s=3c751551cf2d8b228fb43474da596ae597caddff" },
        { name: 'popcorn', type: 'snack', price: 6.99, image: "https://i0.wp.com/spainonafork.com/wp-content/uploads/2019/04/popcornHOR-11.png?fit=750%2C750&ssl=1" },
        { name: "Lay's chip classic", type: 'snack', price: 3.99, image: "http://mobileimages.lowes.com/product/converted/028400/028400097802.jpg" },
        { name: "Lay's chip onion", type: 'snack', price: 3.99, image: "https://target.scene7.com/is/image/Target/GUEST_41855ae0-77f0-482d-a634-e978cfe038ca?wid=488&hei=488&fmt=pjpeg" },
        { name: "Lay's chip barbecue", type: 'snack', price: 3.99, image: "https://m.media-amazon.com/images/I/81fXU7rqRhL.jpg" },
    ]);

    console.log(`Initialized ${result.insertedCount} products`);
    console.log(`Initialized:`);

    for (let key in result.insertedIds) {
        console.log(`  Inserted product with ID ${result.insertedIds[key]}`);
    }
}
