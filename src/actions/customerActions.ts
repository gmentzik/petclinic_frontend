import { authenticateUserRequest } from '../api/userApi';
import { AxiosError } from "axios";
import { CustomersList, ErrorData, User } from '../api/models';
import { UserReducerActionTypes } from '../actions/actionTypes';
import { UserInfo } from '../reducers/dto/userReducerDto';
import { unknownUser } from '../api/models/User';
import { removeCurrentUserFromLocalStorage } from '../utils/localStorageUtils';
import { createAndDispachNewNotification } from './notificationActions';
import { NotificationMessageType } from '../reducers/notificationsReducer';
import { sendGetAllCustomersReduxThunk } from '../api/customersApi';


let message = '';
// export const login = (username, password) => (dispatch) => {
export const fetchCustomerListAction = (responseHander: Function, navigateTo: any, page?: number, size?: number, ) => (dispatcher: any) => {

    return sendGetAllCustomersReduxThunk(page, size).then(
        (data: CustomersList) => {
            const message = "Fetched customer List";
            createAndDispachNewNotification(dispatcher, NotificationMessageType.SUCCESS, message);
            return responseHander(data);
        })
        .catch((e) => handlerError(e, dispatcher, navigateTo));
}

const handlerError = (error: AxiosError, dispatcher: any, navigateTo:any ) => {
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
            console.log(`${errorData.message}: ${errorData.details.join()}`);
            errmessage = `${errorData.message}: ${errorData.details.join()}`;
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

    if (!error.response) {
        //notify.warn('Network/Server error');
        console.error('**Network/Server error');
        return Promise.reject(error);
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
            navigateTo('login');
            break;

        default:
            message = 'Server Error';
            createAndDispachNewNotification(dispatcher, NotificationMessageType.ERROR, message);

    }
}
