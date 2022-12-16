import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export const GenerateTable = ({ theaterId }: { theaterId: string }) => {
    const [data, setData] = useState({revObj: [] as any, totalTicketRevenue: 0, totalConcessionRevenue: 0});
    
    const fetchTheaterRevenue = async () => {
        const revRes = await axios.post('http://localhost:4006/api/revenue', {
            theaterId
        });
        setData(revRes.data);
    }

    useEffect(() => {
        fetchTheaterRevenue();
    }, []);

    function getFormattedDate(date: Date) {
        let year = date.getFullYear();
      
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
      }

    const generateBody = data.revObj.map((entry: any) => {
        const date = getFormattedDate(new Date(entry.date));
        return (
            <tr>
                <td>{date}</td>
                <td>${entry.ticketRevenue}</td>
                <td>${entry.concessionsRevenue}</td>
            </tr>
        )
            
    });

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"30px"}}>
            <div style={{
                display:"flex", flexDirection:"row", justifyContent:"space-between", margin:"15px",
                width:"60%"
            }}>
                <div>
                    <h3>Total Ticket Revenue</h3>
                    <h4 style={{textAlign:"center"}}>${data.totalTicketRevenue}</h4>
                </div>
                <div>
                    <h3>Total Concessions Revenue</h3>
                    <h4 style={{textAlign:"center"}}>${data.totalConcessionRevenue}</h4>
                </div>
            </div>

            <Table striped bordered hover style={{width:"70%"}}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Ticket Revenue</th>
                        <th>Concession Revenue</th>
                    </tr>
                </thead>
                <tbody>{generateBody}</tbody>
            </Table>
        </div>
    );
};