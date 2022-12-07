import { ConcessionRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';

export class ConcessionModel {
    id: string | undefined;
    name: string | undefined;
    type: string | undefined;
    price: number | undefined;
    image: string | undefined;

    constructor(data: ConcessionRequest) {
        this.id = data.snackId;
        this.name = data.name;
        this.type = data.type;
        this.price = data.price;
        this.image = data.image;
    }

    async createConcession() {
        validateCreateRequest(this);
        const id = await dbe.createConcession(this);
        return id.insertedId;
    }

    async getConcession() {
        validateConcessionRequest(this);
        validateConcessionExists(this);
        return await dbe.getConcession(this.id as string);
    }

    async updateConcession() {
        validateConcessionRequest(this);
        validateConcessionExists(this);
        return await dbe.updateConcession(this);
    }

    async deleteConcession() {
        validateConcessionRequest(this);
        await validateConcessionExists(this);
        return await dbe.deleteConcession(this.id as string);
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

async function validateConcessionRequest(data: ConcessionModel) {
    const test = await dbe.hasConcession(data.id as string);
    console.log(test);
    if (!test) {
        throw new ConcessionException("Error: Concession does not exists", [data.id as string]);
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
        this.name = "Concession Exception";
        this.message = message;
        this.list = errorList;
    }
}