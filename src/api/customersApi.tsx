import axios from "axios";
import { customerHelloUrl, customerUrl, tokenPrefix } from '../constants'
import { CustomersList } from "../api/models";
import { getCurrentUserFromLocalStorage } from "../utils/localStorageUtils";
// import { useNavigate  } from "react-router-dom";

// const receivedToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNzQ5MjQwOSwiaWF0IjoxNjM3NDkyMTA5fQ.h_NQIL-NMoFE2hEWNG5jlvVji7TPTRXlyHxS6xVoh0F0oq0-u4AMg8R0J-sfyyWajuVfrROCEy6uaAWEihRNGw'

const sendGetHelloRequest = async ( responseHander:Function ) => {
    
   const storedToken = getCurrentUserFromLocalStorage().jwttoken;
   
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

const sendGetAllCustomers = async ( responseHander:Function, page?:number, size?:number ) => {
    
  const storedToken = getCurrentUserFromLocalStorage().jwttoken;
      
      console.log('token is localStorage: ' + storedToken);
      const token = tokenPrefix + storedToken;
      console.log('Authorization Token: ' + token);

       try {
           const resp = await axios.get(customerUrl,{
               withCredentials: false,
               headers: {
                 'Authorization': token,
               },
               params: { 
                 page: page ? page : 0,
                 size: size ? size : 3 
                } 
             });
           const customersList: CustomersList = resp.data;
           console.log(customersList);
           responseHander(customersList);
       } catch (error:any) {
           // Handle Error Here
           console.error(error);
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
              break;
        
            case 401: // authentication error, logout the user
              //notify.warn('Please login again', 'Session Expired');
              console.error(error.response.status, error.message);
              localStorage.removeItem('petUser');
              // NavigateTo('login');
              return window.location.href = '/login'
              // break;
        
        default:
          console.error(error.response.status, error.message);
          //notify.error('Server Error');
        
        
        
         }
          return Promise.reject(error);
        }
};

export { sendGetHelloRequest, sendGetAllCustomers };

// function NavigateTo(path: string) {
//   const navigate = useNavigate();
//   navigate(path);
// }
