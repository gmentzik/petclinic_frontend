import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown, Spinner, Toast, ToastContainer, } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import { User } from "../../api/models";
import pmclogo from '../../images/pmc128x128.webp';
import { State } from "../../reducers";
import { logoutAction } from '../../actions/loginActions';
import { getCurrentUserFromLocalStorage } from "../../utils/localStorageUtils";

import { UserReducerActionTypes, UtilReducerActionTypes } from '../../actions/actionTypes';
import { UserInfo } from "../../reducers/dto/userReducerDto";
import { NotificationMessage } from "../../reducers/notificationsReducer";
import { localDateTimeFromUtcMillisecondsTimeStamp } from "../../utils/timeDateUtils";
import { clearAllNotificationsAction, removeNotificationAction } from "../../actions/notificationActions";
import { useNavigate } from "react-router-dom";


// Magic of interconnecting React-Router 5 Link and React-Bootstrap comes from this link:
// https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together

const params = { sort: 'date', order: 'newest', myparam: 'myparamvalue' };
const location =
{
    pathname: '/customers/form/25',
    search: `?${createSearchParams(params)}`,
}

const Header = (props: any) => {

    const loggedIn: boolean = useSelector((state: State) => state.userReducer.loggedIn);
    const loading: boolean = useSelector((state: State) => state.utilReducer.loading);
    const user: User = useSelector((state: State) => state.userReducer.user);
    const navigateToUrl: string = useSelector((state: State) => state.utilReducer.navigateToUrl);
    const notificationsList: NotificationMessage[] = useSelector((state: State) => state.notificationsReducer.notificationsList);
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false);

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
    }, [dispatcher]);

    useEffect(() => {
        if (loggedIn && !logged) {
            setLogged(true);
            navigate("/");
        }
    }, [loggedIn, logged, navigate]);
   
    useEffect(() => {
        if (navigateToUrl !== '') {
            navigate(navigateToUrl);
            dispatcher({
                type: UtilReducerActionTypes.CLEAR_NAVIGATE_TO,
            });
        }
    }, [navigateToUrl, navigate, dispatcher]);

    const generateNotificationsList: any = () => {
        return (
            notificationsList.map(
                (item, i) => {
                    return (
                        <Toast key={item.timestamp} bg={item.type} onClose={() => dispatcher(removeNotificationAction(item))} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">{item.header}</strong>
                                <small className="text-muted">{localDateTimeFromUtcMillisecondsTimeStamp(item.timestamp)}</small>
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
                            src={pmclogo}
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
                                <NavDropdown.Item as={Link} disabled={!loggedIn} to="customers/form/1">ΠΡΟΒΟΛΗ ΠΕΛΑΤΗ 1</NavDropdown.Item>
                                <NavDropdown.Item as={Link} disabled={!loggedIn} to={location}>ΠΡΟΒΟΛΗ ΠΕΛΑΤΗ 25</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'countersdemo'}>COUNTERS DEMO</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {!loggedIn && <Nav.Link as={Link} to="login">Login</Nav.Link>}
                            {loggedIn && <Nav.Link as={Link} to="">{user.username}</Nav.Link>}
                            {loggedIn && <Nav.Link as={Link} to="" onClick={dispatcher(logoutAction)}>Logout</Nav.Link>}
                            <Nav.Link as={Link} eventKey={2} to="help">Help</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div id='notificationsContainer' style={{ position: 'relative', zIndex: 100 }} className="row" >
                <ToastContainer className="p-3" position={'top-end'} style={{ marginRight: '10px' }}>
                    {generateNotificationsList()}
                    {!!notificationsList.length && <Button style={{ pointerEvents: 'auto' }}variant="primary" onClick={() => {console.log('Clear all notifications'); dispatcher(clearAllNotificationsAction());}} >Clear all</Button>}
                </ToastContainer>
            </div>
            {loading && <div id='loadingContainer' >
                <Spinner id='loadingSpinner' animation="border" variant="info" />
            </div>}
        </>
    );

}

export default Header;