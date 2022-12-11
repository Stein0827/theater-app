"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcessionModel = void 0;
const dbe = __importStar(require("../data/dbComms.js"));
class ConcessionModel {
    constructor(data) {
        this.id = data.snackId;
        this.name = data.name;
        this.type = data.type;
        this.price = data.price;
        this.image = data.image;
    }
    createConcession() {
        return __awaiter(this, void 0, void 0, function* () {
            validateCreateRequest(this);
            const id = yield dbe.createConcession(this);
            return id.insertedId;
        });
    }
    getConcession() {
        return __awaiter(this, void 0, void 0, function* () {
            yield validateConcessionRequest(this);
            yield validateConcessionExists(this);
            return yield dbe.getConcession(this.id);
        });
    }
    updateConcession() {
        return __awaiter(this, void 0, void 0, function* () {
            yield validateConcessionRequest(this);
            yield validateConcessionExists(this);
            return yield dbe.updateConcession(this);
        });
    }
    deleteConcession() {
        return __awaiter(this, void 0, void 0, function* () {
            yield validateConcessionRequest(this);
            yield validateConcessionExists(this);
            return yield dbe.deleteConcession(this.id);
        });
    }
}
exports.ConcessionModel = ConcessionModel;
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
    return __awaiter(this, void 0, void 0, function* () {
        const test = yield dbe.hasConcession(data.id);
        console.log(test);
        if (!test) {
            throw new ConcessionException("Error: Concession does not exists", [data.id]);
        }
    });
}
function validateConcessionExists(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield dbe.hasConcession(data.id))) {
            throw new ConcessionException("Error: Concession does not exists", [data.id]);
        }
    });
}
class ConcessionException {
    constructor(message, errorList) {
        this.name = "Concession Exception";
        this.message = message;
        this.list = errorList;
    }
}
