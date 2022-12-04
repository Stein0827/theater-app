import { ConcessionRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class ConcessionModel {
    id: string | undefined;
    name: string | undefined;
    type: string | undefined;
    price: number | undefined;
    image: File | undefined;

    constructor(data: ConcessionRequest) {
        this.id = data.snackId;
        this.name = data.name;
        this.type = data.type;
        this.price = data.price;
        this.image = data.image;
    }

    createConcession() {
        validateCreateRequest(this);
        this.id = dbe.getNewID();
        return dbe.createConcession(this);
    }

    getConcession() {
        validateConcessionRequest(this);
        validateConcessionExists(this);
        return dbe.getConcession(this.id as string);
    }

    updateConcession() {
        validateConcessionRequest(this);
        validateConcessionExists(this);
        return dbe.updateConcession(this);
    }

    deleteConcession() {
        validateConcessionRequest(this);
        validateConcessionExists(this);
        return dbe.deleteConcession(this.id as string);
    }
}

function validateCreateRequest(data: ConcessionModel) {
    let invalidAttributes: string[] = [];
    const required_attributes = new Set(["name", "type", "price"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute as keyof typeof data] === "" || data[attribute as keyof typeof data] === undefined) {
            invalidAttributes.push(attribute);
        }
    });

    if (invalidAttributes.length !== 0) {
        throw new ConcessionException("Error: Invalid Attributes", invalidAttributes);
    }
}

function validateConcessionRequest(data: ConcessionModel) {
    if (data.id === undefined || data.id as string === "") {
        throw new ConcessionException("Error: Invalid ID", [data.id as string]);
    }
}

function validateConcessionExists(data: ConcessionModel) {
    if (!(dbe.hasConcession(data.id as string))) {
        throw new ConcessionException("Error: Concession does not exists", [data.id as string]);
    }
}

class ConcessionException{
    list: string[];
    name: string;
    message: string;

    constructor (message:string, errorList: string[]) {
        this.name = "Movie Exception";
        this.message = message;
        this.list = errorList;
    }
}