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
exports.getConfirmations = void 0;
const ConfirmationModel_js_1 = require("../models/ConfirmationModel.js");
const getConfirmations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resList = [];
    try {
        const data = req.body;
        data.forEach(id => {
            let data_input = { confirmationId: id };
            const confirmationModel = new ConfirmationModel_js_1.ConfirmationModel(data_input);
            const confirmation = confirmationModel.getConfirmation();
            resList.push(confirmation);
        });
    }
    catch (err) {
        resList.push(err);
    }
    res.status(202).send(resList);
});
exports.getConfirmations = getConfirmations;
