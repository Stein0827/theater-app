"use strict";
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
exports.deleteConfirmation = void 0;
const ConfirmationModel_js_1 = require("../models/ConfirmationModel.js");
const deleteConfirmation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const confirmationModel = new ConfirmationModel_js_1.ConfirmationModel(data);
        confirmationModel.deleteConfirmation();
        res.status(200).send("Success: confirmation Deleted");
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.deleteConfirmation = deleteConfirmation;
