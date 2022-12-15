import React, { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios';

export const OperationsList = ({parentCallbacks, movieId, theaterId}: {parentCallbacks: any[], movieId: number, theaterId: string}) => {
    const [setShowing, setDisable] = parentCallbacks;
    const [operationsState, setOperations] = useState({});
    const [radioValue, setRadioValue] = useState("");

    const fetchOperations = async () => {
        try {
            console.log(movieId, theaterId)
            const operationsRes = await axios.post('http://localhost:4003/api/v1/get/operations', {
                movie_id: movieId,
                theater_id: theaterId
            });
            const operations = (operationsRes.data);
            console.log("operations", operations);
            setOperations(operations)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchOperations();
    }, []);

    const renderedOperations = Object.keys(operationsState).map((time)=> {
        return (
            <ToggleButton
                key={time}
                id={time}
                type="radio"
                variant="dark"
                name="radio"
                value={time}
                checked={radioValue === time}
                onChange={(e) => {
                    setRadioValue(e.currentTarget.value);
                    setShowing(e.currentTarget.value);
                    setDisable(false);
                }}
                style={{textTransform: "uppercase", borderRadius:"5px", margin:"7px"}}
                >
                {time}
            </ToggleButton>
        );
    })

    return (
        <ButtonGroup style={{
            margin: "auto"
        }}>
            {renderedOperations}
        </ButtonGroup>
    );
    
}