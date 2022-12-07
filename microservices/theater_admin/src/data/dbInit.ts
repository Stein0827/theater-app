import { TheaterRevenue } from "../types";
export let db: { [key: string]: TheaterRevenue[] } = {};

function initDB() {
    db["abc"] = [
        {
            "theaterId": "abc",
            "ticketRevenue": 10000,
            "concessionsRevenue": 20000,
            "date": new Date()
        }
    ];

    db["abc"].push(
        {
            "theaterId": "abc",
            "ticketRevenue": 30000,
            "concessionsRevenue": 40000,
            "date": new Date()
        }
    );
    
    db["def"] = [
        {
            "theaterId": "def",
            "ticketRevenue": 50000,
            "concessionsRevenue": 60000,
            "date": new Date()
        }
    ];
}

export function startupDB() {
    // connect to db
    initDB();
}