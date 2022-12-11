import { OperationsRequest, Operations } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class OperationsModel {
    
    movie_id: number | undefined;
    theater_id: string | undefined;
    operations: Operations | undefined;

    constructor(data: OperationsRequest) {
        this.movie_id = data.movie_id;
        this.theater_id = data.theater_id;
        this.operations = data.operations;
    }

    async createOperations() { // should be easy to insert
        validateRequest(this, ["theater_id"]);
        const res = await dbe.createMovieops(this);
        return res;
    }

    async updateOperations() {
        validateRequest(this, ["movie_id", "theater_id"]);
        await validateOperationsExists(this).catch((err) => {throw err});
        const doc = await dbe.getOperations(this);

        if (doc === null) {
            throw new OperationsException("Error: doc null in update operations", [])
        }

        console.log(doc);
        let docoperations = doc.operations;
        let hasMovie = false;

        docoperations.forEach((op: any) => {
            if (op.movie_id == this.movie_id) {
                hasMovie == true;
                let logistics = op.logistics;
                for (let time in this.operations) {
                    logistics[time] = this.operations[time];
                }
            }
        })

        if (!hasMovie) {
            if (this.operations === undefined) {
                this.operations === {};
            }
            
            docoperations.push({movie_id: this.movie_id, logistics: this.operations})
        }

        console.log(docoperations);
        
        return await dbe.updateOperations(this.theater_id as string, docoperations);
    }

    async getOperations() {
        validateRequest(this, ["movie_id", "theater_id"]);
        await validateOperationsExists(this).catch((err) => {throw err});
        const res = await dbe.getOperations(this);
        const logistics = traverseOperations(res, this.movie_id as number);
        return logistics;
    }

    async deleteOperations() {
        validateRequest(this, ["movie_id", "theater_id"]);
        return await dbe.deleteOperations(this.movie_id as number, this.theater_id as string);
    }

    async deleteTheaterOperations() {
        validateRequest(this, ["theater_id"]);
        return await dbe.deleteTheaterOperations(this.theater_id as string);
    }
}

function validateRequest(data: OperationsModel, requiredAttributes: string[]) {
    let invalidAttributes: string[] = [];

    const required_attributes = new Set(requiredAttributes);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute as keyof typeof data] === "" || data[attribute as keyof typeof data] === undefined) {
            invalidAttributes.push(attribute);
        }
    });

    if (invalidAttributes.length !== 0) {
        throw new OperationsException("Error: Invalid Attributes", invalidAttributes);
    }
}

async function validateOperationsExists(data: OperationsModel) {
    if (!await dbe.hasTheater(data.movie_id as number, data.theater_id as string)) {
        throw new OperationsException("Error: Operation for Theater and Movie does not exists", [data.movie_id as number, data.theater_id as string]);
    }
}

function traverseOperations(mongo_data: any, movieid: number) {
    const oparr = mongo_data.operations;
    let res = 0;

    oparr.forEach((op: { movie_id: number; logistics: any; }) => {
        if (op.movie_id === movieid) {
            res = op.logistics;
        }
    });
    
    return res;;
}
class OperationsException{
    list: any [];
    name: string;
    message: string;

    constructor (message: string, errorList: any []) {
        this.name = "Movie Operations Exception";
        this.message = message;
        this.list = errorList;
    }
}