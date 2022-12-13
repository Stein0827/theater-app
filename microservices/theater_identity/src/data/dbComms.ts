import bcrypt from 'bcryptjs';
import { connectDB } from './dbInit.js';
import { MongoClient} from 'mongodb';
import { LoginException } from '../models/loginModel.js';
import { User } from '../types.js';
import { theaterCreated, theaterDeleted } from '../../eventTypes.js';

export async function findUser(username: string) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');

    const user = await theaterLogin.findOne({username: username});
    await mongo.close();
    return user;
}

export async function login(username: string, password: string) {
    // check if user exists
    if (!(await userExists(username))) {
        throw new LoginException("Can not login: user does not exist", [username as string]);
    }
    
    const user = await findUser(username);
    if (bcrypt.compareSync(password, user?.password)) {
        return user;
    } else {
        throw new LoginException("Password is incorrect", [password as string]);
    }
}

export async function register(username: string, password: string) {
    const hash = bcrypt.hashSync(password, 10);
    const user = await createUser(username, hash);
    return user;
}

export async function userExists(username: string) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');

    const userExists = await theaterLogin.find({username: username}).hasNext();
    await mongo.close();
    return userExists;
}

export async function createUser(username: string, password: string) {
        // check if user already exists
        if (await userExists(username)) {
            throw new LoginException("Can not create user: username already exists", [username as string]);
        }
    
        // connect to db
        const mongo: MongoClient = await connectDB();
        const db = mongo.db();
        const theaterLogin = db.collection('theaterLogin');

        const user: User = {
            username,
            password,
            theaterId: ""
        };
        const res = await theaterLogin.insertOne(user);
        await mongo.close();
        return res;
}

export async function deleteUser(username: string) {
    // check if user exists
    if (!(await userExists(username))) {
        throw new LoginException("Can not delete user: user does not exist", [username as string]);
    }

    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');

    const deleteAck = await theaterLogin.deleteOne({"username": username});
    await mongo.close();
    return deleteAck;
}

export async function addTheaterId(data: theaterCreated) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');

    const username = data.eventData.username;
    const theaterId = data.eventData.theater_id;

    // check if user exists
    if (!(await userExists(username))) {
        throw new LoginException("Can not add theater: user does not exist", [username as string]);
    }

    const user = await theaterLogin.findOne({username: username});
    user!.theaterId = theaterId;

    const res = await theaterLogin.updateOne({username: username}, {'$set': user});
    
    await mongo.close();
    return res;
}

export async function deleteTheater(data: theaterDeleted) {
    // connect to db
    const mongo: MongoClient = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');

    const theaterId = data.eventData.theater_id;
    
    const res = await theaterLogin.deleteOne({"theaterId": theaterId});

    if (res.deletedCount === 0) {
        throw new LoginException("Deleted 0 items for theaterId:", [theaterId]);                
    }

    await mongo.close();
    return res;
}
