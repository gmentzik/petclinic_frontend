import axios, { AxiosError, AxiosResponse } from "axios";
import { customerHelloUrl, customerUrl, tokenPrefix } from '../constants'
import { CustomerDTO, CustomersListQueryFilter } from "../api/models";
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


const sendGetAllCustomers = (page?: number | undefined, size?: number | undefined, 
                             queryParams?: CustomersListQueryFilter | undefined  ) => {
  return axios.get(customerUrl, {
    withCredentials: false,
    headers: {
      'Authorization':  tokenPrefix + getCurrentUserFromLocalStorage().jwttoken,
    },
    params: {
      page: page ? page : 0,
      size: size ? size : 3,
      name: queryParams?.name ? queryParams?.name : '',
      surname: queryParams?.surname ? queryParams?.surname : '',
      phone: queryParams?.landline ? queryParams?.landline : '',
      mobile: queryParams?.mobile ? queryParams?.mobile : ''
    }
  }).then(success).catch(failure);

}

const getPostHeaders = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': tokenPrefix + getCurrentUserFromLocalStorage().jwttoken,
    }
  }
}

const updateCustomer = (customerData: CustomerDTO) => {
  return axios.post(customerUrl,
    customerData,
    getPostHeaders()
  ).then(success).catch(failure);
}

const success = (response: AxiosResponse): any => {
  return response.data;
};

const failure = (error: AxiosError): any => {
  throw error;
};

export { sendGetHelloRequest, sendGetAllCustomers, updateCustomer };
