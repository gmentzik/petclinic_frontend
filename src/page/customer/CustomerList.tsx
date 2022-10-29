import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomerTableRow } from ".";
import { fetchCustomerListAction } from "../../actions/customerActions";
import { CustomersList, Customer, CustomersListQueryFilter } from "../../api/models";
import PageIndex from "../../components/pageIndex";
import { State } from "../../reducers";

const CustomerList = () => {

  const [nextPage, setNextPage] = useState(0);
  const [displayPerPage, setDisplayPerPage] = useState(5);
  const customerList: CustomersList = useSelector((state: State) => state.customersReducer.customersList);
  const emptyCustomerSearchParams:CustomersListQueryFilter = {};
  const [customerSearchParams, setCustomerSearchParams] = useState(emptyCustomerSearchParams);
  const [customerSearchParamsToSend, setCustomerSearchParamsToSend] = useState(emptyCustomerSearchParams);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatcher(fetchCustomerListAction(nextPage, displayPerPage, customerSearchParamsToSend));
  }, [nextPage, dispatcher, navigate, displayPerPage, customerSearchParamsToSend]);

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

  const onChangeDisplayPerPage = (e: any) => {
    const customersPerPageValue: number = e.target.value;
    console.log(customersPerPageValue);
    setDisplayPerPage(customersPerPageValue);
  }

  // customerList searchForm methods
  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLFormElement;
    setCustomerSearchParams({ ...customerSearchParams, [target.name]: target.value });
  }

  const handleSearchFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setCustomerSearchParamsToSend({...customerSearchParams});
  }

  const handleSearchFormReset = (event: FormEvent) => {
    setCustomerSearchParams(emptyCustomerSearchParams);
    setCustomerSearchParamsToSend(emptyCustomerSearchParams);
  }

  const getSearchParams = () => {
    console.log("getSearchParams was called");
    let searchParamsString = '';
    if (Object.keys(customerSearchParamsToSend).length !== 0) searchParamsString = '( filter by: ';
    for (const [key, value] of Object.entries(customerSearchParamsToSend)) {
            searchParamsString+=`${key}: ${value}, `;
    }
    if (Object.keys(customerSearchParamsToSend).length !== 0) searchParamsString += ' )';
    return searchParamsString;
  } 

  return (
    <>
      <Row>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>ΑΝΑΖΗΤΗΣΗ ΠΕΛΑΤΗ</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSearchFormSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Control size="sm" name="name" onChange={handleChange} type="text" placeholder="ΟΝΟΜΑ" value={customerSearchParams.name?customerSearchParams.name:''}/>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridSurname">
                    <Form.Control size="sm" name="surname"  onChange={handleChange} type="text" placeholder="ΕΠΩΝΥΜΟ" value={customerSearchParams.surname?customerSearchParams.surname:''}/>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button style={{width:'100px'}} variant="primary" size="sm" type="submit">
                      SEARCH
                    </Button>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} xs={4} controlId="formCustomerPhone">
                    <Form.Control size="sm" type="text" name="phone" onChange={handleChange} placeholder="ΣΤΑΘΕΡΟ TΗΛΕΦΩΝΟ" value={customerSearchParams.phone?customerSearchParams.phone:''}/>
                  </Form.Group>
                  <Form.Group as={Col} xs={4} controlId="formCustomerMobile">
                    <Form.Control size="sm" type="text" name="mobilephone" onChange={handleChange} placeholder="ΚΙΝΗΤΟ TΗΛΕΦΩΝΟ" value={customerSearchParams.mobile?customerSearchParams.mobile:''}/>
                  </Form.Group>
                  <Form.Group as={Col} xs={4}>
                    <Button style={{width:'100px'}} variant="secondary" size="sm" onClick={handleSearchFormReset}>
                      RESET
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Row>
      <Col>
        <small className="d-flex justify-content-start tableSearchParams">Total search results: {customerList.totalItems} {getSearchParams()}</small>
      </Col>
      </Row>
      <Row className="mb-3">
        <Table id="customersTableId" striped bordered responsive="xl" className="scrollableTable">
          <thead>
            <tr>
              <th>ΕΝΕΡΓΕΙΕΣ</th>
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
            <Form.Select size="sm" onChange={onChangeDisplayPerPage}>
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

