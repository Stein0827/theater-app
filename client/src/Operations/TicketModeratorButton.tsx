import React, {useState} from "react";

export const  TicketModeratorButton = ({parentCallbacks}: {parentCallbacks: any[]}) => {
    const [tickets, setTickets] = parentCallbacks;

    const incTickets = () =>{
        setTickets(Number(tickets)+1);
    };

    const decTickets = () =>{
        setTickets(Number(tickets)-1);
    };

    const handleChange = (e:any) =>{
        setTickets(parseInt(e.target.value));
    }
   
    return (
        <div className="col-xl-1" style={{
            width:"130px", marginLeft:"20px"
        }}>
            <div className="input-group">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-primary" type="button" onClick={decTickets}>-</button>
                </div>
                <input type="text" className="form-control text-center" value={tickets} onChange={handleChange}/>
                <div className="input-group-prepend">
                    <button className="btn btn-outline-primary" type="button" onClick={incTickets}>+</button>
                </div>
            </div>
        </div>
    );
}