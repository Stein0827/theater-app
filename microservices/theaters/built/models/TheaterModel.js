"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheaterModel = void 0;
const dbe = __importStar(require("../data/dbComms.js"));
class TheaterModel {
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
exports.TheaterModel = TheaterModel;
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
function validateTheaterRequest(data) {
    if (data.id === undefined || data.id === "") {
        throw new TheaterException("Error: Invalid ID", [data.id]);
    }
}
function validateTheaterExists(data) {
    if (!(dbe.hasTheater(data.id))) {
        throw new TheaterException("Error: Theater does not exists", [data.id]);
    }
}
class TheaterException {
    constructor(message, errorList) {
        this.name = "Movie Exception";
        this.message = message;
        this.list = errorList;
    }
}
