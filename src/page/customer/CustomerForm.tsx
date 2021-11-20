import React from "react"
import { Row } from "react-bootstrap"
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
        // console.log( query.get('myParam') );
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
        </>
    );
}

export default CustomerForm;