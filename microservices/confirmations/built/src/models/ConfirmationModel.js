import * as dbe from '../data/dbComms.js';
export class ConfirmationModel {
    constructor(data) {
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
        await validateConfirmationRequest(this);
        await validateConfirmationExists(this);
        return await dbe.getConfirmation(this.id);
    }
    async deleteConfirmation() {
        await validateConfirmationRequest(this);
        await validateConfirmationExists(this);
        return await dbe.deleteConfirmation(this.id);
    }
}
function validateCreateRequest(data) {
    let invalidAttributes = [];
    const required_attributes = new Set(["movieId", "theaterId", "price", "creditCard", "address", "email"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute] === "" || data[attribute] === undefined) {
            invalidAttributes.push(attribute);
        }
    });
    if (invalidAttributes.length !== 0) {
        throw new ConfirmationException("Error: Invalid Attributes", invalidAttributes);
    }
}
async function validateConfirmationRequest(data) {
    if (!await dbe.hasConfirmation(data.id)) {
        throw new ConfirmationException("Error: Confirmation does not exists", [data.id]);
    }
}
async function validateConfirmationExists(data) {
    if (!await dbe.hasConfirmation(data.id)) {
        throw new ConfirmationException("Error: Confirmation does not exists", [data.id]);
    }
}
class ConfirmationException {
    constructor(message, errorList) {
        this.name = "Confirmation Exception";
        this.message = message;
        this.list = errorList;
    }
}
