import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Toast, ToastContainer, } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import { User } from "../../api/models";
import logo from '../../images/logo.svg';
import { State } from "../../reducers";
import { logout } from '../../actions/loginActions';
import { getCurrentUserFromLocalStorage } from "../../utils/localStorageUtils";

import { UserReducerActionTypes } from '../../actions/actionTypes';
import { UserInfo } from "../../reducers/dto/userReducerDto";
import { NotificationMessage } from "../../reducers/notificationsReducer";
import { localDateTimeFromUtcSecondsTimeStamp } from "../../utils/timeDateUtils";
import { removeNotification } from "../../actions/notificationActions";


// Magic of interconnecting React-Router 5 Link and React-Bootstrap comes from this link:
// https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together

const params = { sort: 'date', order: 'newest', myparam: 'myparamvalue' };
const location =
{
    pathname: '/customers/form/25',
    search: `?${createSearchParams(params)}`,
}

const Header = () => {

    const loggedIn: boolean = useSelector((state: State) => state.userReducer.loggedIn);
    const user: User = useSelector((state: State) => state.userReducer.user);
    const notificationsList: NotificationMessage[] = useSelector((state: State) => state.notificationsReducer.notificationsList);
    const dispatcher = useDispatch();

    useEffect(() => {
        const lastKnownUser = getCurrentUserFromLocalStorage();
        if (lastKnownUser.username !== '' && lastKnownUser.jwttoken !== '') {
            const payload: UserInfo = {
                user: lastKnownUser,
                loginerror: false,
                errmessage: '',
                loggedIn: true
            }
            dispatcher({
                type: UserReducerActionTypes.LOGIN_SUCCESS,
                payload,
            });
        }
    }, []);

    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);
    const [showC, setShowC] = useState(true);

    const toggleShowA = () => {
        console.log("toggleShowA");
        setShowA(!showA);
    };
    const toggleShowB = () => setShowB(!showB);
    const toggleShowC = () => setShowC(!showC);


    const generateNotificationsList: any = () => {
        return (
            notificationsList.map(
                (item) => {
                    return (
                        <Toast key={item.timestamp} bg={item.type} onClose={() => dispatcher(removeNotification(item))}>
                            <Toast.Header>
                                <strong className="me-auto">{item.header}</strong>
                                <small className="text-muted">{localDateTimeFromUtcSecondsTimeStamp(item.timestamp)}</small>
                            </Toast.Header>
                            <Toast.Body>{item.message}</Toast.Body>
                        </Toast>
                    );
                }
            )

        )
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
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
                                <NavDropdown.Item as={Link} disabled={!loggedIn} to="customers"> ΛΙΣΤΑ ΠΕΛΑΤΩΝ </NavDropdown.Item>
                                <NavDropdown.Item as={Link} disabled={!loggedIn} to="customers/form">ΝΕΟΣ ΠΕΛΑΤΗΣ</NavDropdown.Item>
                                <NavDropdown.Item as={Link} disabled={!loggedIn} to="customers/form/24">ΠΡΟΒΟΛΗ ΠΕΛΑΤΗ 24</NavDropdown.Item>
                                <NavDropdown.Item as={Link} disabled={!loggedIn} to={location}>ΠΡΟΒΟΛΗ ΠΕΛΑΤΗ 25</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {!loggedIn && <Nav.Link as={Link} to="login">Login</Nav.Link>}
                            {loggedIn && <Nav.Link as={Link} to="">{user.username}</Nav.Link>}
                            {loggedIn && <Nav.Link as={Link} to="" onClick={dispatcher(logout)}>Logout</Nav.Link>}
                            <Nav.Link as={Link} eventKey={2} to="help">Help</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div id='notificationsContainer' style={{ position: 'relative', zIndex: 100 }} className="row" >
                <ToastContainer className="p-3" position={'top-end'} style={{ marginRight: '10px' }}>
                    {generateNotificationsList()}
                </ToastContainer>
            </div>
        </>
    );

}

export default Header;