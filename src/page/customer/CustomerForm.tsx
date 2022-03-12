import React, { ChangeEvent, FormEvent, useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { useParams, useSearchParams, useLocation } from "react-router-dom";

const CustomerForm = () => {

    const { customerId } = useParams();
    const searchParams = useSearchParams();

    console.log(customerId);
    console.log(searchParams);
    console.log(useLocation());
    const useLocationSearch:string = useLocation().search;

    if (useLocationSearch && useLocationSearch.length > 0) {
        console.log("Query string exists: " + useLocationSearch);
        // const queryString = useLocationSearch.substring(2);
        // console.log(queryString);
        const query = new URLSearchParams(useLocationSearch);
        console.log(query.get('sort'));
        console.log(query.get('order'));
        console.log(query.get('myparam'));
    }

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    

    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLFormElement;
        let fieldName: string = target.name;
        let fieldVal: string = target.value;
        if (fieldName === 'username') setUserName(fieldVal);
        if (fieldName === 'password') setUserPassword(fieldVal);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(userName);
        console.log(userPassword);
        // dispatcher(loginAction(userName, userPassword));
    }

    return (
        <>
            <Row>
                <div className="d-flex justify-content-center">
                    {!customerId ? <h1>CREATE NEW CUSTOMER</h1> : <h1>VIEW/EDIT CUSTOMER</h1>}
                </div>
            </Row>
            <Row>
                <div className="d-flex justify-content-center">
                    {!customerId ? <h1>NEW CUSTOMER</h1> : <h1>CUSTOMER ID: {customerId} </h1>}
                </div>
            </Row>
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
                    Add Customer
                </Button>
            </Form>
        </>
    );
}

export default CustomerForm;