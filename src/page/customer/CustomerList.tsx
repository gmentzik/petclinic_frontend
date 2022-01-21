import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Row, Table } from "react-bootstrap";
import { sendGetHelloRequest } from '../../api/customersApi'
import PageIndex from "../../components/pageIndex";

const CustomerList = () => {

  const [selectedPage, setSelectedPage] = useState(5);
  // eslint-disable-next-line
  const [totalPages, setTotalPages] = useState(10);


  const responseHanderMethod = (data: any) => {
     console.log(`responseHanderMethod: ${data}`);
  }

  useEffect(() => {
    console.log("Effect has been called");
    sendGetHelloRequest(responseHanderMethod);
  }, []);



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
      <Row>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>ΕΠΩΝΥΜΟ</th>
              <th>ΟΝΟΜΑ</th>
              <th>ΤΗΛΕΦΩΝΟ</th>
              <th>ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ</th>
              <th>EMAIL</th>
              <th>ΠΕΡΙΟΧΗ</th>
              <th>ΕΝΕΡΓΕΙΕΣ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>ΜΕΝΤΖΙΚΩΦ</td>
              <td>ΓΙΩΡΓΟΣ</td>
              <td>2111234567</td>
              <td>6974123456</td>
              <td>email@mail.com</td>
              <td>ΚΑΙΣΑΡΙΑΝΗ/ΑΤΤΙΚΗ</td>
              <td><Button variant="info">Info</Button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td><Button variant="info">Info</Button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td><Button variant="info">Info</Button></td>
            </tr>
            <tr>
              <td>4</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td><Button variant="info">Info</Button></td>
            </tr>
            <tr>
              <td>5</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td><Button variant="info">Info</Button></td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex justify-content-start">
          <Button variant="primary">ΝΕΟΣ ΠΕΛΑΤΗΣ</Button>
        </div>
        <PageIndex active={selectedPage} total={totalPages}
          goToPage={(page: number) => setSelectedPage(page)}
        />
      </Row>

    </>
  );
};

export default CustomerList;

