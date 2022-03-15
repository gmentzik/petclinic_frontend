export const CounterActionTypes = {
    INCREASE_COUNT: 'INCREASE_COUNT',
    DECREASE_COUNT: 'DECREASE_COUNT',
    RESET_COUNT: 'RESET_COUNT'
}

export const UserReducerActionTypes = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    LOGIN_ERROR: 'LOGIN_ERROR'
}


export const NotificationsReducerActionTypes = {
    ADD_NOTIFICATION: 'ADD_NOTIFICATION',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
    CLEAR_ALL_NOTIFICATIONS: 'CLEAR_ALL_NOTIFICATIONS'
}


export const UtilReducerActionTypes = {
    SHOW_LOADING: 'SHOW_LOADING',
    REMOVE_LOADING: 'REMOVE_LOADING',
    NAVIGATE_TO: 'NAVIGATE_TO',
    CLEAR_NAVIGATE_TO: 'CLEAR_NAVIGATE_TO'

}

export const customerReducerActionTypes = {
    UPDATE_CUSTOMER_LIST: 'UPDATE_CUSTOMER_LIST',
    CLEAR_CUSTOMER_LIST: 'CLEAR_CUSTOMER_LIST',
    UPDATE_SELECTED_CUSTOMER: 'UPDATE_SELECTED_CUSTOMER',
    CLEAR_SELECTED_CUSTOMER: 'CLEAR_SELECTED_CUSTOMER'

}