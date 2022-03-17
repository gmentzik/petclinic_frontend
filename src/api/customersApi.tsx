import axios, { AxiosError, AxiosResponse } from "axios";
import { customerHelloUrl, customerUrl, tokenPrefix } from '../constants'
import { CustomerDTO } from "../api/models";
import { getCurrentUserFromLocalStorage } from "../utils/localStorageUtils";

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

export const createEditCustomer = (customerData: CustomerDTO) => {
  return axios.post(customerUrl, customerData).then(success).catch(failure);
}

const success = (response: AxiosResponse): any => {
  return response.data;
};

const failure = (error: AxiosError): any => {
  throw error;
};

export { sendGetHelloRequest, sendGetAllCustomers as sendGetAllCustomersReduxThunk };
