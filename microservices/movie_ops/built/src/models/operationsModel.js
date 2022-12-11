import * as dbe from '../data/dbComms.js';
export class OperationsModel {
    constructor(data) {
        this.movie_id = data.movie_id;
        this.theater_id = data.theater_id;
        this.operations = data.operations;
    }
    async createOperations() {
        validateRequest(this, ["theater_id"]);
        const res = await dbe.createMovieops(this);
        return res;
    }
    async updateOperations() {
        validateRequest(this, ["movie_id", "theater_id"]);
        await validateOperationsExists(this).catch((err) => { throw err; });
        const doc = await dbe.getOperations(this);
        if (doc === null) {
            throw new OperationsException("Error: doc null in update operations", []);
        }
        console.log(doc);
        let docoperations = doc.operations;
        let hasMovie = false;
        docoperations.forEach((op) => {
            if (op.movie_id == this.movie_id) {
                hasMovie == true;
                let logistics = op.logistics;
                for (let time in this.operations) {
                    logistics[time] = this.operations[time];
                }
            }
        });
        if (!hasMovie) {
            if (this.operations === undefined) {
                this.operations = {};
            }
            docoperations.push({ movie_id: this.movie_id, logistics: this.operations });
        }
        console.log(docoperations);
        return await dbe.updateOperations(this.theater_id, docoperations);
    }
    async getOperations() {
        validateRequest(this, ["movie_id", "theater_id"]);
        await validateOperationsExists(this).catch((err) => { throw err; });
        const res = await dbe.getOperations(this);
        const logistics = traverseOperations(res, this.movie_id);
        return logistics;
    }
    async deleteOperations() {
        validateRequest(this, ["movie_id", "theater_id"]);
        return await dbe.deleteOperations(this.movie_id, this.theater_id);
    }
    async deleteTheaterOperations() {
        validateRequest(this, ["theater_id"]);
        return await dbe.deleteTheaterOperations(this.theater_id);
    }
}
function validateRequest(data, requiredAttributes) {
    let invalidAttributes = [];
    const required_attributes = new Set(requiredAttributes);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute] === "" || data[attribute] === undefined) {
            invalidAttributes.push(attribute);
        }
    });
    if (invalidAttributes.length !== 0) {
        throw new OperationsException("Error: Invalid Attributes", invalidAttributes);
    }
}
async function validateOperationsExists(data) {
    if (!await dbe.hasTheater(data.movie_id, data.theater_id)) {
        throw new OperationsException("Error: Operation for Theater and Movie does not exists", [data.movie_id, data.theater_id]);
    }
}
function traverseOperations(mongo_data, movieid) {
    const oparr = mongo_data.operations;
    let res = 0;
    oparr.forEach((op) => {
        if (op.movie_id === movieid) {
            res = op.logistics;
        }
    });
    return res;
    ;
}
class OperationsException {
    constructor(message, errorList) {
        this.name = "Movie Operations Exception";
        this.message = message;
        this.list = errorList;
    }
}
