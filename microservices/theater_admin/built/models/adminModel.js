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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminException = exports.AdminModel = void 0;
const dbe = __importStar(require("../data/dbComms"));
class AdminModel {
    constructor(data) {
        this.theaterId = data.theaterId;
    }
    getRevenue() {
        this.validateRequest();
        this.validateTheaterExists();
        const theaterRevenue = dbe.getRevenue(this.theaterId);
        return theaterRevenue;
    }
    validateRequest() {
        const theaterId = this.theaterId;
        if (!theaterId || typeof theaterId !== 'string' || theaterId === "") {
            throw new AdminException("Invalid theater id", [theaterId]);
        }
    }
    validateTheaterExists() {
        const theaterExists = dbe.theaterExists(this.theaterId);
        if (!theaterExists) {
            throw new AdminException("Theater does not exist", [this.theaterId]);
        }
    }
}
exports.AdminModel = AdminModel;
class AdminException {
    constructor(message, errorList) {
        this.name = "Admin Exception";
        this.message = message;
        this.list = errorList;
    }
}
exports.AdminException = AdminException;
