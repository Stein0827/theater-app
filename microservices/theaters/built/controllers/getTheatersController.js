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
exports.getTheaters = void 0;
const TheaterModel_js_1 = require("../models/TheaterModel.js");
const getTheaters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resList = [];
    try {
        const data = req.body;
        data.forEach(id => {
            let data_input = { theaterId: id };
            const movieModel = new TheaterModel_js_1.TheaterModel(data_input);
            const movie = movieModel.getTheater();
            resList.push(movie);
        });
    }
    catch (err) {
        resList.push(err);
    }
    res.status(202).send(resList);
});
exports.getTheaters = getTheaters;
