import React from "react"
import { Alert, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { State } from "../../reducers";

const HomePage = () => {

    const loggedIn: boolean = useSelector((state: State) => state.userReducer.loggedIn);

    return (
        <>
            <Row>
                <div className="d-flex justify-content-center">
                    <h1>PET CLINIC DATABASE APPLICATION</h1>
                </div>
            </Row>
            <Row>
                <div className="d-flex justify-content-center">
                    <h4>George Mentzikof 2021</h4>
                </div>
            </Row>
            {!loggedIn &&
                <Row>
                    <div className="d-flex justify-content-center">
                        <Alert className={'marginTop10px'} variant={'warning'}>
                            PLEASE LOGIN FIRST
                        </Alert>
                    </div>
                </Row>
            }
            {loggedIn &&
                <Row>
                    <div className="d-flex justify-content-center">
                        <Alert className={'marginTop10px'} variant={'success'}>
                            WELCOME TO PET MEDICAL CARE DATABASE
                        </Alert>
                    </div>
                </Row>
            }

        </>
    );
}

export default HomePage;