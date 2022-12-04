import { MovieRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class MovieModel {
    id: string | undefined;
    name: string | undefined;
    desc: string | undefined;
    length: string | undefined;
    rating: string | undefined;
    thumbnail: File | undefined;
    trailer: string | undefined;

    constructor(data: MovieRequest) {
        this.id = data.movie_id;
        this.name = data.name;
        this.desc = data.desc;
        this.length = data.length;
        this.rating = data.rating;
        this.thumbnail = data.thumbnail;
        this.trailer = data.trailer;
    }

    createMovie() {
        validateCreateRequest(this);
        this.id = dbe.getNewID();
        return dbe.createMovie(this);
    }

    getMovie() {
        validateMovieRequest(this);
        validateMovieExists(this);
        return dbe.getMovie(this.id as string);
    }

    updateMovie() {
        validateMovieRequest(this);
        validateMovieExists(this);
        return dbe.updateMovie(this);
    }

    deleteMovie() {
        validateMovieRequest(this);
        validateMovieExists(this);
        return dbe.deleteMovie(this.id as string);
    }
}

function validateCreateRequest(data: MovieModel) {
    let invalidAttributes: string[] = [];
    const required_attributes = new Set(["name", "desc", "length", "rating", "trailer"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute as keyof typeof data] === "") {
            invalidAttributes.push(attribute);
        }
    });

    if (invalidAttributes.length === 0) {
        throw new MovieException("Error: Invalid Attributes", invalidAttributes);
    }
}

function validateMovieRequest(data: MovieModel) {
    if (data.id !== undefined && data.id as string !== "" && typeof data.id === "string") {
        throw new MovieException("Error: Invalid ID", [data.id]);
    }
}

function validateMovieExists(data: MovieModel) {
    if (!(dbe.hasMovie(data.id as string))) {
        throw new MovieException("Error: Movie does not exists", [data.id as string]);
    }
}
class MovieException extends Error {
    list: string[];

    constructor (message:string, errorList: string[]) {
        super(message);
        this.list = errorList;
    }
}