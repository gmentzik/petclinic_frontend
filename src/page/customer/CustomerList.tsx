import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomerTableRow } from ".";
import { sendGetAllCustomers, sendGetHelloRequest } from '../../api/customersApi'
import { CustomersList, Customer } from "../../api/models";
import PageIndex from "../../components/pageIndex";

const CustomerList = () => {

  const [selectedPage, setSelectedPage] = useState(0);
  // eslint-disable-next-line
  const [totalPages, setTotalPages] = useState(1);

  const [customers, setCustomers] = useState<Customer[]>([]);

  let navigate = useNavigate();

  const responseHanderMethod = (data: any) => {
    console.log(`responseHanderMethod: ${data}`);
  }

  const customerList = (data: CustomersList) => {
    console.log(`customerList: ${data}`);
    setCustomers(data.customers);
    setSelectedPage(data.currentPage);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    console.log("Effect has been called at load");
    sendGetHelloRequest(responseHanderMethod);
    sendGetAllCustomers(customerList); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("Effect has been called at page change");
    sendGetAllCustomers(customerList, selectedPage); // eslint-disable-next-line
  }, [selectedPage]);

  const activePage = (page: number):number => {
    return page + 1;
  }

  const selectPage = (page:number) => {
    setSelectedPage(page - 1);
  }

  const createCustomerRows = (): any => {
    console.log("createCustomerRows");
    return (
      customers.map((customer: Customer) =>
        <CustomerTableRow key={customer.id} customer={customer} />
      ))
  };


  return (
    <>
      {console.log(customers)}
      <Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>ΑΝΑΖΗΤΗΣΗ ΠΕΛΑΤΗ</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Control type="text" placeholder="ΟΝΟΜΑ" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridSurname">
                    <Form.Control type="text" placeholder="ΕΠΩΝΥΜΟ" />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button variant="primary" type="submit">
                      ΑΝΑΖΗΤΗΣΗ
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Row className="mb-3">
        <Table striped bordered responsive="xl" style={{display: "block", overflowX: "scroll"}}>
          <thead>
            <tr>
              <th>#</th>
              <th>ΕΠΩΝΥΜΟ</th>
              <th>ΟΝΟΜΑ</th>
              <th style={{width: '200px'}}>ΔΙΕΥΘΥΝΣΗ</th>
              <th>ΠΕΡΙΟΧΗ</th>
              <th>ΤΚ</th>
              <th>ΧΩΡΑ</th>
              <th>EMAIL</th>
              <th>ΣΤΑΘΕΡΟ</th>
              <th>ΚΙΝΗΤΟ</th>
              <th style={{minWidth: '120px'}}>NOTES 1</th>
              <th style={{minWidth: '120px'}}>NOTES 2</th>
              <th style={{minWidth: '120px'}}>NOTES 3</th>
              <th>ΕΝΕΡΓΕΙΕΣ</th>
            </tr>
          </thead>
          <tbody>
            {createCustomerRows()}
          </tbody>
        </Table>
        <div className="d-flex justify-content-start">
          <Button variant="primary" onClick={() => navigate("form")}>ΝΕΟΣ ΠΕΛΑΤΗΣ</Button>
        </div>
        <PageIndex active={activePage(selectedPage)} total={totalPages}
          goToPage={(page: number) => selectPage(page)}
        />
      </Row>

    </>
  );
};

export default CustomerList;

