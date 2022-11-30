var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as dbe from '../data/dbCommsSingleton.js';
export const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let list = [];
    try {
        data.forEach(id => {
            if (id === undefined || id === "" || typeof id !== "string") {
                list.push('Error: Invalid Movie ID');
            }
            else if (dbe.hasMovie(id)) {
                list.push(dbe.getMovie(id));
            }
            else {
                list.push('Error: Movie doesnt exists');
            }
        });
        // return list of entities or errors if entity doesnt exists
        res.status(200).send(list);
    }
    catch (err) {
        res.status(400).send("Error: database error");
    }
});
