import React from "react"
import { Row } from "react-bootstrap"
import { useParams } from "react-router-dom";

const CustomerForm = () => {

    const { customerId } = useParams();

    console.log(customerId);

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
    </>
    );
}

export default CustomerForm;