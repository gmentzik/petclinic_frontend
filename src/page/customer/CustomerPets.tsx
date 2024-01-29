import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Accordion, Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { updateCustomerAction, clearAllCustomerFormErrors, fetchCustomerByIdAction, clearSelectedCustomerAction } from "../../actions/customerActions";
import { Customer, CustomerDTO, emptyCustomerDTO } from "../../api/models";
import { State } from "../../reducers";
import { convertSmallGreekWithAccentToUppercase } from "../../utils/utils";





const CustomerPets = () => {

    const dispatcher = useDispatch();
    const { customerId } = useParams();
    const searchParams = useSearchParams();
    const useLocationSearch: string = useLocation().search;
    const selectedCustomer: Customer = useSelector((state: State) => state.customersReducer.selectedCustomer);
    const formerrors: any = useSelector((state: State) => state.customersReducer.formErrors);
    const [newCustomer, setNewCustomer] = useState({ ...emptyCustomerDTO });

    // console.log("CustomerForm");
    // console.log(customerId);
    // console.log(searchParams);
    // console.log(useLocation());
    // if (useLocationSearch && useLocationSearch.length > 0) {
    //     console.log("Query string exists: " + useLocationSearch);
    //     // const queryString = useLocationSearch.substring(2);
    //     // console.log(queryString);
    //     const query = new URLSearchParams(useLocationSearch);
    //     console.log(query.get('sort'));
    //     console.log(query.get('order'));
    //     console.log(query.get('myparam'));
    // }


    useEffect(() => {
        console.log("CustomerForm useEffect []")
        let customerData: CustomerDTO = { ...emptyCustomerDTO };
        setNewCustomer(customerData);
        
        console.log("CustomeriD: " + customerId);
        if (customerId) {

            dispatcher(fetchCustomerByIdAction(parseInt(customerId)));
            // customerData = {
            //     ...customerData,
            //     id: selectedCustomer.id
            // };
        } else {
            dispatcher(clearSelectedCustomerAction());
        }
        // customerData = {
        //     ...customerData,
        //     name: selectedCustomer.name,
        //     surname: selectedCustomer.surname,
        //     address: selectedCustomer.address,
        //     area: selectedCustomer.area,
        //     pobox: selectedCustomer.pobox,
        //     country: selectedCustomer.country,
        //     email: selectedCustomer.email,
        //     phone: selectedCustomer.phone,
        //     mobilephone: selectedCustomer.mobilephone,
        //     note1: selectedCustomer.note1,
        //     note2: selectedCustomer.note2,
        //     note3: selectedCustomer.note3,
        // }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log("CustomerForm useEffect [selectedCustomer]")
        let customerData: CustomerDTO = { ...emptyCustomerDTO };
               customerData = {
            ...customerData,
            id: selectedCustomer.id,
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

    },[selectedCustomer])


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
                    {selectedCustomer.id < 0 ? <h1>CUSTOMER INFO</h1> : <h1>CUSTOMER INFO</h1>}
                </div>
            </Row>
            <Row className="justify-content-md-center">
                <Col md={1} className='d-md-block d-sm-none'></Col>

                <Col xs md={5} className='border border-dark'><b>ΟΝΟΜΑ:</b> { newCustomer.name }</Col>
                <Col xs md={5} className='border border-dark'><b>ΕΠΩΝΥΜΟ:</b> { newCustomer.surname }</Col>

                <Col md={1} className='d-md-block d-sm-none'></Col>

            </Row>
            <Row className="justify-content-md-center">
                <Col md={1} className='d-md-block d-sm-none'></Col>

                <Col xs md={5} className='border border-dark'><b>ΣΤΑΘΕΡΟ:</b> { newCustomer.phone }</Col>
                <Col xs md={5} className='border border-dark'><b>ΚΙΝΗΤΟ:</b> { newCustomer.mobilephone }</Col>

                <Col md={1} className='d-md-block d-sm-none'></Col>

            </Row>
            <Row className="justify-content-md-center">
                <Col md={1} className='d-md-block d-sm-none'></Col>

                <Col xs md={10} className='border border-dark'><b>EMAIL:</b> { newCustomer.email }</Col>                          
                  
                <Col md={1} className='d-md-block d-sm-none'></Col>

            </Row>
            <Row className="justify-content-md-center">
                <Col md={1} className='d-md-block d-sm-none'></Col>
                <Col xs md={10} className='border border-dark'>
                <Accordion>
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>ΠΕΡΙΣΟΤΕΡΕΣ ΠΛΗΡΟΦΟΡΙΕΣ ΠΕΛΑΤΗ</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col xs md={6} className='border border-dark'><b>ΔΙΕΥΘΥΝΣΗ:</b> { newCustomer.address }</Col>
                            <Col xs md={6} className='border border-dark'><b>ΠΕΡΙΟΧΗ:</b> { newCustomer.area }</Col>
                        </Row>
                        <Row>
                            <Col xs md={6} className='border border-dark'><b>ΤΚ:</b> { newCustomer.pobox }</Col>
                            <Col xs md={6} className='border border-dark'><b>ΧΩΡΑ:</b> { newCustomer.country }</Col>
                        </Row>
                        <Row>
                            <b>Note 1:</b>
                            <Col xs md={12} className='border border-dark small'>{newCustomer.note1 }</Col>
                        </Row>
                        <Row>
                            <b>Note 2:</b>
                            <Col xs md={12} className='border border-dark small'>{newCustomer.note2 }</Col>
                        </Row>
                        <Row>
                            <b>Note 3:</b>
                            <Col xs md={12} className='border border-dark small'>{newCustomer.note3 }</Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </Col>
                <Col md={1} className='d-md-block d-sm-none'></Col>
            </Row>
        </>
    );
}

export default CustomerPets;



