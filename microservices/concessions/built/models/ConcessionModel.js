import * as dbe from '../data/dbComms.js';
export class ConcessionModel {
    constructor(data) {
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
        return dbe.getConcession(this.id);
    }
    updateConcession() {
        validateConcessionRequest(this);
        validateConcessionExists(this);
        return dbe.updateConcession(this);
    }
    deleteConcession() {
        validateConcessionRequest(this);
        validateConcessionExists(this);
        return dbe.deleteConcession(this.id);
    }
}
function validateCreateRequest(data) {
    let invalidAttributes = [];
    const required_attributes = new Set(["name", "type", "price"]);
    required_attributes.forEach(attribute => {
        if (!(attribute in data) || data[attribute] === "" || data[attribute] === undefined) {
            invalidAttributes.push(attribute);
        }
    });
    if (invalidAttributes.length !== 0) {
        throw new ConcessionException("Error: Invalid Attributes", invalidAttributes);
    }
}
function validateConcessionRequest(data) {
    if (data.id === undefined || data.id === "") {
        throw new ConcessionException("Error: Invalid ID", [data.id]);
    }
}
function validateConcessionExists(data) {
    if (!(dbe.hasConcession(data.id))) {
        throw new ConcessionException("Error: Concession does not exists", [data.id]);
    }
}
class ConcessionException {
    constructor(message, errorList) {
        this.name = "Concession Exception";
        this.message = message;
        this.list = errorList;
    }
}
