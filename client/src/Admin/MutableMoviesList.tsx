// Alan Castillo (#59078415)

import React, {useState, useEffect} from "react";
import axios from 'axios';
import { MovieResponse } from "../types.js";
import { TheaterResponse } from "../types"
import { Button } from "react-bootstrap";
import { ShowingEditModal } from "./ShowingEditModal"

export const MutableMoviesList = ({theater}: {theater: TheaterResponse | undefined}) => {
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
            <div key={movie.movie_id} style={{
                display:"flex", flexDirection:"row", justifyContent:"center"
            }}>
                <img src={movie.thumbnail} alt="thumbnail" style={{
                    height:"250px", width:"150px", marginRight:"20px"
                }}/>
                <div style={{
                    width: "100px", display:"flex", flexDirection:"column", justifyContent:"space-evenly"
                }}>
                    <ShowingEditModal callbacks={[theater!._id, movie.movie_id]}/>
                </div>
            </div>
        );
    })

    return (
        <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 300px)", gridGap: "10px", justifyContent:"center",
            borderBottom: "0.5px solid grey", paddingBottom: "20px", borderTop:"0.5px solid grey", paddingTop: "30px"
        }}>
            {renderedMovies}
        </div>
    );
}