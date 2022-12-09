export const create_table = "CREATE TABLE IF NOT EXISTS Movies (" +
    "movie_id int NOT NULL AUTO_INCREMENT," +
    "name varchar(80) NOT NULL," +
    "`desc` varchar(400) NOT NULL," +
    "length varchar(15) NOT NULL," +
    "rating varchar(10) NOT NULL," +
    "thumbnail varchar(150) NOT NULL," +
    "trailer varchar(255) NOT NULL," +
    "PRIMARY KEY (movie_id));";

export const insert = "INSERT INTO Movies (name,`desc`,length,rating,thumbnail,trailer) VALUES ?;"

export const insert_values = [
    ["Avatar: The Way of Water",
        "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Navi race to protect their planet.",
        "3h 12m",
        "PG-13",
        "https://wallpapercave.com/wp/wp8213746.jpg",
        "https://www.youtube.com/watch?v=d9MyW72ELq0"
    ], 
    ["Knives Out",
        "A detective investigates the death of the patriarch of an eccentric, combative family.",
        "2h 10m",
        "PG-13",
        "https://cdn.cinematerial.com/p/297x/cdcin9ax/knives-out-movie-poster-md.jpg?v=1574412342",
        "https://www.youtube.com/watch?v=xi-1NchUqMA"
    ], 
    ["Home Alone",
        "An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
        "1h 43m",
        "PG",
        "https://lumiere-a.akamaihd.net/v1/images/au_20cs_home_alone_poster_fb9adee1.jpeg?region=0%2C0%2C540%2C810",
        "https://www.youtube.com/watch?v=jEDaVHmw7r4"

    ], 
    ["Elf",
        "Raised as an oversized elf, Buddy travels from the North Pole to New York City to meet his biological father, Walter Hobbs, who doesn't know he exists and is in desperate need of some Christmas spirit.",
        "1h 37m",
        "PG",
        "https://cdn.cinematerial.com/p/297x/qsnqolo5/elf-theatrical-movie-poster-md.jpg?v=1482643595",
        "https://www.youtube.com/watch?v=gW9wRNqQ_P8"
    ], 
    ["How the Grinch Stole Christmas",
        "On the outskirts of Whoville lives a green, revenge-seeking Grinch who plans to ruin Christmas for all of the citizens of the town.",
        "1h 44m",
        "PG",
        "https://cdn.cinematerial.com/p/297x/p1udbs3r/how-the-grinch-stole-christmas-dvd-movie-cover-md.jpg?v=1456266756",
        "https://www.youtube.com/watch?v=YQV5Pr7pWtM"

    ],
];