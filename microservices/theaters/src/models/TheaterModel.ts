import { TheaterRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class TheaterModel {
    id: string | undefined;
    name: string | undefined;
    address: string | undefined;
    description: string | undefined;
    image: File | undefined;
    movies: string[] | undefined;

    constructor(data: TheaterRequest) {
        this.id = data.theaterId;
        this.name = data.name;
        this.address = data.address;
        this.description = data.description;
        this.image = data.theaterImage;
        this.movies = data.movies;
    }

    createTheater() {
        validateCreateRequest(this);
        this.id = dbe.getNewID();
        return dbe.createTheater(this);
    }

    getTheater() {
        validateTheaterRequest(this);
        validateTheaterExists(this);
        return dbe.getTheater(this.id as string);
    }

    updateTheater() {
        validateTheaterRequest(this);
        validateTheaterExists(this);
        return dbe.updateTheater(this);
    }

    deleteTheater() {
        validateTheaterRequest(this);
        validateTheaterExists(this);
        return dbe.deleteTheater(this.id as string);
    }
}

function validateCreateRequest(data: TheaterModel) {
    let invalidAttributes: string[] = [];
    const required_attributes = new Set(["name", "address", "description"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute as keyof typeof data] === "" || data[attribute as keyof typeof data] === undefined) {
            invalidAttributes.push(attribute);
        }
    });

    if (invalidAttributes.length !== 0) {
        throw new TheaterException("Error: Invalid Attributes", invalidAttributes);
    }
}

function validateTheaterRequest(data: TheaterModel) {
    if (data.id !== undefined && data.id as string !== "" && typeof data.id === "string") {
        throw new TheaterException("Error: Invalid ID", [data.id]);
    }
}

function validateTheaterExists(data: TheaterModel) {
    if (!(dbe.hasTheater(data.id as string))) {
        throw new TheaterException("Error: Theater does not exists", [data.id as string]);
    }
}

class TheaterException{
    list: string[];
    name: string;
    message: string;

    constructor (message:string, errorList: string[]) {
        this.name = "Movie Exception";
        this.message = message;
        this.list = errorList;
    }
}