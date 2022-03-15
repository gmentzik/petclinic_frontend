import React, { ChangeEvent, FormEvent, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useParams, useSearchParams, useLocation } from "react-router-dom";

const CustomerForm = () => {

    const { customerId } = useParams();
    const searchParams = useSearchParams();

    console.log(customerId);
    console.log(searchParams);
    console.log(useLocation());
    const useLocationSearch: string = useLocation().search;

    if (useLocationSearch && useLocationSearch.length > 0) {
        console.log("Query string exists: " + useLocationSearch);
        // const queryString = useLocationSearch.substring(2);
        // console.log(queryString);
        const query = new URLSearchParams(useLocationSearch);
        console.log(query.get('sort'));
        console.log(query.get('order'));
        console.log(query.get('myparam'));
    }

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');

    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLFormElement;
        let fieldName: string = target.name;
        let fieldVal: string = target.value;
        if (fieldName === 'name') setName(fieldVal);
        if (fieldName === 'surname') setSurname(fieldVal);
        if (fieldName === 'address') setAddress(fieldVal);
        if (fieldName === 'area') setArea(fieldVal);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(name);
        console.log(surname);
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

                <Row>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerName">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="name" onChange={handleChange} defaultValue={name} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerSurname">
                            <Form.Label column sm="2">
                                Surname
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="surname" onChange={handleChange} defaultValue={surname} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerSurname">
                            <Form.Label column sm="2">
                                Street address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="address" onChange={handleChange} defaultValue={address} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerSurname">
                            <Form.Label column sm="2">
                                Area
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="area" onChange={handleChange} defaultValue={area} />
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={8} className="d-flex justify-content-end" >
                        <Button variant="primary" type="submit" >
                            Add Customer
                        </Button>

                    </Col>
                    <Col xs={2}></Col>
                </Row>
            </Form>
        </>
    );
}

export default CustomerForm;



// export interface Customer {
//     id: number;
//     name: string;
//     surname: string;
//     address: string;
//     area: string;
//     pobox: string;
//     country: string;
//     email: string;
//     phone: string;
//     mobilephone: string;
//     note1: string;
//     note2: string;
//     note3: string;
//     created: string;
//     updated: string;
// }