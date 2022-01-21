import React from "react"
import { Row } from "react-bootstrap"
import Counter from "../../components/counter"
interface Props {
    counterValue: number;
    counterMessage: string;
    anotherValue: number;
    anotherMessage: string;
    increaseStoreCounter: any;
    decreaseStoreCounter: any;
    resetStoreCounter: any;
}

const HomePage = (props:Props) => {


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

        </>
    );
}

export default HomePage;