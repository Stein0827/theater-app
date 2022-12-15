import axios from 'axios';
import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [description, setDescription] = useState('');
    const [theaterImage, setTheaterImage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    let validSignup = false;

    let navigate = useNavigate();
    const routeChange = (path: string) => { 
        navigate(path);
    }
    
    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (password === confirmedPassword) {
            try {
                const data = {
                    name,
                    address,
                    zip,
                    description,
                    theaterImage,
                    username,
                    password
                }

                let res = await axios.post('http://127.0.0.1:4007/api/register', data);
                validSignup = res.data.acknowledged;

              } catch(err: any) {
                alert(err.response.data);
              }
        } else {
            alert("Passwords do not match");
        }

        setName('');
        setAddress('');
        setZip('');
        setDescription('');
        setTheaterImage('');
        setUsername('');
        setPassword('');
        setConfirmedPassword('');

        if (validSignup) {
            routeChange("/admin");
        }
    }

    return (
        <Card className="mx-auto mt-5" style={{ width: '50rem' }}>
            <Form>
                <Form.Group className="m-3" controlId="formTheaterName">
                <Form.Label>Theater Name</Form.Label>
                <Form.Control type="text" value={name} placeholder="Theater name" onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
    
                <Form.Group className="m-3" controlId="formAddress">
                    <Form.Label>Theater Address</Form.Label>
                    <Form.Control type="text" value={address} placeholder="Theater address" onChange={(e) => setAddress(e.target.value)}/>
                </Form.Group>

                <Form.Group className="m-3" controlId="formZip">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="text" value={zip} placeholder="Enter zipcode of theater" onChange={(e) => setZip(e.target.value)}/>
                </Form.Group>

                <Form.Group className="m-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description} placeholder="Description of theater" onChange={(e) => setDescription(e.target.value)}/>
                </Form.Group>

                <Form.Group className="m-3" controlId="formTheaterImage">
                    <Form.Label>Theater Image</Form.Label>
                    <Form.Control type="text" value={theaterImage} placeholder="Image url of theater" onChange={(e) => setTheaterImage(e.target.value)}/>
                </Form.Group>

                <Form.Group className="m-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value={username} placeholder="Enter user name" onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group className="m-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group className="m-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={confirmedPassword} placeholder="Password" onChange={(e) => setConfirmedPassword(e.target.value)}/>
                </Form.Group>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button className="m-3" size="lg" variant="primary" type="submit" onClick={handleSignup}>
                        Sign up
                    </Button>
                </div>
                
            </Form>
        </Card>
      );
}
