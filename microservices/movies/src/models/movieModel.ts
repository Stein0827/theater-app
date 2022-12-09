import { IMovie, MovieRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class MovieModel {
    
    id: number | undefined;
    name: string | undefined;
    desc: string | undefined;
    length: string | undefined;
    rating: string | undefined;
    thumbnail: string | undefined;
    trailer: string | undefined;

    constructor(data: MovieRequest | IMovie) {
        this.id = data.movie_id;
        this.name = data.name;
        this.desc = data.desc;
        this.length = data.length;
        this.rating = data.rating;
        this.thumbnail = data.thumbnail;
        this.trailer = data.trailer;
    }

    async createMovie() {
        validateCreateRequest(this);

        try {
            const movie = await dbe.createMovie(this);
            return movie;
        } catch (err) {
            throw err;
        }
    }

    async getMovie() {
        validateMovieRequest(this);

        try {
            await validateMovieExists(this);
        } catch (err) {
            throw err;
        }

        try {
            const movie = await dbe.getMovie(this.id as number);
            return movie;
        } catch (err) {
            throw err;
        }
    }

    async updateMovie() {
        validateMovieRequest(this);
        try {
            await validateMovieExists(this);
        } catch (err) {
            throw err;
        }

        return await dbe.updateMovie(this);
    }

    async deleteMovie() {
        validateMovieRequest(this);
        try {
            await validateMovieExists(this);
        } catch (err) {
            throw err;
        }

        return await dbe.deleteMovie(this.id as number);
    }

    getUpdateString() {
        let updateString = "";
        const fields  = Object.keys(this);
        console.log("fields", fields);
        

        fields.forEach((field) => {
            console.log("field", field);
            console.log("value", this[field as keyof typeof this])
            if (this[field as keyof typeof this] !== undefined) {
                let value:any = this[field as keyof typeof this];
                console.log("value", value);
                
                if (field === "id") field = "movie_id";
                if (field !== "id") value = "'" + value + "'";

                if (updateString === "") {
                    updateString += field + "=" + value;
                } else  {
                    updateString += ", " + field + "=" + value;
                }
            }
        });
        console.log("update string", updateString)
        return updateString;
    }
}

function validateCreateRequest(data: MovieModel) {
    let invalidAttributes: string[] = [];
    const required_attributes = new Set(["name", "desc", "length", "rating", "trailer"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute as keyof typeof data] === "" || data[attribute as keyof typeof data] === undefined) {
            invalidAttributes.push(attribute);
        }
    });

    if (invalidAttributes.length !== 0) {
        throw new MovieException("Error: Invalid Attributes", invalidAttributes);
    }
}

function validateMovieRequest(data: MovieModel) {
    if (data.id === undefined || typeof data.id !== "number") {
        throw new MovieException("Error: Invalid ID", [(data.id as unknown as number).toString()]);
    }
}

async function validateMovieExists(data: MovieModel) {
    try {
        const hasMovie = await dbe.hasMovie(data.id as number);
        if (!(hasMovie)) {
            throw new MovieException("Error: Movie does not exists", [(data.id as unknown as number).toString()]);
        }
    } catch (err) {
        throw err;
    }
}
class MovieException{
    list: string[];
    name: string;
    message: string;

    constructor (message:string, errorList: string[]) {
        this.name = "Movie Exception";
        this.message = message;
        this.list = errorList;
    }
}