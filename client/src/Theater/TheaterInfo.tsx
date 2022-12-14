import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TheaterResponse } from '../types';

export const TheaterInfo = ({theaterId}: {theaterId: string}) => {
    const [theater, setTheater] = useState({} as TheaterResponse)

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

    return (
        <div>
            <h2>{theater.name}</h2>
            <p>Address: {theater.address} {theater.zip}</p>
        </div>
    );
}