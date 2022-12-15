import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { TheaterResponse } from "../types"
import { TheaterRequest } from "../types"
import axios from 'axios';

export function TheaterEditModal({theater, setTheater}:{theater: TheaterResponse, setTheater:any}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = async () => {
    const theaterRequest: TheaterRequest = {
        theaterId: theater._id,
        name: (document.getElementById("inputTheaterName") as HTMLInputElement).value,
        address: (document.getElementById("inputTheaterAddress") as HTMLInputElement).value,
        description: (document.getElementById("inputTheaterDesc") as HTMLInputElement).value,
        theaterImage: (document.getElementById("inputTheaterImage") as HTMLInputElement).value
    }

    try {
        const res = await axios.put("http://localhost:4009/api/v1/theater", theaterRequest)
        setTheater(res.data)
        setShow(false)
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <>
      <Button variant="light" onClick={handleShow} style={{
         width:"200px", marginBottom:"20px", marginTop:"20px", color: "brown"
      }}> Edit Theater</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{theater.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="inputTheaterName">
                    <Form.Label>Theater Name</Form.Label>
                    <Form.Control type="text" placeholder={theater.name} defaultValue={theater.name}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="inputTheaterAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address" placeholder={theater.address} defaultValue={theater.address}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputTheaterDesc">
                    <Form.Label>description</Form.Label>
                    <Form.Control type="text" placeholder={theater.description} defaultValue={theater.description}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="inputTheaterImage">
                    <Form.Label>Theater Image</Form.Label>
                    <Form.Control type="text" placeholder={theater.image} defaultValue={theater.image}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}