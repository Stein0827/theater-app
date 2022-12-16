// Alan Castillo (#59078415)

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ConcessionResponse } from '../types';

export const ConcessionsList = ({parentCallbacks}: {parentCallbacks: any[]}) => {
    const [concessionCosts, setConcessionCosts, setHasConcessions, setAccordianKey, accordianKey] = parentCallbacks;
    const [concessions, setConcessions] = useState([] as ConcessionResponse[]);
    const scrollDiv = useRef<HTMLDivElement>(null);

    const fetchConcessions = async () => {
        const concessionsRes = await axios.get('http://localhost:4001/api/v1/concessions/all');
        const foundConcessions = (concessionsRes.data);
        setConcessions(foundConcessions)
    }

    const horizontalScroll = (e:any) => {
        e.preventDefault();
        e.currentTarget.scrollLeft += e.deltaY;
    }
    const setScrollEventListener = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref && ref.current) {
            ref.current.addEventListener("wheel", horizontalScroll, {passive: false})
        }
    }

    useEffect(() => {
        fetchConcessions();
        setScrollEventListener(scrollDiv);
    }, []);

    const handleClick = (event: any) => {
        const concessionPrice = event.target.dataset.item;
        
        if (event.target.style.border === "2px solid rgb(220, 145, 67)") {
            console.log(event.target.style.border)
            event.target.style.border = "0.5px solid grey";
            setConcessionCosts((parseFloat(concessionCosts)-parseFloat(concessionPrice)).toFixed(2));
            if (concessionCosts === "0.00") setHasConcessions(false)
        } else {
            console.log(event.target.style.border)
            event.target.style.border = "2px solid rgb(220, 145, 67)";
            setConcessionCosts((parseFloat(concessionCosts)+parseFloat(concessionPrice)).toFixed(2));
            setHasConcessions(true);
        }
    }

    function giveBoxShadow(event:any) {
        event.target.style.boxShadow = "3px 3px 9px #DC9142";
    }

    function removeBoxShadow(event:any ) {
        event.target.style.boxShadow = null;
    }

    const renderedConcessions = concessions.map((concession) => {
        return (
            <div className="rounded" 
            data-item={concession.price} 
            key={concession._id}
            onMouseEnter={giveBoxShadow} 
            onMouseLeave={removeBoxShadow} 
            onClick={handleClick} 
            style={{ 
                minWidth: "180px", maxWidth:"180px", height:"100px", border:"0.5px solid grey", marginRight: "15px",
                display: "flex", flexDirection:"row", alignItems:"center"
            }}>
                <img src={concession.image} alt="image" style={{maxWidth:"70px", height:"70px", pointerEvents:"none"}}/>
                <div style={{ pointerEvents:"none"}}>
                    <h5>{concession.name}</h5>
                    <h6>${concession.price}</h6>
                </div>
            </div>
        );
    });

    return (
        <div style={{
            margin: "15px 5px 10px 5px", borderTop: "0.5px solid #194d33", paddingTop:"10px"
        }}>
            <h5>Optional Concessions: </h5>
            <div 
                style={{
                    display:"flex", overflowX:"scroll", margin: "15px 0 15px 0", 
                    padding: "10px 0 10px 0", borderBottom: "1px solid #194d33"
                }}
                ref={scrollDiv} 
            >
                {renderedConcessions}
            </div>
        </div>
    );
}