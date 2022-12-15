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
        console.log(movieIdArr)
        const moviesRes = await axios.post('http://localhost:4004/api/v1/movies', movieIdArr);
        console.log(moviesRes)
        setMovies(moviesRes.data);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    async function handleDeleteClick(movieId: number) {
        console.log(movieId)

        try {
            await axios.post("localhost:4004/api/v1/movie", {"movie_id": movieId})
        } catch (err) {
            console.log(err)
        }
    }
    
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
                    <Button variant="danger" onClick={(e) => handleDeleteClick(movie.movie_id as number)}>Remove</Button>
                </div>
                
            </div>
        );
    })

    return (
        <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 300px)", gridGap: "10px", justifyContent:"center",
            borderBottom: "0.5px solid grey", paddingBottom: "20px"
        }}>
            {renderedMovies}
        </div>
    );
}