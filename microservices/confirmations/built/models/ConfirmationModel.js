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
exports.ConfirmationModel = void 0;
const dbe = __importStar(require("../data/dbComms.js"));
class ConfirmationModel {
    constructor(data) {
        this.id = data.confirmationId;
        this.movieId = data.movieId;
        this.theaterId = data.theaterId;
        this.creditCard = data.creditCard;
        this.address = data.billingAddr;
        this.price = data.price;
        this.email = data.email;
    }
    createConfirmation() {
        return __awaiter(this, void 0, void 0, function* () {
            validateCreateRequest(this);
            const id = yield dbe.createConfirmation(this);
            return id;
        });
    }
    getConfirmation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield validateConfirmationRequest(this);
            yield validateConfirmationExists(this);
            return yield dbe.getConfirmation(this.id);
        });
    }
    deleteConfirmation() {
        return __awaiter(this, void 0, void 0, function* () {
            yield validateConfirmationRequest(this);
            yield validateConfirmationExists(this);
            return yield dbe.deleteConfirmation(this.id);
        });
    }
}
exports.ConfirmationModel = ConfirmationModel;
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
function validateConfirmationRequest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield dbe.hasConfirmation(data.id))) {
            throw new ConfirmationException("Error: Confirmation does not exists", [data.id]);
        }
    });
}
function validateConfirmationExists(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield dbe.hasConfirmation(data.id))) {
            throw new ConfirmationException("Error: Confirmation does not exists", [data.id]);
        }
    });
}
class ConfirmationException {
    constructor(message, errorList) {
        this.name = "Confirmation Exception";
        this.message = message;
        this.list = errorList;
    }
}
