import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TheaterResponse } from '../types';
import { useNavigate, Link } from "react-router-dom";


export const TheaterDisplay = ({theater}: {theater: TheaterResponse}) => {
    let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/theaterDetail`;
        navigate(path, {
            state: {
                theater: theater
            }
        });
    }

    const HoverSelect = (e: any) => {
        if (e.target.id === "hovermenu") {
            e.target.style.transform = 'scale(1.03)';
        }
        else if (e.target.parentElement.id === "hovermenu") {
            e.target.parentElement.style.transform = 'scale(1.03)';
        }
    }

    const NotHover = (e: any) =>  {
        if (e.target.id === "hovermenu") {
            e.target.style.transform = 'scale(1)';
            console.log(e);
        }
        else if (e.target.parentElement.id === "hovermenu") {
            console.log(e);
            e.target.parentElement.style.transform = 'scale(1)';
        }
    }
    console.log(theater);

    return (
        <div
            className='card'
            style={{ color: "#1f4e37", backgroundColor: "#8FA298", width: "75%", height:"75%", display: "flex", flexDirection: "row", alignItems: "center", borderRadius: "30px", cursor:"pointer", margin:"auto"}}
            onClick={routeChange}
            onMouseOver={HoverSelect}
            onMouseLeave={NotHover}
            id="hovermenu"
        >
            <img src={theater.image as string} style={{float: "left", backgroundSize: "cover",  borderRadius: "30px", width:"50%", height:"100%"}}/>
            <div className="card-body text-center" style={{margin: "auto"}}>
                <h3 className="card-title">{theater.name}</h3>
                <p>{theater.description}</p>
            </div>
        </div>
    );
};