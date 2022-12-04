import { OperationsRequest, Operations } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class OperationsModel {
    movie_id: string | undefined;
    theater_id: string | undefined;
    operations: Operations | undefined;

    constructor(data: OperationsRequest) {
        this.movie_id = data.movie_id;
        this.theater_id = data.theater_id;
        this.operations = data.operations;
    }

    createOperations() {
        validateRequest(this, ["movie_id", "theater_id", "operations"]);
        return dbe.createOperations(this);
    }

    updateOperations() {
        validateRequest(this, ["movie_id", "theater_id"]);
        validateOperationsExists(this);
        return dbe.updateOperations(this);
    }

    getOperations() {
        validateRequest(this, ["movie_id", "theater_id"]);
        validateOperationsExists(this);
        return dbe.getOperations(this);
    }

    deleteOperations() {
        validateRequest(this, ["movie_id", "theater_id", "operations"])
        return dbe.deleteOperations(this.movie_id as string, this.theater_id as string);
    }
}


function validateRequest(data: OperationsModel, requiredAttributes: string[]) {
    let invalidAttributes: string[] = [];
    const required_attributes = new Set(requiredAttributes);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute as keyof typeof data] === "") {
            invalidAttributes.push(attribute);
        }
    });

    if (invalidAttributes.length === 0) {
        throw new OperationsException("Error: Invalid Attributes", invalidAttributes);
    }
}

function validateOperationsExists(data: OperationsModel) {
    dbe.hasOperations(data.movie_id as string, data.theater_id as string);
}
class OperationsException extends Error {
    list: string[];

    constructor (message:string, errorList: string[]) {
        super(message);
        this.list = errorList;
    }
}