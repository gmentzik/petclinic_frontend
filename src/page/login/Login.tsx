import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { authenticateUserRequest } from '../../api/userApi';

// type HTMLElementEvent<T extends HTMLElement> = Event & {
//     target: T,
// }

const Login = () => {

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLFormElement;
        let fieldName: string = target.name;
        let fieldVal: string = target.value;
        if (fieldName === 'username' ) setUserName(fieldVal);
        if (fieldName === 'password' ) setUserPassword(fieldVal);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(userName);
        console.log(userPassword);
        authenticateUserRequest(userName, userPassword);
    }

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username" onChange={handleChange} defaultValue={userName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} defaultValue={userPassword} />
            </Form.Group>
            <Button variant="primary" type="submit" >
                Login
            </Button>
        </Form>
    );


}


export default Login;