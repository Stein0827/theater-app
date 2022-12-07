import { User } from "../types";

export let db: { [key: string]: User } = {};

function initDB() {
    db["ilya"] = {
        "username": "ilya",
        "password": "$2a$10$wN1d.QZzEUV08jymXs.Am.V/l5g0Lpa8r5J4BZXRxCJmLUgmXjxJ2",
        "theaterId": "abcdefg"
    }

    db["bob"] = {
        "username": "bob",
        "password": "$2a$10$yoxw/adZkv5prX3VkWimveVVzHQ3SNj5jkHFbrV7Tzk5urtpDmG62",
        "theaterId": "123456"
    }
}

export function startupDB() {
    // connect to db
    initDB();
}