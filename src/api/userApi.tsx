import axios from "axios";
import { authenticateUserUrl } from '../constants';
import { ErrorData } from '../api/models'


export const authenticateUserRequest = async (uname: string, upassword: string, loginSuccess: Function,  loginFail: Function) => {

    const user = 
        {
            "username": uname,
            "password": upassword
        };

    // const user =   
    //     {
    //         "username": "admin",
    //         "password": "password"
    //     };


    try {
        const resp = await axios.post(authenticateUserUrl, user);
        console.log(resp.data.token);
        localStorage.setItem('mykey', resp.data.token);
        loginSuccess();
    } catch (error:any ) {
        // Handle Error Here
        if (error.response) {
            // Request made and server responded
            const errorData: ErrorData = error.response.data;
            if (errorData) {
                loginFail(`${errorData.message}: ${errorData.details.join()}`);
            }
            else {
                loginFail(`Returned Error response with status code: ${error.response.status}`);
            }
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            // console.log(error.response.data.error);
            // console.log(error.response.data.message);
            // console.log(error.response.data.details);

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
};