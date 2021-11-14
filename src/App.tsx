import React from 'react';
import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row, Table } from 'react-bootstrap';
import PageIndex from './components/PageIndex';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Pet Clinic
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="ΠΕΛΑΤΕΣ" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">ΛΙΣΤΑ ΠΕΛΑΤΩΝ</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">ΝΕΟΣ ΠΕΛΑΤΗΣ</NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <Nav>
                <Nav.Link href="#logine">Login</Nav.Link>
                <Nav.Link eventKey={2} href="#help">Help</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <body>
        <Container fluid="md">
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
            <PageIndex active={2} total={10} />
          </Row>

        </Container>

      </body>

    </div>
  );
}

export default App;
