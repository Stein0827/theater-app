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
exports.getConcessions = void 0;
const ConcessionModel_1 = require("../models/ConcessionModel");
function getConcessions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const resList = [];
        const data = req.body;
        for (const id of data) {
            try {
                let data_input = { snackId: id };
                const concessionModel = new ConcessionModel_1.ConcessionModel(data_input);
                const concession = yield concessionModel.getConcession();
                resList.push(concession);
            }
            catch (err) {
                resList.push(err);
            }
        }
        res.status(202).send(resList);
    });
}
exports.getConcessions = getConcessions;
