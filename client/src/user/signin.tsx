import * as React from 'react';
import { Card, Form, FormControl, Button } from 'react-bootstrap';

export const Signin = () => {
  return (
    <Card className="mx-auto mt-5" style={{ width: '50rem' }}>
        <Form>
            <Form.Group className="m-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="username" placeholder="Enter user name" />
            </Form.Group>

            <Form.Group className="m-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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
