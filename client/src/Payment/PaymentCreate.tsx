import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { MovieResponse } from "../types.js"
import { AccordionItems } from "./AccordianItems"
import { PaymentInfoDisplay } from "./PaymentInfoDisplay"
import { ConcessionsList } from "../Concessions/ConcessionsList"

export const PaymentCreate = ({movie, theaterId, showingTime}: {movie: MovieResponse, theaterId: string, showingTime: string}) => {
    const [tickets, setTickets] = useState("1")
    const [concessionCosts, setConcessionCosts] = useState("0") 
    const [hasConcessions, setHasConcessions] = useState("none")
    const [accordianKey, setAccordianKey] = useState("creditcard")

    const handlePayment = async () => {
        const fnameStr = document.getElementById("inputFName");
        const lnameStr = document.getElementById("inputLName");
        const cardnumStr = document.getElementById("inputCard");
        const seccodeStr = document.getElementById("inputSec");
        const cardexpStr = document.getElementById("inputExp");
        const emailStr = document.getElementById("inputEmail");
        const bstreetStr = document.getElementById("inputAddress");
        const bunitStr = document.getElementById("inputAddress2");
        const bstateStr = document.getElementById("inputState");
        const zipStr = document.getElementById("inputZip");

        const paymentRequest = {
            movie_id: movie.movie_id,
            theater_id: theaterId,
            date: new Date(),
            showing: showingTime,
            concession: concessionCosts,
            tickets: (Number(tickets) * 19),
            fname: fnameStr,
            lname: lnameStr,
            cardnum: cardnumStr,
            seccode: seccodeStr,
            cardexp: cardexpStr,
            email: emailStr,
            bstreet: bstreetStr,
            bunit: bunitStr,
            bstate: bstreetStr,
            bcountry: "USA",
            zip: zipStr
        };

        const paymentRes = await axios.post('localhost:4005/api/v1/payment', JSON.stringify(paymentRequest))
        console.log(paymentRes)
    };

    return (
        <div style={{
            width: "80%", display: "flex", flexDirection:"column", 
            justifyContent:"space-evenly", margin:"auto", paddingTop: "50px"
        }}>
            <div style={{
                position: "sticky", top: "0", backgroundColor: "white", zIndex:"999"
            }}>
                <PaymentInfoDisplay parentCallbacks={[tickets, setTickets, concessionCosts, hasConcessions, theaterId, movie.name, showingTime, handlePayment]}/>
                <ConcessionsList parentCallbacks={[concessionCosts, setConcessionCosts, setHasConcessions, setAccordianKey, accordianKey]}/>
            </div>
            
            <Accordion defaultActiveKey={accordianKey} alwaysOpen>
                <AccordionItems parentCallbacks={[ accordianKey, concessionCosts, setAccordianKey, setConcessionCosts, setHasConcessions]}/>
            </Accordion>
            
            <button className="btn btn-success" onClick={handlePayment} style={{
                    width: "150px", margin:"auto", marginTop: "30px", marginBottom: "50px"
            }}>Pay</button>
        </div>
    );
}