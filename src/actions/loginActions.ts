import { CounterActionTypes } from './actionTypes'
import { authenticateUserRequest } from '../api/userApi_redux';
import { AxiosError } from "axios";
import { ErrorData } from '../api/models';

// export const login = (username, password) => (dispatch) => {
export const login = (username: string, password: string, loginSuccess: Function, loginFail: Function) => {

  return authenticateUserRequest(username, password).then(
    (data) => {
      localStorage.setItem('petUser', JSON.stringify(data));
      // dispatch({
      //   type: LOGIN_SUCCESS,
      //   payload: { user: data },
      // });
      return loginSuccess();
    })
    .catch((e) => handlerError(e, loginFail));


}

const handlerError = (error: AxiosError, loginFail: Function) => {
  const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString();

  if (error.response) {
    // Request made and server responded
    const errorData: ErrorData = error.response.data;
    if (errorData) {
      loginFail(`${errorData.message}: ${errorData.details.join()}`);
      // dispatch({
      //   type: LOGIN_FAIL,
      // });
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });
    }
    else {
      loginFail(message);
    }

  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    loginFail("The request was made but no response was received");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    loginFail(error.message);
  }

}
