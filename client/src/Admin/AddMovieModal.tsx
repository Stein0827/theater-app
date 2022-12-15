import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MovieResponse } from "../types.js";

export const AddMovieModal = () => {
    const [allMovies, setAllMovies] = useState([] as MovieResponse[]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function fetchAllMovies() {
        const moviesRes = await axios.get('http://localhost:4004/api/v1/movies/all');
        setAllMovies(moviesRes.data)
    }

    useEffect(() => {
        fetchAllMovies()
    }, [])

    const renderedMovies = allMovies.map((movie) => {

    })

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}