import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

export const OperationsList = ({movieId, theaterId}: {movieId: number, theaterId: string}) => {
    const [operationsState, setOperations] = useState({});
    const fetchOperations = async () => {
        const operationsRes = await axios.post('http://localhost:4003/api/v1/get/operations', {
            movie_id: movieId,
            theater_id: theaterId
        });
        const operations = (operationsRes.data);
        console.log("operations", operations);
        setOperations(operations)
    };

    useEffect(() => {
        fetchOperations();
    }, []);

    const renderedOperations = Object.keys(operationsState).map((time)=> {
        return (
            <ListGroup.Item>{time}</ListGroup.Item>
        );
    })

    return (
        <ListGroup horizontal className="renderedOperations">
            {renderedOperations}
        </ListGroup>
    );
    
}