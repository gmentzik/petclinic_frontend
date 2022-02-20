import React from "react";
import { Link } from "react-router-dom";
import { Customer } from "../../api/models/Customer";
import CustomBSTooltipTop from "../../components/customBSTooltipTop";

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
                <CustomBSTooltipTop tooltipText={"Διόρθωση Στοιχείων"} uniqueIdAndDescriptionText={`${customer.id}-edit-customer`} >
                    <Link className="paddingLeft4px" key={customer.id} to={"form/" + customer.id} ><i className="bi bi-pen"></i></Link >
                </CustomBSTooltipTop>
                <CustomBSTooltipTop tooltipText={"Λίστα κατοικιδίων"} uniqueIdAndDescriptionText={`${customer.id}-view-animals`} >
                    <Link className="paddingLeft4px" key={customer.id} to={""}><i className="bi bi-clipboard-pulse"></i></Link >
                </CustomBSTooltipTop>
            </td>
        </tr>
    );
}

export default CustomerTableRow;