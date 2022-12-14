import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TheaterResponse } from '../types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { TheaterList } from './TheaterList'



export const GetTheaterByZip = () => {
    const [theaters, setTheater] = useState([] as TheaterResponse[]);
    const [text, setText] = useState("");
    const [clicked, setClicked] = useState(false);

    const fetchTheaters = async () => {
        const theaterIdRes = await axios.post('http://localhost:4008/api/theaters/locate', {"zipcode":text});
        console.log(theaterIdRes.data);
        const foundTheaterIds = theaterIdRes.data;
        const theaterRes = await axios.post('http://localhost:4009/api/v1/theaters', foundTheaterIds);
        const foundTheaters = theaterRes.data;
        setTheater(foundTheaters);
        setClicked(true);
    }

    const HandleTextChange = (event: any) => {
        setText(event.target.value);
    };

    let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/signin`; 
        navigate(path);
    }
    document.body.style.backgroundColor = "#4D6C71";

    return (
        <div className="mb-3">
            <h1 className="text-center">Find Theaters By Zip</h1>
            <InputGroup className="m-3 mx-auto" style={{ alignItems:"center", display:"flex", flexDirection: "row", width: "19%" }}>
                <Form.Control
                    placeholder="zip code"
                    type="text"
                    onChange={HandleTextChange}
                />
                <Button id="search" onClick={fetchTheaters} style={{color: "#1f4e37", backgroundColor: "#aeaaa6"}}>
                    search
                </Button>
            </InputGroup>
            <Button 
                className='m-3 mx-auto text-center'
                style={{ color: "#1f4e37", backgroundColor: "#aeaaa6", display:"flex" }}
                onClick={routeChange}
            >sign up your theater</Button>
            {clicked && <TheaterList theaters={theaters} />}
        </div>
    );
}
