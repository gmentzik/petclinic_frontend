import React from "react"
import { Alert, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import Counter from "../../components/counter"
import { State } from "../../reducers";
interface Props {
    counterValue: number;
    counterMessage: string;
    anotherValue: number;
    anotherMessage: string;
    increaseStoreCounter: any;
    decreaseStoreCounter: any;
    resetStoreCounter: any;
}

const HomePage = (props: Props) => {

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
            {!loggedIn &&
                <div>
                    <Row>
                        <div className="d-flex justify-content-center">
                            <h4>Redux counterReducer {props.counterMessage}  and value: {props.counterValue}</h4>
                        </div>
                    </Row>
                    <Row>
                        <div className="d-flex justify-content-center">
                            <h4>Redux anotherReducer {props.anotherMessage}  and value: {props.anotherValue}</h4>
                        </div>
                    </Row>
                    <Row>
                        <Counter
                            counter={props.counterValue}
                            increase={props.increaseStoreCounter}
                            decrease={props.decreaseStoreCounter}
                            reset={props.resetStoreCounter}
                        />
                    </Row>
                </div>
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