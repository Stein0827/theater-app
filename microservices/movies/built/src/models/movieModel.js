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
    async createMovie() {
        validateCreateRequest(this);
        try {
            const movie = await dbe.createMovie(this);
            return movie;
        }
        catch (err) {
            throw err;
        }
    }
    async getMovie() {
        validateMovieRequest(this);
        try {
            await validateMovieExists(this);
        }
        catch (err) {
            throw err;
        }
        try {
            const movie = await dbe.getMovie(this.id);
            return movie;
        }
        catch (err) {
            throw err;
        }
    }
    async updateMovie() {
        validateMovieRequest(this);
        try {
            await validateMovieExists(this);
        }
        catch (err) {
            throw err;
        }
        return await dbe.updateMovie(this);
    }
    async deleteMovie() {
        validateMovieRequest(this);
        try {
            await validateMovieExists(this);
        }
        catch (err) {
            throw err;
        }
        return await dbe.deleteMovie(this.id);
    }
    getUpdateString() {
        let updateString = "";
        const fields = Object.keys(this);
        console.log("fields", fields);
        fields.forEach((field) => {
            console.log("field", field);
            console.log("value", this[field]);
            if (this[field] !== undefined) {
                let value = this[field];
                console.log("value", value);
                if (field === "id")
                    field = "movie_id";
                if (field !== "id")
                    value = "'" + value + "'";
                if (updateString === "") {
                    updateString += field + "=" + value;
                }
                else {
                    updateString += ", " + field + "=" + value;
                }
            }
        });
        console.log("update string", updateString);
        return updateString;
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
    if (data.id === undefined || typeof data.id !== "number") {
        throw new MovieException("Error: Invalid ID", [data.id.toString()]);
    }
}
async function validateMovieExists(data) {
    try {
        const hasMovie = await dbe.hasMovie(data.id);
        if (!(hasMovie)) {
            throw new MovieException("Error: Movie does not exists", [data.id.toString()]);
        }
    }
    catch (err) {
        throw err;
    }
}
class MovieException {
    constructor(message, errorList) {
        this.name = "Movie Exception";
        this.message = message;
        this.list = errorList;
    }
}
