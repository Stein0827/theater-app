var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConcessionModel } from '../models/ConcessionModel.js';
export const getConcessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resList = [];
    try {
        const data = req.body;
        data.forEach(id => {
            let data_input = { snackId: id };
            const concessionModel = new ConcessionModel(data_input);
            const concession = concessionModel.getConcession();
            resList.push(concession);
        });
    }
    catch (err) {
        resList.push(err);
    }
    res.status(202).send(resList);
});
