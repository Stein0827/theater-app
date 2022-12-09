export let db = {};
function initDB() {
    db["1"] = {
        id: "1",
        name: "coke",
        type: "soft drink",
        price: 3,
    };
    db["2"] = {
        id: "1",
        name: "lay's chips",
        type: "chips",
        price: 5.99,
    };
}
export function startupDB() {
    // connect to db
    initDB();
}
