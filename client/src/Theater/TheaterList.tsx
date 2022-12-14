import { TheaterModel } from '../types';
import { TheaterDisplay } from './TheaterDisplay';
import React, { useEffect, useState } from 'react';

export const TheaterList = ({theaters}: {theaters: TheaterModel[]}) => {
    if (theaters.length > 0) {
        const renderedTheaters = theaters.map((currTheater) => {
            return (
                <div
                    className="card mb-3"
                    style={{ backgroundColor: "#8FA298", boxShadow: '5px 5px 9px #666a68', width: '60%', height:"420px", marginBottom: '20px', margin:"auto", top: "50%", borderRadius: "30px"}}
                    id={(currTheater.id as string)}
                    key={currTheater.name as string}
                >
                    <TheaterDisplay theater={currTheater}/>
                </div>
            )
        });
        return (<div>{renderedTheaters}</div>);
    }
    return (
        <div className="card text-center mb-3" style={{
            color: "#1f4e37", 
            backgroundColor: "#8FA298", 
            boxShadow: '5px 5px 9px #666a68', 
            width: '60%', 
            height:"250px", 
            marginBottom: '20px', 
            margin:"auto", 
            top: "50%", 
            borderRadius: "30px"}}
        >
            <p style={{textAlign: 'center', fontSize: 20, margin: 'auto'}}>result not found</p>
        </div>
    );
};