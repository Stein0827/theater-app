import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieResponse } from "../types.js";
import { OperationsModal } from "../Operations/OperationsModal";
import { TheaterResponse } from '../types';

export const MovieList = ({theater}: {theater: TheaterResponse | undefined}) => {

    const [movies, setMovies] = useState<MovieResponse[]>([]);

    const fetchMovies = async () => {
        const movieIdArr = theater!.movies;
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
                style={{ boxShadow: '5x 5px 9px #666a68', width: '60%', height:"420px", marginBottom: '20px', margin:"auto", top: "50%", borderRadius: "30px"}}
                id={(movie.movie_id as number).toString()}
                key={movie.movie_id}
            >
                <div 
                    className="card text-white bg-dark mb-3" 
                    style={{ width: "100%", height:"100%", display: "flex", flexDirection: "row", alignItems: "center", borderRadius: "30px"}}
                >
                    <img src={movie.thumbnail}  style={{float: "left", backgroundSize: "cover",  borderRadius: "30px", maxWidth:"280px", height:"420px"}}/>
                    <div className="card-body text-center" style={{margin: "auto"}}>
                        <h3 className="card-title">{movie.name}</h3>
                        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", padding: "15px 10% 15px 10%"}}>
                            <h6 className="card-subtitle mb-2 text-muted">Length: {movie.length}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Rating: {movie.rating}</h6>
                        </div>
                        <p>{movie.desc}</p>
                        <OperationsModal movie={movie} theaterId={theater!.id as string}/>
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
