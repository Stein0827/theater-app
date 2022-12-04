export let db = {};
function initDB() {
    db["1"] = {
        id: "1",
        name: "brh.",
        address: "asdfasdf",
        movies: ["asdf", "brasdf", "aslkdfa"]
    };
    db["2"] = {
        id: "2",
        name: "brddfdh.",
        address: "asdfasdf",
        movies: ["asdf", "brasdf", "aslkdfa"]
    };
}
export function startupDB() {
    // connect to db
    initDB();
}
