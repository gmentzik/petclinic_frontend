import axios from "axios";
import { customerHelloUrl } from '../constants'

const token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNzQ5MjQwOSwiaWF0IjoxNjM3NDkyMTA5fQ.h_NQIL-NMoFE2hEWNG5jlvVji7TPTRXlyHxS6xVoh0F0oq0-u4AMg8R0J-sfyyWajuVfrROCEy6uaAWEihRNGw'

export const sendGetHelloRequest = async ( responseHander:Function ) => {
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

