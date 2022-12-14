import React, { useEffect, useState } from 'react';
import { TheaterResponse } from '../types';
import { MovieList } from '../Movies/MovieList';
import { useLocation } from "react-router-dom";


export const TheaterDetail = () => {
    const { state } = useLocation();
    const { theater } = state;
    document.body.style.backgroundColor = "#FFFFFF";

    return (
        <div
            className='card bg-transparent'
            style={{ color: "#1f4e37", width: "75%", height:"75%", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "30px", margin:"auto"}}
        >
            <img src={theater!.image} style={{float: "left", backgroundSize: "cover",  borderRadius: "50px", maxWidth:"500px", height:"100%"}}/>
            <div className="card-body text-center" style={{margin: "auto"}}>
                <h3 className="card-title">{theater!.name}</h3>
                <p>{theater!.description}</p>
                <p>{theater!.address}</p>
            </div>
            <MovieList theater={theater as TheaterResponse} />
        </div>
    );
};