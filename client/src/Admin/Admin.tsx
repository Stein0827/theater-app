import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { TheaterResponse } from '../types';
import axios from 'axios';
// import { AdminRevenue } from "./AdminRevenue"
import { TheaterDisplayWrapper } from "./TheaterDisplayWrapper"
import { MutableMoviesList } from "./MutableMoviesList"
import { MovieAdd } from "./MovieAdd";
import { GenerateChart } from './AdminRevenue';

export const Admin = ({ theaterId }: { theaterId: string }) => {
    const [theater, setTheater] = useState()
    // const { state } = useLocation();
    // const { theaterId } = state;

    const fetchTheater = async () => {
        const theaterRes = await axios.post('http://localhost:4009/api/v1/theaters', [
            theaterId
        ]);
        const foundTheater = (theaterRes.data)[0];
        setTheater(foundTheater)
    }

    useEffect(() => {
        fetchTheater();
    }, []);

    if (theater === undefined) {
        return null
    } else {
        return (
            <div style={{
                width:"75%", margin: "auto", display:"flex", flexDirection:"column"
            }}>
                <GenerateChart theaterId={theaterId}/>
                <TheaterDisplayWrapper theater={theater} setTheater={setTheater}/>
                <MutableMoviesList theater={theater}/>
                <MovieAdd theater={theater}/>
            </div>
        );
    }
}