import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface Props {
    counter: number;
    decrease: () => void;
    increase: () => void;
    reset: () => void;
}


const Counter = (props:Props) => {
    
    const [counterValue, setCounterValue] = useState(0);

    const increase = () => {
        setCounterValue(counterValue + 1);
    }

    const decrease = () => {
        if (counterValue > 0)  setCounterValue(counterValue - 1);
    }

    const reset = () => {
        setCounterValue(0);
    }


    return (
        <>
            <h2>Internal Counter</h2>
            <ButtonGroup aria-label="Basic example" key={1} >
                <Button variant="secondary" onClick={decrease}>-</Button>
                <Button variant="secondary" onClick={reset}>{counterValue}</Button>
                <Button variant="secondary" onClick={increase}>+</Button>
            </ButtonGroup>

            <h2>Counter using redux</h2>
            <ButtonGroup aria-label="Basic example" key={2} >
                <Button variant="secondary" onClick={props.decrease}>-</Button>
                <Button variant="secondary" onClick={props.reset}>{props.counter}</Button>
                <Button variant="secondary" onClick={props.increase}>+</Button>
            </ButtonGroup>
        </>
    )
}

export default Counter;