import * as dbe from '../data/dbComms.js';
export class TheaterModel {
    constructor(data) {
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
        return dbe.getTheater(this.id);
    }
    updateTheater() {
        validateTheaterRequest(this);
        validateTheaterExists(this);
        return dbe.updateTheater(this);
    }
    deleteTheater() {
        validateTheaterRequest(this);
        validateTheaterExists(this);
        return dbe.deleteTheater(this.id);
    }
}
function validateCreateRequest(data) {
    let invalidAttributes = [];
    const required_attributes = new Set(["name", "address", "description"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute] === "") {
            invalidAttributes.push(attribute);
        }
    });
    if (invalidAttributes.length !== 0) {
        throw new TheaterException("Error: Invalid Attributes", invalidAttributes);
    }
}
function validateTheaterRequest(data) {
    if (data.id !== undefined && data.id !== "" && typeof data.id === "string") {
        throw new TheaterException("Error: Invalid ID", [data.id]);
    }
}
function validateTheaterExists(data) {
    if (!(dbe.hasTheater(data.id))) {
        throw new TheaterException("Error: Theater does not exists", [data.id]);
    }
}
class TheaterException extends Error {
    constructor(message, errorList) {
        super(message);
        this.list = errorList;
    }
}
