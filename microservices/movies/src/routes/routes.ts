import express, {Router, Request, Response} from 'express';
import { createMovie } from '../controllers/createMovieController.js';
import { deleteMovie } from '../controllers/deleteMovieController.js';
import { getMovies } from '../controllers/getMoviesController.js';
import { updateMovie } from '../controllers/updateMoviesController.js';
import { getAllMovies } from '../controllers/getAllMoviesController.js';

const router = Router();

router.post('/api/v1/movie', createMovie);
router.put('/api/v1/movie', updateMovie);
router.get('/api/v1/movies', getMovies);
router.get('/api/v1/movies/all', getAllMovies);
router.delete('/api/v1/movie', deleteMovie);

export {router};