export let db = {};
function initDB() {
    db["1"] = {
        id: "1",
        name: "Harry Potter and the Chamber of Comp. Sci.",
        desc: "An ancient prophecy seems to be coming true  when a mysterious presence begins stalking the corridors of a school of magic and leaving its victims paralyzed.",
        length: "2h 41m",
        rating: "PG",
        //thumbnail: new File(["foo"], "foo.txt"),
        trailer: "https://www.youtube.com/watch?v=NtMvNh0WFVM"
    };
    db["2"] = {
        id: "2",
        name: "test",
        desc: "heros journey",
        length: "2h 41m",
        rating: "PG",
        //thumbnail: new File(["foo"], "foo.txt"),
        trailer: "https://www.youtube.com/watch?v=NtMvNh0WFVM"
    };
}
export function startupDB() {
    // connect to db
    initDB();
}
