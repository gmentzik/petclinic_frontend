import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Customer } from "../../api/models/Customer";

interface Props {
    customer: Customer;
}

const CustomerTableRow = (props: Props) => {

    const { customer } = props;

    return (
        <tr>
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
            <td>
                <OverlayTrigger
                    key={`tooltip-${customer.id}-edit-customer`}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-${customer.id}-edit-customer`}>
                            Edit Customer
                        </Tooltip>
                    }
                >
                    <Link key={customer.id} to={"form/" + customer.id} ><i className="bi bi-pen"></i></Link >
                </OverlayTrigger>
                <OverlayTrigger
                    key={`tooltip-${customer.id}-view-animals`}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-${customer.id}-view-animals`}>
                            View animals
                        </Tooltip>
                    }
                >
                    <Link style={{paddingLeft: '4px'}} key={customer.id} to={""}><i className="bi bi-clipboard-pulse"></i></Link >
                </OverlayTrigger>

            </td>
        </tr>
    );
}

export default CustomerTableRow;