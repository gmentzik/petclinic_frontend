import { combineReducers } from "redux";
import { CounterState, counterReducer } from "../reducers/counterReducer";
import { AnotherState, anotherReducer } from "../reducers/anotherReducer";
import { UserState, userReducer } from "../reducers/userReducer";
import { NotificationsState, notificationsReducer } from "../reducers/notificationsReducer";

export interface AppUserState {
    userReducer: UserState;
    notificationsReducer: NotificationsState;
}

export interface AppState {
    notificationsReducer: NotificationsState;
}
export interface AppCustomerState {
    counterReducer: CounterState;
    anotherReducer: AnotherState;
}

export type State = AppUserState & AppState & AppCustomerState;

export const rootReducer = combineReducers<State>({
    counterReducer,
    anotherReducer,
    userReducer,
    notificationsReducer,
});

