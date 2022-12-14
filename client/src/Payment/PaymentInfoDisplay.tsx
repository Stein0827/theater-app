import React, {useState} from "react";
import { TheaterInfo } from "../Theater/TheaterInfo"
import { TicketModeratorButton } from "../Operations/TicketModeratorButton"

export const PaymentInfoDisplay = ({parentCallbacks}: {parentCallbacks: any[]}) => {
    const [tickets, setTickets, concessionCosts, hasConcessions, theaterId, movieName, showingTime, handlePayment] = parentCallbacks;

    const ticketPrice = "19";

    return (
        <div style={{
            display: "flex", flexDirection:"row", justifyContent:"space-between", 
            padding: "20px 0 20px 0", alignItems:"center"
        }}>
            {/* <img src={movie.thumbnail} style={{maxWidth:"220px", height:"350px", borderRadius: "20px"}}/> */}
            <div style={{paddingLeft:"10%", minWidth:"200px"}}>
                <h5 >Number of Tickets:</h5>
                <TicketModeratorButton parentCallbacks={[tickets, setTickets]} />
                <br/>
                <div>Ticket Costs: ${(parseFloat(tickets) *  parseFloat(ticketPrice)).toFixed(2)}</div>
                <div style={{display: hasConcessions}}>Concession Costs: ${concessionCosts}</div>
                <h2>Total: ${((parseFloat(tickets) *  parseFloat(ticketPrice)) + parseFloat(concessionCosts)).toFixed(2)}</h2>
                <button className="btn btn-success" onClick={handlePayment} style={{
                    width: "150px", marginLeft:"5%"
                }}>Pay</button>
            </div>
            <div className="text-center" style={{display: "flex", flexDirection:"column", justifyContent:"right", alignContent:"flex-end" }}>
                <TheaterInfo theaterId={theaterId}/>
                <div>
                    <h4>{movieName}</h4>
                    <h2 style={{color: "#194d33"}}>Time: {showingTime} Today</h2>
                </div>
            </div>
        </div>
    );
}