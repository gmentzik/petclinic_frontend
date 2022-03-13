import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomerTableRow } from ".";
import { fetchCustomerListAction } from "../../actions/customerActions";
import { sendGetAllCustomers, sendGetHelloRequest } from '../../api/customersApi'
import { CustomersList, Customer } from "../../api/models";
import PageIndex from "../../components/pageIndex";

const CustomerList = () => {

  const [selectedPage, setSelectedPage] = useState(0);
  // eslint-disable-next-line
  const [totalPages, setTotalPages] = useState(1);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const dispatcher = useDispatch();

  const navigate = useNavigate();

  // const responseHanderMethod = (data: any) => {
  //   console.log(`responseHanderMethod: ${data}`);
  // }

  const customerList = (data: CustomersList) => {
    console.log(`customerList: ${data}`);
    setCustomers(data.customers);
    setSelectedPage(data.currentPage);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    // console.log("Effect has been called at load");
    // sendGetHelloRequest(responseHanderMethod);
    // sendGetAllCustomers(customerList);
    dispatcher(fetchCustomerListAction(customerList));
  }, []);

  useEffect(() => {
    // console.log("Effect has been called at page change");
    sendGetAllCustomers(customerList, selectedPage);
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
        <Table id="customersTableId" striped bordered responsive="xl" className="scrollableTable">
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
              <th className="notesHeaderCell">NOTES 1</th>
              <th className="notesHeaderCell">NOTES 2</th>
              <th className="notesHeaderCell">NOTES 3</th>
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

