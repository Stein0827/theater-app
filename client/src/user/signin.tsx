import axios from 'axios';
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


export const Signin = (updateTheaterId: {updateTheaterId: (theaterId: string) => void}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let validLogin = false;
  let theaterId = "";

  let navigate = useNavigate();
  const routeChange = (path: string) =>{ 
    navigate(path);
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try{
      const res = await axios.post('http://localhost:4007/api/login', {"username": username, "password": password});
      theaterId = res.data;
      validLogin = true;
    } catch(err: any) {
      alert(err.response.data);
    }

    updateTheaterId.updateTheaterId(theaterId as string);

    setUsername('');
    setPassword('');

    if (validLogin) {
      routeChange("/admin");
    }
  }

  const handleSignup = async (event: React.FormEvent) => {
    routeChange("/signup");
  }

  return (
    <Card className="mx-auto mt-5" style={{ width: '50rem' }}>
        <Form>
            <Form.Group className="m-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={username} placeholder="Enter user name" onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group className="m-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            
            <div style={{display: "flex", justifyContent: "center"}}>
                    <Button className="m-3" size="lg" variant="primary" type="submit" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button className="m-3" size="lg" variant="secondary" type="submit" onClick={handleSignup}>
                        Signup
                    </Button>
                </div>
        </Form>
    </Card>
  );
}
