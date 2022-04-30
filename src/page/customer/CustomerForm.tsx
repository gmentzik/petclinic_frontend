import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { updateCustomerAction, clearAllCustomerFormErrors } from "../../actions/customerActions";
import { Customer, CustomerDTO, emptyCustomerDTO } from "../../api/models";
import { State } from "../../reducers";
import { convertSmallGreekWithAccentToUppercase } from "../../utils/utils";





const CustomerForm = () => {

    const { customerId } = useParams();
    const searchParams = useSearchParams();

    console.log(customerId);
    console.log(searchParams);
    console.log(useLocation());
    const dispatcher = useDispatch();
    const useLocationSearch: string = useLocation().search;
    const selectedCustomer: Customer = useSelector((state: State) => state.customersReducer.selectedCustomer);
    const formerrors: any = useSelector((state: State) => state.customersReducer.formErrors);
    const [newCustomer, setNewCustomer] = useState({ ...emptyCustomerDTO });

    if (useLocationSearch && useLocationSearch.length > 0) {
        console.log("Query string exists: " + useLocationSearch);
        // const queryString = useLocationSearch.substring(2);
        // console.log(queryString);
        const query = new URLSearchParams(useLocationSearch);
        console.log(query.get('sort'));
        console.log(query.get('order'));
        console.log(query.get('myparam'));
    }


    useEffect(() => {
        let customerData: CustomerDTO = { ...emptyCustomerDTO };

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
    }, [])



    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLFormElement;
        setNewCustomer({ ...newCustomer, [target.name]: target.value });
    }


    const modifyValue = (event: ChangeEvent) => {
        const target = event.target as HTMLFormElement;
        switch (target.name) {
            case 'name':
            case 'surname':
            case 'address':
            case 'area':
            case 'pobox':
            case 'country':
                target.value = convertSmallGreekWithAccentToUppercase(target.value);
                break;
        }
        setNewCustomer({ ...newCustomer, [target.name]: target.value });
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(newCustomer);
        dispatcher(clearAllCustomerFormErrors());
        dispatcher(updateCustomerAction(newCustomer));
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

                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="formCustomerName">
                                <Form.Label>
                                    Name
                                </Form.Label>
                                <Col>
                                    <Form.Control size="sm" type="text" name="name" onChange={handleChange} onBlur={modifyValue} defaultValue={newCustomer.name} isInvalid={formerrors?.name} />
                                </Col>
                                {formerrors?.name && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.name}</p>}
                                <Form.Control.Feedback type="invalid">
                                    Please enter your name
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formCustomerSurname">
                                <Form.Label>
                                    Surname
                                </Form.Label>
                                <Col>
                                    <Form.Control size="sm" type="text" name="surname" onChange={handleChange} onBlur={modifyValue} defaultValue={newCustomer.surname} isInvalid={formerrors?.surname} />
                                </Col>
                                {formerrors?.surname && <p className="text-danger small" style={{ marginBottom: 0 }} >{formerrors?.surname}</p>}
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="formCustomerAddress">
                                <Form.Label>
                                    Street address
                                </Form.Label>
                                <Col>
                                    <Form.Control size="sm" type="text" name="address" onChange={handleChange} onBlur={modifyValue} defaultValue={newCustomer.address} isInvalid={formerrors?.address} />
                                </Col>
                                {formerrors?.address && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.address}</p>}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formCustomerArea">
                                <Form.Label>
                                    Area
                                </Form.Label>
                                <Col>
                                    <Form.Control size="sm" type="text" name="area" onChange={handleChange} onBlur={modifyValue} defaultValue={newCustomer.area} isInvalid={formerrors?.area} />
                                </Col>
                                {formerrors?.area && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.area}</p>}
                            </Form.Group>
                        </Row>

                        <Row >
                            <Form.Group as={Col} className="xs-3" controlId="formCustomerPobox">
                                <Form.Label>
                                    POBOX
                                </Form.Label>
                                <Col >
                                    <Form.Control size="sm" type="text" name="pobox" onChange={handleChange} onBlur={modifyValue} defaultValue={newCustomer.pobox} isInvalid={formerrors?.pobox} />
                                </Col>
                                {formerrors?.pobox && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.pobox}</p>}
                            </Form.Group>
                            <Form.Group as={Col} className="xs-3" controlId="formCustomerCountry">
                                <Form.Label >
                                    Country
                                </Form.Label>
                                <Col >
                                    <Form.Control size="sm" type="text" name="country" onChange={handleChange} onBlur={modifyValue} defaultValue={newCustomer.country} isInvalid={formerrors?.country} />
                                </Col>
                                {formerrors?.country && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.country}</p>}
                            </Form.Group>
                            <Form.Group as={Col} xs={6} className="mb-3" controlId="formCustomerEmail">
                                <Form.Label >
                                    Email
                                </Form.Label>
                                <Col>
                                    <Form.Control size="sm" type="text" name="email" onChange={handleChange} defaultValue={newCustomer.email} isInvalid={formerrors?.email} />
                                </Col>
                                {formerrors?.email && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.email}</p>}
                            </Form.Group>
                        </Row>

                        <Row className="mb-2">
                            <Form.Group as={Col} controlId="formCustomerPhone">
                                <Form.Label >
                                    Landline Phone
                                </Form.Label>
                                <Col >
                                    <Form.Control size="sm" type="text" name="phone" onChange={handleChange} defaultValue={newCustomer.phone} isInvalid={formerrors?.phone} />
                                </Col>
                                {formerrors?.phone && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.phone}</p>}
                            </Form.Group>
                            <Form.Group as={Col} controlId="formCustomerMobile">
                                <Form.Label >
                                    Mobile Phone
                                </Form.Label>
                                <Col >
                                    <Form.Control size="sm" type="text" name="mobilephone" onChange={handleChange} defaultValue={newCustomer.mobilephone} isInvalid={formerrors?.mobilephone} />
                                </Col>
                                {formerrors?.mobilephone && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.mobilephone}</p>}
                            </Form.Group>
                        </Row>

                        <Form.Group as={Row} className="mb-3" controlId="formCustomerNote1">
                            <Form.Label >
                                Note1
                            </Form.Label>
                            <Col >
                                <Form.Control size="sm" as="textarea" rows={3} name="note1" onChange={handleChange} defaultValue={newCustomer.note1} isInvalid={formerrors?.note1} />
                            </Col>
                            {formerrors?.note1 && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.note1}</p>}
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerNote2">
                            <Form.Label >
                                Note2
                            </Form.Label>
                            <Col >
                                <Form.Control size="sm" as="textarea" rows={3} name="note2" onChange={handleChange} defaultValue={newCustomer.note2} isInvalid={formerrors?.note2} />
                            </Col>
                            {formerrors?.note2 && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.note2}</p>}
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formCustomerNote3">
                            <Form.Label >
                                Note3
                            </Form.Label>
                            <Col >
                                <Form.Control size="sm" as="textarea" rows={3} name="note3" onChange={handleChange} defaultValue={newCustomer.note3} isInvalid={formerrors?.note3} />
                            </Col>
                            {formerrors?.note3 && <p className="text-danger small" style={{ marginBottom: 0 }}>{formerrors?.note3}</p>}
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



