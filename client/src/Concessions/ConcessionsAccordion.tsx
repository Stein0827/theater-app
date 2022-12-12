import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ConcessionModel } from '../types';
import { privateEncrypt } from 'crypto';

export const ConcessionsAccordion = ({parentCallbacks}: {parentCallbacks: any[]}) => {
    const [concessionCosts, setConcessionCosts, setHasConcessions] = parentCallbacks;
    const [concessions, setConcessions] = useState([]as ConcessionModel[])

    const fetchConcessions = async () => {
        const concessionsRes = await axios.get('http://localhost:4001/api/v1/concessions/all');
        const foundConcessions = (concessionsRes.data);
        console.log("concessions", foundConcessions);
        setConcessions(foundConcessions)
    }

    useEffect(() => {
        fetchConcessions();
    }, []);

    const renderedConcessions = concessions.map((concession) => {
        return (
            // concession image 
            // concession name
            // concession price
            // Add Concession (can click and unclick, subtracts and adds to concession ConstantSourceNode, changes color when added)
            <div></div>
        );
    });

    return (
        <div>
            {renderedConcessions}
        </div>
    );
}