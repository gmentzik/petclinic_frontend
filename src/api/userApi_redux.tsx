import axios, { AxiosError, AxiosResponse } from "axios";
import { authenticateUserUrl } from '../constants';



export const authenticateUserRequest = (uname: string, upassword: string) => {

    const user =
    {
        "username": uname,
        "password": upassword
    };

    return axios.post(authenticateUserUrl, user).then(success).catch(failure);
}

const success = (response: AxiosResponse): any => {
    return response.data;
};

const failure = (error: AxiosError): any => {
    throw error;
};
