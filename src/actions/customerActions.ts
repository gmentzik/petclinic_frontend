import { AxiosError } from "axios";
import { CustomerDTO, CustomersList, CustomersListQueryFilter } from '../api/models';
import { customerReducerActionTypes, UserReducerActionTypes, UtilReducerActionTypes } from '../actions/actionTypes';
import { UserInfo } from '../reducers/dto/userReducerDto';
import { unknownUser } from '../api/models/User';
import { removeCurrentUserFromLocalStorage } from '../utils/localStorageUtils';
import { createAndDispachNewNotification } from './notificationActions';
import { NotificationMessageType } from '../reducers/notificationsReducer';
import { sendGetAllCustomers, sendGetCustomerById, updateCustomer } from '../api/customersApi';



export const fetchCustomerListAction = ( page?: number, size?: number, searchParams?: CustomersListQueryFilter | any | undefined,) => (dispatcher: any) => {
    dispatcher({type: UtilReducerActionTypes.SHOW_LOADING});
    return sendGetAllCustomers(page, size, searchParams).then(
        (data: CustomersList) => {
            dispatcher({type: UtilReducerActionTypes.REMOVE_LOADING});
            dispatcher({type: customerReducerActionTypes.UPDATE_CUSTOMER_LIST, payload: data});
            dispatcher({type: customerReducerActionTypes.CLEAR_FORM_ERRORS});
        })
        .catch((e) => handlerError(e, dispatcher));
}

export const fetchCustomerByIdAction = (customerId: number) => (dispatcher: any) => {
    dispatcher({type: UtilReducerActionTypes.SHOW_LOADING});
    return sendGetCustomerById(customerId).then(
        (data: CustomersList) => {
            dispatcher({type: UtilReducerActionTypes.REMOVE_LOADING});
            dispatcher({type: customerReducerActionTypes.UPDATE_SELECTED_CUSTOMER, payload: data});
        })
        .catch((e) => handlerError(e, dispatcher));
}

export const updateCustomerAction = ( customer:CustomerDTO ) => (dispatcher: any) => {
    dispatcher({type: UtilReducerActionTypes.SHOW_LOADING});
    return updateCustomer(customer).then(
        (data: any) => {
            dispatcher({type: UtilReducerActionTypes.REMOVE_LOADING});
            dispatcher({
                type: UtilReducerActionTypes.NAVIGATE_TO,
                payload: '/customers',
            });
            dispatcher({type: customerReducerActionTypes.CLEAR_SELECTED_CUSTOMER});
        })
        .catch((e) => handlerError(e, dispatcher));
}

export const clearSelectedCustomerAction = () => (dispatcher:any) =>  {
  dispatcher({type: customerReducerActionTypes.CLEAR_SELECTED_CUSTOMER});
}

const handlerError = (error: AxiosError, dispatcher: any) => {
    console.log('handlerError');
    dispatcher({type: UtilReducerActionTypes.REMOVE_LOADING});
    dispatcher({type: customerReducerActionTypes.CLEAR_CUSTOMER_LIST});
    let message = '';
    let errmessage =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();

        console.log(errmessage);

    if (error.response) {
        // all the other error responses
        switch (error.response.status) {
            case 400:
                console.error(error.response.status, error.message);
                //notify.warn('Nothing to display', 'Data Not Found');
                // Notification message
                message = 'Nothing to display, Data Not Found';
                createAndDispachNewNotification(dispatcher, NotificationMessageType.WARNING, message);
                break;
            case 401: // authentication error, logout the user
                removeCurrentUserFromLocalStorage();
                const payload: UserInfo = {
                    user: unknownUser,
                    loginerror: true,
                    errmessage: errmessage,
                    loggedIn: false
                }
                dispatcher({
                    type: UserReducerActionTypes.LOGIN_ERROR,
                    payload,
                });
                message = 'Please login again, Session Expired';
                createAndDispachNewNotification(dispatcher, NotificationMessageType.ERROR, message);
                dispatcher({
                    type: UtilReducerActionTypes.NAVIGATE_TO,
                    payload: '/login',
                });
                break;
            case 422: // handleMethodArgumentNotValid
                console.log(error.response?.data?.errors);
                dispatcher({type: customerReducerActionTypes.UPDATE_FORM_ERRORS, payload: error.response?.data?.errors});
                break;
            default:
                message = 'Server Error';
                createAndDispachNewNotification(dispatcher, NotificationMessageType.ERROR, message);

        }

    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        errmessage = "The request was made but no response was received";
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        errmessage = 'Error:' + error.message;
    }

    // Notification message
    message = errmessage;
    createAndDispachNewNotification(dispatcher, NotificationMessageType.ERROR, message);
    // return Promise.reject(message);
    
}

export const clearAllCustomerFormErrors = () => (dispatcher: any) => {
    dispatcher({type: customerReducerActionTypes.CLEAR_FORM_ERRORS});
}