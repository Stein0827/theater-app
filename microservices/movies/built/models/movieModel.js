import * as dbe from '../data/dbComms.js';
export class MovieModel {
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
    if (data.id !== undefined && data.id !== "" && typeof data.id === "string") {
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
