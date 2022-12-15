import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Line } from "react-chartjs-2";

export const GenerateChart = ({ theaterId }: { theaterId: string }) => {
    const [data, setData] = useState({revObj: [], totalTicketRevenue: 0, totalConcessionRevenue: 0});
    
    const fetchTheaterRevenue = async () => {
        const revRes = await axios.post('http://localhost:4006/api/revenue', [
            theaterId
        ]);
        setData(revRes.data);
    }

   const modifyData = (data: any) => {
      return {
        "labels": data.map((d: any) => d.date),
        "datasets": [
            {
                "label": "Ticket Revenue",
                "data": data.map((d: any) => d.ticketRevenue),
            },
            {
                "label": "Concession Revenue",
                "data": data.map((d: any) => d.concessionsRevenue), 
            }
        ]
      }
   }

    useEffect(() => {
        fetchTheaterRevenue();
    }, []);

    return (
        <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>Line Chart</h2>
        <Line
          data={modifyData(data.revObj)}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Users Gained between 2016-2020"
              },
              legend: {
                display: false
              }
            }
          }}
        />
      </div>
    );
};