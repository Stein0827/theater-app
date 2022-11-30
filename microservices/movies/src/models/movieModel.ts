import { MovieRequest } from '../types.js';
import * as dbe from '../data/dbCommsSingleton.js';

export class MovieModel {
    id: string | undefined;
    name: string | undefined;
    desc: string | undefined;
    length: string | undefined;
    rating: string | undefined;
    thumbnail: File | undefined;
    trailer: string | undefined;

    constructor(data: MovieRequest) {
        this.id = data.movie_id;
        this.name = data.name;
        this.desc = data.desc;
        this.length = data.length;
        this.rating = data.rating;
        this.thumbnail = data.thumbnail;
        this.trailer = data.trailer;
    }

    createMovie() {
        this.id = dbe.getNewID()
        return dbe.createMovie(this);
    }

    updateMovie() {
        if (dbe.hasMovie(this.id as string)) {
            return dbe.updateMovie(this);
        }
            return "failed";
    }

    deleteMovie() {
        return dbe.deleteMovie(this.id as string);
    }
}