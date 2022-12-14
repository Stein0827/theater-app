import bcrypt from 'bcryptjs';
import { connectDB } from './dbInit.js';
import { LoginException } from '../models/loginModel.js';
export async function findUser(username) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');
    const user = await theaterLogin.findOne({ username: username });
    await mongo.close();
    return user;
}
export async function login(username, password) {
    // check if user exists
    if (!(await userExists(username))) {
        throw new LoginException("Can not login: user does not exist", [username]);
    }
    const user = await findUser(username);
    if (bcrypt.compareSync(password, user === null || user === void 0 ? void 0 : user.password)) {
        return user;
    }
    else {
        throw new LoginException("Password is incorrect", [password]);
    }
}
export async function register(username, password) {
    const hash = bcrypt.hashSync(password, 10);
    const user = await createUser(username, hash);
    return user;
}
export async function userExists(username) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');
    const userExists = await theaterLogin.find({ username: username }).hasNext();
    await mongo.close();
    return userExists;
}
export async function createUser(username, password) {
    // check if user already exists
    if (await userExists(username)) {
        throw new LoginException("Can not create user: username already exists", [username]);
    }
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');
    const user = {
        username,
        password,
        theaterId: ""
    };
    const res = await theaterLogin.insertOne(user);
    await mongo.close();
    return res;
}
export async function deleteUser(username) {
    // check if user exists
    if (!(await userExists(username))) {
        throw new LoginException("Can not delete user: user does not exist", [username]);
    }
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');
    const deleteAck = await theaterLogin.deleteOne({ "username": username });
    await mongo.close();
    return deleteAck;
}
export async function addTheaterId(data) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');
    const username = data.eventData.username;
    const theaterId = data.eventData.theater_id;
    // check if user exists
    if (!(await userExists(username))) {
        throw new LoginException("Can not add theater: user does not exist", [username]);
    }
    const user = await theaterLogin.findOne({ username: username });
    if (user) {
        user.theaterId = theaterId;
    }
    const res = await theaterLogin.updateOne({ username: username }, { '$set': user });
    await mongo.close();
    return res;
}
export async function deleteTheater(data) {
    // connect to db
    const mongo = await connectDB();
    const db = mongo.db();
    const theaterLogin = db.collection('theaterLogin');
    const theaterId = data.eventData.theater_id;
    const res = await theaterLogin.deleteOne({ "theaterId": theaterId });
    if (res.deletedCount === 0) {
        throw new LoginException("Deleted 0 items for theaterId:", [theaterId]);
    }
    await mongo.close();
    return res;
}
