import { combineReducers } from "redux";
import { CounterState, counterReducer } from "../reducers/counterReducer";
import { AnotherState, anotherReducer } from "../reducers/anotherReducer";
import { UserState, userReducer } from "../reducers/userReducer";

export interface CustomerState {
    counterReducer: CounterState;
    anotherReducer: AnotherState;
    userReducer: UserState;
}

export type State = CustomerState;

export const rootReducer = combineReducers<State>({
    counterReducer,
    anotherReducer,
    userReducer,
});

