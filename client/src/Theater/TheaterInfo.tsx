import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TheaterModel } from '../types';

export const TheaterInfo = ({theaterId}: {theaterId: string}) => {
    const [theater, setTheater] = useState({} as TheaterModel)

    const fetchTheater = async () => {
        const theaterRes = await axios.post('http://localhost:4009/api/v1/theaters', [
            theaterId
        ]);
        const foundTheater = (theaterRes.data)[0];
        console.log("theater", foundTheater);
        setTheater(foundTheater)
    }

    useEffect(() => {
        fetchTheater();
    }, []);

    return (
        <div>
            <h1>{theater.name}</h1>
            <h3>Address: {theater.address} {theater.zip}</h3>
        </div>
    );
}