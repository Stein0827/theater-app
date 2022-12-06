var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TheaterLocationModel } from '../models/theaterLocationModel.js';
export const getLocalTheaters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resList;
    try {
        const data = req.body;
        const theaterLocationModel = new TheaterLocationModel(data);
        resList = theaterLocationModel.getLocalTheaters();
        res.status(200).send(resList.localTheatersList);
    }
    catch (err) {
        res.status(400).send(`${err.name}: ${err.message} with zipcode: ${err.list[0]}`);
    }
});
