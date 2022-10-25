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
  searchParams?: CustomersListQueryFilter | undefined) => {

  let getGetAllCustomersParams: any = {
    page: page ? page : 0,
    size: size ? size : 3,
  }
  getGetAllCustomersParams = addGetGetAllCustomersParams(getGetAllCustomersParams, searchParams);

  return axios.get(customerUrl, {
    withCredentials: false,
    headers: {
      'Authorization': tokenPrefix + getCurrentUserFromLocalStorage().jwttoken,
    },
    params: getGetAllCustomersParams
  }).then(success).catch(failure);

}

const addGetGetAllCustomersParams: any = (getGetAllCustomersParams: any, searchParams?: CustomersListQueryFilter | undefined) => {
  if (searchParams?.name) {
    getGetAllCustomersParams = {
      ...getGetAllCustomersParams,
      name: searchParams.name
    }
  };
  if (searchParams?.surname) {
    getGetAllCustomersParams = {
      ...getGetAllCustomersParams,
      surname: searchParams.surname
    }
  };
  if (searchParams?.phone) {
    getGetAllCustomersParams = {
      ...getGetAllCustomersParams,
      phone: searchParams.phone
    }
  };
  if (searchParams?.mobile) {
    getGetAllCustomersParams = {
      ...getGetAllCustomersParams,
      mobile: searchParams.mobile
    }
  };
  return getGetAllCustomersParams;
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
