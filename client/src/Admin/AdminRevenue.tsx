import React, { useState, useEffect } from "react";
import axios from 'axios';
import rd3 from 'react-d3';

export const GenerateChart = ({ theaterId }: { theaterId: string }) => {
    const [data, setData] = useState({revObj: [], totalTicketRevenue: 0, totalConcessionRevenue: 0});
    
    const LineChart = rd3.LineChart;

    const fetchTheaterRevenue = async () => {
        const revRes = await axios.post('http://localhost:4006/api/revenue', [
            theaterId
        ]);
        setData(revRes.data);
    }

   const modifyData = (data: any) => {
      const res = [{"name": "Ticket Revenue", "values": [] as any}, {"name": "Concession Revenue", values: [] as any}];
      for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        res[0].values.push({"x": entry.date, "y": entry.ticketRevenue});
        res[1].values.push({"x": entry.date, "y": entry.concessionRevenue});
      }
      return res;
   }

    useEffect(() => {
        fetchTheaterRevenue();
    }, []);

    return (
        <div>
            <LineChart
                legend={true}
                data={modifyData(data.revObj)}
                width={500}
                height={300}
                title="Line Chart"
            />
        </div>
    );
};