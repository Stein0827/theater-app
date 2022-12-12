import React, { useEffect, useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import { MovieRequest } from "./types.js"
import { OperationsList } from "./OperationsList"


export const OperationsModal = ({movie, theaterId}: {movie: MovieRequest, theaterId: string}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Showtimes
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.name}</Modal.Title>
        </Modal.Header >
        <Modal.Body>
            <iframe width="100%" height="370px" style={{marginBottom:"15px"}} src={movie.trailer + "?autoplay=1&mute=1"}> </iframe>
            <h6 className="mb-2 text-muted">{movie.desc}</h6>
            <OperationsList movieId={movie.movie_id as number} theaterId={theaterId}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Purchase Tickets
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

