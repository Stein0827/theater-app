import * as dbe from '../data/dbCommsSingleton.js';
export class MovieModel {
    constructor(data) {
        this.id = data.movie_id;
        this.name = data.name;
        this.desc = data.desc;
        this.length = data.length;
        this.rating = data.rating;
        this.thumbnail = data.thumbnail;
        this.trailer = data.trailer;
    }
    createMovie() {
        this.id = dbe.getNewID();
        return dbe.createMovie(this);
    }
    updateMovie() {
        if (dbe.hasMovie(this.id)) {
            return dbe.updateMovie(this);
        }
        return "failed";
    }
    deleteMovie() {
        return dbe.deleteMovie(this.id);
    }
}
