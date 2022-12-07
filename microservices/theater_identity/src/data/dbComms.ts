import { db } from '../data/dbInit.js';
import bcrypt from 'bcryptjs';
import { LoginException } from '../models/loginModel.js';
import { User } from '../types.js';


export function userExists(username: string): boolean {
    return username in db
}

export function findUser(username: string): User {
    return db[username];
}

export function login(username: string, password: string): string {
    const user = findUser(username);
    if (bcrypt.compareSync(password, user.password)) {
        return user.theaterId;
    } else {
        throw new LoginException("Password is incorrect", [password as string]);
    }
}    
