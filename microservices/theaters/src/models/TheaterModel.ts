import { TheaterRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class TheaterModel {
    id: string | undefined;
    name: string | undefined;
    address: string | undefined;
    zip: number | undefined;
    description: string | undefined;
    image: File | undefined;
    movies: string[] | undefined;

    constructor(data: TheaterRequest) {
        this.id = data.theaterId;
        this.name = data.name;
        this.address = data.address;
        this.zip = data.zip;
        this.description = data.description;
        this.image = data.theaterImage;
        this.movies = data.movies;
    }

    async createTheater() {
        validateCreateRequest(this);
        const id = await dbe.createTheater(this);
        return id.insertedId;
    }

    async getTheater() {
        validateTheaterRequest(this);
        await validateTheaterExists(this);
        return await dbe.getTheater(this.id as string);
    }

    async updateTheater() {
        validateTheaterRequest(this);
        await validateTheaterExists(this);
        return await dbe.updateTheater(this);
    }

    async deleteTheater() {
        validateTheaterRequest(this);
        await validateTheaterExists(this);
        return await dbe.deleteTheater(this.id as string);
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

async function validateTheaterExists(data: TheaterModel) {
    const test = await dbe.hasTheater(data.id as string);
    console.log(test);
    if (!test) {
        throw new TheaterException("Error: Theater does not exists", [data.id as string]);
    }
}

function validateTheaterRequest(data: TheaterModel) {
    if (data.id === undefined || data.id as string === "") {
        throw new TheaterException("Error: Invalid ID", [data.id as string]);
    }
}

class TheaterException{
    list: string[];
    name: string;
    message: string;

    constructor (message:string, errorList: string[]) {
        this.name = "Theater Exception";
        this.message = message;
        this.list = errorList;
    }
}

