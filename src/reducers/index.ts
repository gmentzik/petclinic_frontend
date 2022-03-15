import { combineReducers } from "redux";
import { CounterState, counterReducer } from "../reducers/counterReducer";
import { AnotherState, anotherReducer } from "../reducers/anotherReducer";
import { UserState, userReducer } from "../reducers/userReducer";
import { NotificationsState, notificationsReducer } from "../reducers/notificationsReducer";
import { utilReducer,UtilReducerState } from "./utilReducer";
import { customersReducer, CustomersState } from "./customersReducer";

export interface AppUserState {
    userReducer: UserState;
}

export interface AppState {
    notificationsReducer: NotificationsState;
    utilReducer: UtilReducerState
}
export interface AppCustomerState {
    counterReducer: CounterState;
    anotherReducer: AnotherState;
    customersReducer: CustomersState;
}

export type State = AppUserState & AppState & AppCustomerState;

export const rootReducer = combineReducers<State>({
    counterReducer,
    anotherReducer,
    userReducer,
    notificationsReducer,
    utilReducer,
    customersReducer,
});

