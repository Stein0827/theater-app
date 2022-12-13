import * as dbe from '../data/dbComms.js';
export class TheaterModel {
    constructor(data) {
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
        const theater = await dbe.createTheater(this);
        return theater;
    }
    async getTheater() {
        validateTheaterRequest(this);
        await validateTheaterExists(this);
        return await dbe.getTheater(this.id);
    }
    async updateTheater() {
        validateTheaterRequest(this);
        await validateTheaterExists(this);
        return await dbe.updateTheater(this);
    }
    async updateMoviesOfTheater() {
        validateTheaterRequest(this);
        await validateTheaterExists(this);
        return await dbe.updateMoviesOfTheater(this);
    }
    async deleteTheater() {
        validateTheaterRequest(this);
        await validateTheaterExists(this);
        return await dbe.deleteTheater(this.id);
    }
}
function validateCreateRequest(data) {
    let invalidAttributes = [];
    const required_attributes = new Set(["name", "address", "description"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute] === "" || data[attribute] === undefined) {
            invalidAttributes.push(attribute);
        }
    });
    if (invalidAttributes.length !== 0) {
        throw new TheaterException("Error: Invalid Attributes", invalidAttributes);
    }
}
async function validateTheaterExists(data) {
    if (!await dbe.hasTheater(data.id)) {
        throw new TheaterException("Error: Theater does not exists", [data.id]);
    }
}
function validateTheaterRequest(data) {
    if (data.id === undefined || data.id === "") {
        throw new TheaterException("Error: Invalid ID", [data.id]);
    }
}
class TheaterException {
    constructor(message, errorList) {
        this.name = "Theater Exception";
        this.message = message;
        this.list = errorList;
    }
}
