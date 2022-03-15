import { AxiosError } from "axios";
import { CustomersList, ErrorData } from '../api/models';
import { customerReducerActionTypes, UserReducerActionTypes, UtilReducerActionTypes } from '../actions/actionTypes';
import { UserInfo } from '../reducers/dto/userReducerDto';
import { unknownUser } from '../api/models/User';
import { removeCurrentUserFromLocalStorage } from '../utils/localStorageUtils';
import { createAndDispachNewNotification } from './notificationActions';
import { NotificationMessageType } from '../reducers/notificationsReducer';
import { sendGetAllCustomersReduxThunk } from '../api/customersApi';



// export const login = (username, password) => (dispatch) => {
export const fetchCustomerListAction = ( page?: number, size?: number,) => (dispatcher: any) => {
    dispatcher({type: UtilReducerActionTypes.SHOW_LOADING});
    return sendGetAllCustomersReduxThunk(page, size).then(
        (data: CustomersList) => {
            dispatcher({type: UtilReducerActionTypes.REMOVE_LOADING});
            dispatcher({type: customerReducerActionTypes.UPDATE_CUSTOMER_LIST, payload: data});
        })
        .catch((e) => handlerError(e, dispatcher));
}

const handlerError = (error: AxiosError, dispatcher: any) => {
    dispatcher({type: UtilReducerActionTypes.REMOVE_LOADING});
    dispatcher({type: customerReducerActionTypes.CLEAR_CUSTOMER_LIST});
    let message = '';
    let errmessage =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();

    if (error.response) {
        // Request made and server responded
        const errorData: ErrorData = error.response.data;
        if (errorData) {
            if (errorData.details) {
                console.log(`${errorData.message}: ${errorData.details.join()}`);
                errmessage = `${errorData.message}: ${errorData.details.join()}`;
            }
        }

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

}
