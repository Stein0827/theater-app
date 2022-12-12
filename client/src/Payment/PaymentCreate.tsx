import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieRequest } from "../types.js"
import { TheaterInfo } from "../Theater/TheaterInfo"
import { ConcessionsAccordion } from "../Concessions/ConcessionsAccordion"

export const PaymentCreate = ({movie, theaterId, showingTime}: {movie: MovieRequest, theaterId: string, showingTime: string}) => {
    const [paymentInfo, setPaymentInfo] = useState({
        movie_id: movie.movie_id,
        theater_id: theaterId,
        date: undefined,
        showing: showingTime,
        concession: undefined,
        tickets: undefined,
        email: undefined,
        fname: undefined,
        lname: undefined,
        cardnum: undefined,
        seccode: undefined,
        cardexp: undefined,
        bstreet: undefined,
        bunit: undefined,
        bstate: undefined,
        bcountry: undefined,
        zip: undefined
    });

    const ticketPrice = 19;
    const [tickets, setTickets] = useState(1)
    const [concessionCosts, setConcessionCosts] = useState(0) 
    const [hasConcessions, setHasConcessions] = useState("none")

    const handleSubmit = () => {

        console.log(paymentInfo);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{display: "flex", flexDirection:"row", alignContent: "center", justifyContent:"space-evenly"}}>
                <img src={movie.thumbnail} style={{maxWidth:"280px", height:"420px"}}/>
                <div style={{display: "flex", flexDirection:"column", justifyContent:"center"}}>
                    <div>{movie.name}</div>
                    <TheaterInfo theaterId={theaterId}/>
                    <div>Time: {showingTime}</div>
                    <div>Ticket's Price: ${tickets * ticketPrice}</div>
                    <div style={{display: hasConcessions}}>Concessions: ${concessionCosts}</div>
                </div>
            </div>
            <div>
                <ConcessionsAccordion parentCallbacks={[concessionCosts, setConcessionCosts, setHasConcessions]}/>
                Credit Card Info Accordion
                Billing Info Accordion 
            </div>
            <button type="submit" className="btn btn-success">Pay</button>
        </form>
    );
}