import axios from "axios";
import { customerHelloUrl, tokenPrefix } from '../constants'

// const receivedToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNzQ5MjQwOSwiaWF0IjoxNjM3NDkyMTA5fQ.h_NQIL-NMoFE2hEWNG5jlvVji7TPTRXlyHxS6xVoh0F0oq0-u4AMg8R0J-sfyyWajuVfrROCEy6uaAWEihRNGw'

export const sendGetHelloRequest = async ( responseHander:Function ) => {
    
   
   const storedToken = localStorage.getItem('mykey');
   
   console.log('token is localStorage: ' + storedToken);
   const token = tokenPrefix + storedToken;
   console.log('Authorization Token: ' + token);

    try {
        const resp = await axios.get(customerHelloUrl,{
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

