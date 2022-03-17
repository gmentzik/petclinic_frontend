import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { Customer, CustomerDTO, emptyCustomerDTO } from "../../api/models";
import { State } from "../../reducers";





const CustomerForm = () => {

    const { customerId } = useParams();
    const searchParams = useSearchParams();

    console.log(customerId);
    console.log(searchParams);
    console.log(useLocation());
    const useLocationSearch: string = useLocation().search;
    const selectedCustomer: Customer = useSelector((state: State) => state.customersReducer.selectedCustomer);
    const [newCustomer, setNewCustomer] = useState({...emptyCustomerDTO});

    if (useLocationSearch && useLocationSearch.length > 0) {
        console.log("Query string exists: " + useLocationSearch);
        // const queryString = useLocationSearch.substring(2);
        // console.log(queryString);
        const query = new URLSearchParams(useLocationSearch);
        console.log(query.get('sort'));
        console.log(query.get('order'));
        console.log(query.get('myparam'));
    }

    
    useEffect(()=>{
        let customerData: CustomerDTO = {...emptyCustomerDTO};

        if (selectedCustomer.id >= 0) {
            customerData = {
                ...customerData,
                id: selectedCustomer.id
            };

        }
        customerData = {
            ...customerData,
            name: selectedCustomer.name,
            surname: selectedCustomer.surname,
            address: selectedCustomer.address,
            area: selectedCustomer.area,
            pobox: selectedCustomer.pobox,
            country: selectedCustomer.country,
            email: selectedCustomer.email,
            phone: selectedCustomer.phone,
            mobilephone: selectedCustomer.mobilephone,
            note1: selectedCustomer.note1,
            note2: selectedCustomer.note2,
            note3: selectedCustomer.note3,
        }
        setNewCustomer(customerData);
        // eslint-disable-next-line
    },[])



    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLFormElement;
        setNewCustomer({ ...newCustomer, [target.name]: target.value });
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(newCustomer);
        // dispatcher(loginAction(userName, userPassword));
    }

    return (
        <>
            <Row>
                <div className="d-flex justify-content-center">
                    {selectedCustomer.id < 0 ? <h1>NEW CUSTOMER</h1> : <h1>EDIT CUSTOMER</h1>}
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
                                <Form.Control type="text" name="name" onChange={handleChange} defaultValue={newCustomer.name} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerSurname">
                            <Form.Label column sm="2">
                                Surname
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="surname" onChange={handleChange} defaultValue={newCustomer.surname} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerAddress">
                            <Form.Label column sm="2">
                                Street address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="address" onChange={handleChange} defaultValue={newCustomer.address} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerArea">
                            <Form.Label column sm="2">
                                Area
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="area" onChange={handleChange} defaultValue={newCustomer.area} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerPobox">
                            <Form.Label column sm="2">
                                POBOX
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="pobox" onChange={handleChange} defaultValue={newCustomer.pobox} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerCountry">
                            <Form.Label column sm="2">
                                Country
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="country" onChange={handleChange} defaultValue={newCustomer.country} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="email" onChange={handleChange} defaultValue={newCustomer.email} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerPhone">
                            <Form.Label column sm="2">
                                Landline Phone
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="phone" onChange={handleChange} defaultValue={newCustomer.phone} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerMobile">
                            <Form.Label column sm="2">
                                Mobile Phone
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" name="mobilephone" onChange={handleChange} defaultValue={newCustomer.mobilephone} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerNote1">
                            <Form.Label column sm="2">
                                Note1
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control  as="textarea" rows={3} name="note1" onChange={handleChange} defaultValue={newCustomer.note1} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerNote2">
                            <Form.Label column sm="2">
                                Note2
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control  as="textarea" rows={3} name="note2" onChange={handleChange} defaultValue={newCustomer.note2} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerNote3">
                            <Form.Label column sm="2">
                                Note3
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control  as="textarea" rows={3} name="note3" onChange={handleChange} defaultValue={newCustomer.note3} />
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



