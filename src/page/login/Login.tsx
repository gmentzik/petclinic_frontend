import React, { ChangeEvent, FormEvent, useState } from "react";
import { Alert, Button, Form, Toast, ToastContainer } from "react-bootstrap";
// import { authenticateUserRequest } from '../../api/userApi';
import { login } from '../../actions/loginActions';
import { useNavigate } from 'react-router-dom';

// type HTMLElementEvent<T extends HTMLElement> = Event & {
//     target: T,
// }

interface Props {
    login: (username: string, password: string, loginSuccess: Function, loginFail: Function) => void;
}

const Login = (props:Props) => {

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [signInFailedError, setSignInFailedError] = useState(null);
    const [showA, setShowA] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    // const navigate = useNavigate();

    const toggleShowA = () => setShowA(!showA);

    const handleChange = (event: ChangeEvent) => {
        const target = event.target as HTMLFormElement;
        let fieldName: string = target.name;
        let fieldVal: string = target.value;
        if (fieldName === 'username') setUserName(fieldVal);
        if (fieldName === 'password') setUserPassword(fieldVal);
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(userName);
        console.log(userPassword);
        // authenticateUserRequest(userName, userPassword, loginSuccess, loginFailed);
        // login(userName, userPassword, loginSuccess, loginFailed);
        props.login(userName, userPassword, loginSuccess, loginFailed);
    }

    const loginSuccess = () => {
        toggleShowA();
        setSignInFailedError(null);
        // navigate('/customers');
        setSuccessLogin(true);

    }

    const loginFailed = (err: any) => {
        setSignInFailedError(err);
        setSuccessLogin(false);
    }

    return (
        <>
            <ToastContainer className="p-3" position={'top-center'}>
                <Toast show={showA} bg={'info'} onClose={toggleShowA} delay={3000} autohide className={'marginTop32px'}>
                    {/* <Toast.Header>
                        <strong className="me-auto">Sign In</strong>
                    </Toast.Header> */}
                    <Toast.Body>You have signed in successfuly!</Toast.Body>
                </Toast>
            </ToastContainer>
            {!successLogin &&<Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" placeholder="Username" onChange={handleChange} defaultValue={userName} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} defaultValue={userPassword} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Login
                </Button>
            </Form>}
            {successLogin && <div>
                <strong>Logged in successfuly!</strong>
            </div>}

            {signInFailedError && <Alert className={'marginTop10px'} variant={'danger'}>
                Sign in failed ( {signInFailedError} )
            </Alert>}
        </>
    );


}


export default Login;