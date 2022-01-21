import { combineReducers } from "redux";
import { CounterState, counterReducer } from "../reducers/counterReducer";
import { AnotherState, anotherReducer } from "../reducers/anotherReducer";

export interface CustomerState {
    counterReducer: CounterState;
    anotherReducer: AnotherState;
}

export type State = CustomerState;

export const rootReducer = combineReducers<State>({
    counterReducer,
    anotherReducer,
});

