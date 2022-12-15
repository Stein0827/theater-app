import React, {useState, useEffect} from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MovieResponse } from "../types.js";
import { OperationsModal } from "../Operations/OperationsModal";
import { TheaterResponse } from '../types';



export const MovieAdd = ({theater}: {theater: TheaterResponse}) => {

    const handleClose = () => {
        setShow(false);
        fetchMovies();
        window.location.reload();
    }
    const handleShow = () => {
        setShow(true);
        fetchMovies();
    }

    const updateMovieList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, movie: number) => {
        updateMoviesOfTheater(movie);
    }

    const [theaterSet, setTheaterSet] = useState(new Set(theater.movies));
    
    const [show, setShow] = useState(false);

    const [movies, setMovies] = useState<MovieResponse[]>([]);

    const fetchMovies = async () => {
        const moviesRes = await axios.get('http://localhost:4004/api/v1/movies/all');
        console.log(moviesRes);
        setMovies(moviesRes.data);
    };

    const updateMoviesOfTheater = async(movie: number) => {
        console.log(theater.movies);
        if (theaterSet.has(movie) && theater.movies !== undefined) {
            theater.movies = theater.movies.filter((e) => e !== movie);
        }
        else if (!theaterSet.has(movie) && theater.movies !== undefined){
            theater.movies.push(movie);
        }
        setTheaterSet(new Set(theater.movies));
        console.log(theater.movies);
        const theaterRes = await axios.put('http://localhost:4009/api/v1/theater/movies', theater);
        console.log(theaterRes);
    }


    const EditButton = ({movie}: {movie: MovieResponse}) => {
        let text = "remove";
        let color = 'red';
        if (!theaterSet.has(movie.movie_id as number)) {
            text = "add";
            color = 'blue';
        }

        return (
            <>
                <Button 
                    style={{width:"120px", marginBottom:"20px", marginTop:"20px", backgroundColor: `${color}`}} 
                    onClick={event => updateMovieList(event, movie.movie_id as number)}>{text}
                </Button>
            </>
        );
    }    


    const renderedMovies = movies.map((movie) => {
        return (
            <div
                className="card text-white bg-dark mb-3"
                style={{ boxShadow: '5x 5px 9px #666a68', marginBottom: '20px', margin:"auto", borderRadius: "30px"}}
                id={(movie.movie_id as number).toString()}
                key={movie.movie_id}
            >
                <div 
                    className="card text-white bg-dark mb-3" 
                    style={{ display: "flex", flexDirection: "row", alignItems: "center", borderRadius: "30px"}}
                >
                    <img src={movie.thumbnail}  style={{float: "left", backgroundSize: "cover",  borderRadius: "30px", maxWidth:"280px", height:"420px"}}/>
                    <div className="card-body text-center" style={{margin: "auto"}}>
                        <h3 className="card-title">{movie.name}</h3>
                        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", padding: "15px 10% 15px 10%"}}>
                            <h6 className="card-subtitle mb-2 text-muted">Length: {movie.length}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Rating: {movie.rating}</h6>
                        </div>
                        <p>{movie.desc}</p>
                        <EditButton movie={movie}/>
                    </div> 
                </div>
            </div>
        );
    });

    return (
        <>
            <Button variant="light" onClick={handleShow} style={{margin:"auto", display: 'flex', justifyContent: 'center', width:"200px", marginBottom:"20px", marginTop:"20px", color: "brown"}}>
                Add/Remove movies
            </Button>

            <Modal centered size="lg" show={show} onHide={handleClose} style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", textAlign: "center"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add/Remove movies</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{renderedMovies}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};



