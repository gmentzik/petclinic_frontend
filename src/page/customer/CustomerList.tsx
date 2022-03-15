import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomerTableRow } from ".";
import { fetchCustomerListAction } from "../../actions/customerActions";
import { CustomersList, Customer } from "../../api/models";
import PageIndex from "../../components/pageIndex";
import { State } from "../../reducers";

const CustomerList = () => {

  const [nextPage, setNextPage] = useState(0);
  const [displayPerPage, setDisplayPerPage] = useState(5);
  const customerList: CustomersList = useSelector((state: State) => state.customersReducer.customersList);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatcher(fetchCustomerListAction(nextPage, displayPerPage));
  }, [nextPage, dispatcher, navigate, displayPerPage]);

  const activePage = (page: number): number => {
    return page + 1;
  }

  const selectPage = (page: number) => {
    setNextPage(page - 1);
  }

  const createCustomerRows = (): any => {
    console.log("createCustomerRows");
    return (
      customerList.customers.map((customer: Customer) =>
        <CustomerTableRow key={customer.id} customer={customer} />
      ))
  };

  const onChangeColor = (e: any) => {
    const customersPerPageValue: number = e.target.value;
    console.log(customersPerPageValue);
    setDisplayPerPage(customersPerPageValue);
  }

  return (
    <>
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
              <th style={{ width: '200px' }}>ΔΙΕΥΘΥΝΣΗ</th>
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
      </Row>
      <Row>
        <Col xs={9}>
          <span className="d-flex justify-content-start">
            <Button variant="primary" onClick={() => navigate("form")}>ΝΕΟΣ ΠΕΛΑΤΗΣ</Button>
          </span>
        </Col>

        <Col>
          <span className="d-flex justify-content-end">
            Customers per page:
          </span>
        </Col>
        <Col xs={1}>
          <span className="d-flex justify-content-end">
            <Form.Select size="sm" onChange={onChangeColor}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Form.Select>
          </span>
        </Col>


      </Row>
      <Row>
        <PageIndex active={activePage(customerList.currentPage)} total={customerList.totalPages}
          goToPage={(page: number) => selectPage(page)}
        />
      </Row>


    </>
  );
};

export default CustomerList;

