import React from "react";
import { Button } from "react-bootstrap";
import { Customer } from "../../api/models/Customer";

interface Props {
    customer: Customer;
}

const CustomerTableRow = (props: Props) => {
    
    const { customer } = props;

    return (
            <tr key={customer.id} >
                <td>{customer.id}</td>
                <td>{customer.surname}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.mobilephone}</td>
                <td>email@mail.com(pending)</td>
                <td>area (pending)</td>
                <td><Button variant="info">Info</Button></td>
            </tr>
    );
}

export default CustomerTableRow;