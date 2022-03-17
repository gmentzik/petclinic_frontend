import axios, { AxiosError, AxiosResponse } from "axios";
import { customerHelloUrl, customerUrl, tokenPrefix } from '../constants'
import { CustomersList } from "../api/models";
import { getCurrentUserFromLocalStorage } from "../utils/localStorageUtils";
// import { useNavigate  } from "react-router-dom";

// const receivedToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNzQ5MjQwOSwiaWF0IjoxNjM3NDkyMTA5fQ.h_NQIL-NMoFE2hEWNG5jlvVji7TPTRXlyHxS6xVoh0F0oq0-u4AMg8R0J-sfyyWajuVfrROCEy6uaAWEihRNGw'

const sendGetHelloRequest = async (responseHander: Function) => {

  const storedToken = getCurrentUserFromLocalStorage().jwttoken;

  console.log('token is localStorage: ' + storedToken);
  const token = tokenPrefix + storedToken;
  console.log('Authorization Token: ' + token);

  try {
    const resp = await axios.get(customerHelloUrl, {
      withCredentials: false,
      headers: {
        'Authorization': token,
      },
    });
    console.log(resp.data);
    responseHander(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }

};

const sendGetAllCustomers = (page?: number | undefined, size?: number | undefined) => {

  const storedToken = getCurrentUserFromLocalStorage().jwttoken;

  console.log('token is localStorage: ' + storedToken);
  const token = tokenPrefix + storedToken;
  console.log('Authorization Token: ' + token);

  return axios.get(customerUrl, {
    withCredentials: false,
    headers: {
      'Authorization': token,
    },
    params: {
      page: page ? page : 0,
      size: size ? size : 3
    }
  }).then(success).catch(failure);

}

const success = (response: AxiosResponse): any => {
  return response.data;
};

const failure = (error: AxiosError): any => {
  throw error;
};

export { sendGetHelloRequest, sendGetAllCustomers as sendGetAllCustomersReduxThunk };
