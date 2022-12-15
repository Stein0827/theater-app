import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

export const ShowingEditModal = ({callbacks}: any) => {
    const [theaterId, movieId] = callbacks;

    const [showings, setShowings] = useState([] as string[])
    const [show, setShow] = useState(false);
    const [operations, setOperations] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function fetchShowings() {
        try {
            const operationsRes = await axios.post('http://localhost:4003/api/v1/get/operations', {
                movie_id: movieId,
                theater_id: theaterId
            });
            const operations = (operationsRes.data);
            setOperations(operations)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        fetchShowings()
    }, [])

    function handleAddShowing() {
        const showingStr = (document.getElementById("inputAddShowing") as HTMLInputElement).value
        console.log(showingStr)
        setOperations( { ...operations, [showingStr]: 30} )
        console.log("operations", operations)
    }

    const handleShowingChange = (val:any) => {
        setShowings(val)
    }

    async function handleSaveChanges() {
        for (let showing of showings) {
            setOperations((current) => {
                let copy = {...current}
                delete copy[showing as keyof typeof copy]
                return copy
            })
        }

        try {
            const res = await axios.put("http://localhost:4003/api/v1/operations", {
                // @ts-ignore
                theater_id: theaterId,
                movie_id: movieId,
                operations: operations
            });
            
            console.log("axios operations update response", res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const renderedOperations = Object.keys(operations).map((operation)=> {
        return (
            <ToggleButton text-center variant="light" id={"tbg-btn-"+ operation} key={operation} value={operation} style={{
                marginRight: "10px", textTransform:"uppercase", width: "90px"
            }}>
                {operation}
            </ToggleButton>
        );
    });

    return (
        <>
            <Button variant="light" onClick={handleShow}>
                Edit Showings
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Movie Showings</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h5>Remove Select Showings</h5>

                    <ToggleButtonGroup type="checkbox" value={showings} onChange={handleShowingChange} style={{
                        margin:"20px"
                    }}>
                        {renderedOperations}
                    </ToggleButtonGroup>

                    <h6> OR </h6>

                    <InputGroup className="mb-3" style={{margin:"20px", width:"250px"}}>
                        <Form.Control
                        placeholder="Add Showing (1:30PM)"
                        aria-label="Add Showing"
                        aria-describedby="basic-addon2"
                        id="inputAddShowing"
                        style={{}}
                        />
                        <Button variant="outline-success" onClick={handleAddShowing}>
                        Add
                        </Button>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}