export let db: {[key: string]: string[]} = {};

function initDB() {
    db["01907"] = [
        "asodfsa",
        "aofasdof",
        "ogesoigowoi",
        "5ieovjajpods"
    ];
    db["01002"] = [
        "bndkengjek",
        "abcdefgh",
        "asgibrubua"
    ];
}

export function startupDB() {
    // connect to db
    initDB();
}