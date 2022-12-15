import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useLocation } from "react-router-dom";
import { MovieResponse } from "../types.js"
import { AccordionItems } from "./AccordianItems"
import { PaymentInfoDisplay } from "./PaymentInfoDisplay"
import { ConcessionsList } from "../Concessions/ConcessionsList"
import { PayConfirmationModal } from "./PayConfirmationModal"

export const PaymentCreate = () => {
    const { state } = useLocation();
    const { movie, theaterId, showingTime } = state;

    const [tickets, setTickets] = useState("1")
    const [concessionCosts, setConcessionCosts] = useState("0.00") 
    const [hasConcessions, setHasConcessions] = useState("none")
    const [accordianKey, setAccordianKey] = useState("creditcard")

    return (
        <div style={{
            width: "80%", display: "flex", flexDirection:"column", 
            justifyContent:"space-evenly", margin:"auto", paddingTop: "50px"
        }}>
            <div style={{
                backgroundColor: "white", zIndex:"999"
            }}>
                <PaymentInfoDisplay parentCallbacks={[tickets, setTickets, concessionCosts, hasConcessions, theaterId, movie, showingTime]}/>
                <ConcessionsList parentCallbacks={[concessionCosts, setConcessionCosts, setHasConcessions, setAccordianKey, accordianKey]}/>
            </div>
            
            <Accordion defaultActiveKey={accordianKey} alwaysOpen>
                <AccordionItems parentCallbacks={[ accordianKey, concessionCosts, setAccordianKey, setConcessionCosts, setHasConcessions]}/>
            </Accordion>
            
            <PayConfirmationModal movie={movie} theaterId={theaterId} showingTime={showingTime} concessionCosts={concessionCosts} tickets={tickets}/>
        </div>
    );
}