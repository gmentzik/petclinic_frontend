import React from "react";
import { Link } from "react-router-dom";
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
                <td>{customer.address}</td>
                <td>{customer.area}</td>
                <td>{customer.pobox}</td>
                <td>{customer.country}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.mobilephone}</td>
                <td>{customer.note1}</td>
                <td>{customer.note2}</td>
                <td>{customer.note3}</td>
                {/* <td> <Button variant="light"><i className="bi bi-pen"></i></Button><Button variant="light"><i className="bi bi-clipboard-pulse"></i></Button></td> */}
                <td><Link to={""}><i className="bi bi-pen"></i></Link ><Link to={""}><i className="bi bi-clipboard-pulse"></i></Link ></td>
            </tr>
    );
}

export default CustomerTableRow;