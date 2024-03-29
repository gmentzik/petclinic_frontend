import { customerReducerActionTypes } from "../actions/actionTypes";
import { Customer, CustomersList, emptyCustomer, emptyCustomersList } from "../api/models";


export interface CustomersState {
    customersList: CustomersList;
    selectedCustomer: Customer;    
    formErrors: any;
}

const createDefaultState = (): CustomersState => ({
    customersList: emptyCustomersList,
    selectedCustomer: emptyCustomer,
    formErrors: {}
});

interface ActionType {
    type: string,
    payload: any
}

export const customersReducer = (state: CustomersState = createDefaultState(), action: ActionType): CustomersState => {
    switch (action.type) {
        case customerReducerActionTypes.UPDATE_CUSTOMER_LIST:
            return {
                ...state,
                customersList: action.payload
            };
        case customerReducerActionTypes.CLEAR_CUSTOMER_LIST:
            return {
                ...state,
                customersList: emptyCustomersList
            };
        case customerReducerActionTypes.UPDATE_SELECTED_CUSTOMER:
            return {
                ...state,
                selectedCustomer: action.payload
            };
        case customerReducerActionTypes.CLEAR_SELECTED_CUSTOMER:
            return {
                ...state,
                selectedCustomer: emptyCustomer
            };
        case customerReducerActionTypes.UPDATE_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case customerReducerActionTypes.CLEAR_FORM_ERRORS:
            return {
                ...state,
                formErrors: {}
            };
        default:
            return state;
    }
};