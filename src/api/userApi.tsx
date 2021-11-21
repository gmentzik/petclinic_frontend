import axios from "axios";
import { authenticateUserUrl } from '../constants';


export const authenticateUserRequest = async (uname: string, upassword: string) => {

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
        console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};