import React, { ChangeEvent, FormEvent, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/loginActions";
import { State } from "../../reducers";

// type HTMLElementEvent<T extends HTMLElement> = Event & {
//     target: T,
// }

const Login = () => {

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const loggedIn: boolean = useSelector((state: State) => state.userReducer.loggedIn);
    const loginerror: boolean = useSelector((state: State) => state.userReducer.loginerror);
    const errmessage: string = useSelector((state: State) => state.userReducer.errmessage);
    const dispatcher = useDispatch();

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
        dispatcher(loginAction(userName, userPassword));
    }

    return (
        <>
            {!loggedIn && <Form onSubmit={handleSubmit}>
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

            {loggedIn && <Alert className={'marginTop10px'} variant={'success'}>
                Logged in successfuly!
            </Alert>}

            {loginerror && <Alert className={'marginTop10px'} variant={'danger'}>
                Login failed: ( {errmessage} )
            </Alert>}
        </>
    );

}


export default Login;