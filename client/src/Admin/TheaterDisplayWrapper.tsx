// Alan Castillo (#59078415)

import React from 'react';
import { Button } from 'react-bootstrap';
import { TheaterDisplay } from '../Theater/TheaterDisplay';
import { TheaterEditModal } from "./TheaterEditModal"
import { TheaterResponse } from "../types"

export const TheaterDisplayWrapper = ({theater, setTheater}: {theater: TheaterResponse, setTheater: any}) => {
    return (
        <div style={{
            margin:"15px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center", borderBottom: "0.5px solid grey"
        }}>
            <div style={{
                pointerEvents:"none", display:"flex"
            }}>
                <TheaterDisplay theater={theater}/>
            </div>
            <TheaterEditModal theater={theater} setTheater={setTheater}/>
        </div>
    );
}