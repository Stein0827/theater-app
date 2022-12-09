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
exports.MovieModel = void 0;
const dbe = __importStar(require("../data/dbComms.js"));
class MovieModel {
    constructor(data) {
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
        return dbe.getMovie(this.id);
    }
    updateMovie() {
        validateMovieRequest(this);
        validateMovieExists(this);
        return dbe.updateMovie(this);
    }
    deleteMovie() {
        validateMovieRequest(this);
        validateMovieExists(this);
        return dbe.deleteMovie(this.id);
    }
}
exports.MovieModel = MovieModel;
function validateCreateRequest(data) {
    let invalidAttributes = [];
    const required_attributes = new Set(["name", "desc", "length", "rating", "trailer"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute] === "" || data[attribute] === undefined) {
            invalidAttributes.push(attribute);
        }
    });
    if (invalidAttributes.length !== 0) {
        throw new MovieException("Error: Invalid Attributes", invalidAttributes);
    }
}
function validateMovieRequest(data) {
    if (data.id === undefined || typeof data.id !== "string" || data.id === "") {
        throw new MovieException("Error: Invalid ID", [data.id]);
    }
}
function validateMovieExists(data) {
    if (!(dbe.hasMovie(data.id))) {
        throw new MovieException("Error: Movie does not exists", [data.id]);
    }
}
class MovieException {
    constructor(message, errorList) {
        this.name = "Movie Exception";
        this.message = message;
        this.list = errorList;
    }
}
