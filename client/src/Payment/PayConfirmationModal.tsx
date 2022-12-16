// Alan Castillo (#59078415)

import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate} from "react-router-dom";
import axios from 'axios';

export const PayConfirmationModal = ({movie, theaterId, showingTime, concessionCosts, tickets}: any) => {
  let navigate = useNavigate();
  const routeChange = () =>{ 
      let path = `/`;
      navigate(path);
  }

  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);
  const [responseStatus, setResponseStatus] = useState(200);  

  const handleClose = () => {
    if (responseStatus===400) {
      setShow(false);
    }
    else {
      routeChange();
    }
  }

  const handlePayment = async () => {
    const paymentRequest = {
      movie_id: movie.movie_id,
      theater_id: theaterId,
      date: new Date().toISOString().slice(0,10),
      showing: showingTime,
      concessions: Number(concessionCosts),
      tickets: (Number(tickets) * 19),
      fname: (document.getElementById("inputFName") as HTMLInputElement).value,
      lname: (document.getElementById("inputLName")as HTMLInputElement).value,
      cardnum: (document.getElementById("inputCard")as HTMLInputElement).value,
      seccode: (document.getElementById("inputSec")as HTMLInputElement).value,
      cardexp: (document.getElementById("inputExp")as HTMLInputElement).value,
      email: (document.getElementById("inputEmail")as HTMLInputElement).value,
      bstreet: (document.getElementById("inputAddress")as HTMLInputElement).value,
      bunit: (document.getElementById("inputAddress2")as HTMLInputElement).value,
      bstate: (document.getElementById("inputState")as HTMLInputElement).value,
      bcountry: "USA",
      zip: (document.getElementById("inputZip")as HTMLInputElement).value
    };

    try {      
      await axios.post('http://localhost:4005/api/v1/payment', paymentRequest)
      setResponseStatus(200)
      setShow(true)
    } catch (err:any) {
      setResponseStatus(400)
      console.log(err)
      setErrors(err.response.data.list)
      setShow(true)
    }
  };

  let modalStyle = {
    backgroundColor: (responseStatus===200 ? "#81c784" : "#e57373"),
    color: (responseStatus===200 ? "#388e3c" : "#d32f2f")
  }

  const errorMap = {
    email: "Email Address",
    fname: "First Name",
    lname: "Last Name",
    cardnum: "Card Number",
    seccode: "Security Number",
    cardexp: "Card Expiration",
    bstreet: "Address 1",
    bunit: "Address 2 - Apt Number",
    bstate: "State",
    zip: "Zip code"
  }
  
  const renderedErrors = errors.map((error) => {
    return (<li key={error}>{errorMap[error]}</li>)
  });

  return (
    <>
      <Button className="btn btn-success" onClick={handlePayment} 
      style={{
        width: "150px", margin:"auto", marginTop: "10px", marginBottom: "25px"
      }}>
        Pay
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={modalStyle}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {responseStatus===200 && "Payment Received!"}
            {responseStatus===400 && "Errors in your form"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {responseStatus===200 && "Thank you for shopping with us! A confirmation email has been sent to your personal email."}
          {responseStatus===400 && <p>Your form is failing in these fields: {renderedErrors}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant={"secondary"} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}