import { ConfirmationRequest } from '../types.js';
import * as dbe from '../data/dbComms.js';
import { sendEmail } from './email.js';

export class ConfirmationModel {
    id: string | undefined;
    movieId: string | undefined;
    theaterId: string | undefined;
    creditCard: string | undefined;
    address: string | undefined;
    price?: number;
    email?: string;

    constructor(data: ConfirmationRequest) {
        this.id = data.confirmationId;
        this.movieId = data.movieId;
        this.theaterId = data.theaterId;
        this.creditCard = data.creditCard;
        this.address = data.billingAddr;
        this.price = data.price;
        this.email = data.email;
    }

    async createConfirmation() {
        validateCreateRequest(this);
        const id = await dbe.createConfirmation(this);
        return id;
    }

    async getConfirmation() {
        validateConfirmationRequest(this);
        await validateConfirmationExists(this);
        return await dbe.getConfirmation(this.id as string);
    }

    async deleteConfirmation() {
        validateConfirmationRequest(this);
        await validateConfirmationExists(this);
        return await dbe.deleteConfirmation(this.id as string);
    }
}

function validateCreateRequest(data: ConfirmationModel) {
    let invalidAttributes: string[] = [];
    const required_attributes = new Set(["movieId", "theaterId", "price", "creditCard", "address", "email"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute as keyof typeof data] === "" || data[attribute as keyof typeof data] === undefined) {
            invalidAttributes.push(attribute);
        }
    });

    if (invalidAttributes.length !== 0) {
        throw new ConfirmationException("Error: Invalid Attributes", invalidAttributes);
    }
}

async function validateConfirmationRequest(data: ConfirmationModel) {
    if (!await dbe.hasConfirmation(data.id as string)) {
        throw new ConfirmationException("Error: Confirmation does not exists", [data.id as string]);
    }
}

function validateConfirmationExists(data: ConfirmationModel) {
    if (!(dbe.hasConfirmation(data.id as string))) {
        throw new ConfirmationException("Error: Confirmation does not exists", [data.id as string]);
    }
}

class ConfirmationException{
    list: string[];
    name: string;
    message: string;

    constructor (message:string, errorList: string[]) {
        this.name = "Confirmation Exception";
        this.message = message;
        this.list = errorList;
    }
}
