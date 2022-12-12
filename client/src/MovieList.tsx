import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieRequest } from "./types.js"
import { OperationsModal } from "./OperationsModal"

export const MovieList = ({theaterId}: {theaterId: string}) => {

    const [movies, setMovies] = useState<MovieRequest[]>([]);

    const fetchMovies = async () => {
        const theaterRes = await axios.post('http://localhost:4009/api/v1/theaters', [theaterId]);
        const theater = (theaterRes.data)[0];

        const movieIdArr = theater.movies;
        const moviesRes = await axios.post('http://localhost:4004/api/v1/movies', movieIdArr);
        setMovies(moviesRes.data);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const renderedMovies = movies.map((movie) => {
        return (
            <div
                className="card text-white bg-dark mb-3"
                style={{ width: '70%', height:420, marginBottom: '20px', margin:"auto", top: "50%"}}
                id={(movie.movie_id as number).toString()}
                key={movie.movie_id}
            >
                <div 
                    className="card text-white bg-dark mb-3" 
                    style={{ width: "100%", height:"100%", display: "flex", flexDirection: "row", alignItems: "center"}}
                >
                    <img src={movie.thumbnail} width="250" height="400" style={{padding: "20px"}}/>
                    <div className="card-body text-center" style={{margin: "auto"}}>
                        <h3 className="card-title">{movie.name}</h3>
                        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", padding: "15px 10% 15px 10%"}}>
                            <h6 className="card-subtitle mb-2 text-muted">Length: {movie.length}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Rating: {movie.rating}</h6>
                        </div>
                        <p>{movie.desc}</p>
                        <OperationsModal movie={movie} theaterId={theaterId}/>
                    </div>
                </div>
            </div>
        );
    });

  return (
    <div className="renderedMovies">
      {renderedMovies}
    </div>
  );
};

export default MovieList;
