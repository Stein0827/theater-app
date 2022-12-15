import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MovieResponse } from "../types.js"
import { OperationsList } from "./OperationsList"


export const OperationsModal = ({movie, theaterId}: {movie: MovieResponse, theaterId: string}) => {
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState("");
  const [disable, setDisable] = React.useState(true);

  const handleClose = () => {
    setShow(false)
    setDisable(true)
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Showtimes
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.name}</Modal.Title>
        </Modal.Header >
        <Modal.Body style={{display: "flex", flexDirection: "column", justifyContent:"center"}}>
            <iframe width="100%" height="370px" style={{marginBottom:"15px"}} src={movie.trailer + "?autoplay=1&mute=1"}> </iframe>
            <h6 className="mb-2 text-muted" style={{padding: "10px 30px"}}>{movie.desc}</h6>
            <OperationsList parentCallbacks={[setShowing, setDisable]} movieId={movie.movie_id as number} theaterId={theaterId}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" disabled={disable} onClick={handleClose}>
            <Link to="/paymentCreate" state={{movie: movie, theaterId: theaterId, showingTime: showing}} style={{
                color: "white",
                textDecoration: "none"
            }}>Purchase Tickets</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

