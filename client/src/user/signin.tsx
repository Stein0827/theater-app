import axios from 'axios';
import React, { useState } from 'react';
import { Card, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


export const Signin = (updateTheaterId: {updateTheaterId: (theaterId: string) => void}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let validLogin = false;
  let theaterId = "";

  let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = "/theaterInfo";
        navigate(path);
    }

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try{
      const res = await axios.post('http://localhost:4007/api/login', {"username": username, "password": password});
      theaterId = res.data;
      validLogin = true;
    } catch(err: any) {
      alert(err.response.data);
    }

    console.log(theaterId);
    updateTheaterId.updateTheaterId(theaterId as string);

    setUsername('');
    setPassword('');

    if (validLogin) {
      console.log(theaterId);
      //routeChange();
    }
  }

  return (
    <Card className="mx-auto mt-5" style={{ width: '50rem' }}>
        <Form onSubmit={submitHandler}>
            <Form.Group className="m-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={username} placeholder="Enter user name" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group className="m-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button className="m-3" variant="primary" type="submit">
            Login
            </Button>
            <Button className="m-3" variant="secondary" type="submit">
              Signup
            </Button>
        </Form>
    </Card>
  );
}
