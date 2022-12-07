import { db } from '../data/dbInit.js';
import bcrypt from 'bcryptjs';
import { LoginException } from '../models/loginModel.js';
import { User } from '../types.js';


export function userExists(username: string): boolean {
    return username in db
}

export function createUser(username: string, password: string) {
    const user: User = {
        username,
        password,
        "theaterId": ""
    }
    
    db[username] = user;
    return user;
}

export function findUser(username: string): User {
    return db[username];
}

export function login(username: string, password: string): string {
    const user = findUser(username);
    if (bcrypt.compareSync(password, user.password)) {
        return user.theaterId as string;
    } else {
        throw new LoginException("Password is incorrect", [password as string]);
    }
}

export function register(username: string, password: string): User {
    const hash = bcrypt.hashSync(password, 10);
    // TODO: add await call once make real database function
    const user = createUser(username, hash);
    return user;
}
