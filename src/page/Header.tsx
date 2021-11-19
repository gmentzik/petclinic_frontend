import React from "react";
import { Container, Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from '../images/logo.svg';


const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Link to="/">
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
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="ΠΕΛΑΤΕΣ" id="collasible-nav-dropdown">
                                <NavDropdown.Item ><Link to="/customers">ΛΙΣΤΑ ΠΕΛΑΤΩΝ</Link></NavDropdown.Item>
                                <NavDropdown.Item ><Link to="/customers/form">ΝΕΟΣ ΠΕΛΑΤΗΣ</Link></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#logine">Login</Nav.Link>
                            <Nav.Link eventKey={2} href="#help">Help</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );

}

export default Header;