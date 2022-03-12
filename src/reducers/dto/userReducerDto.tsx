import { User } from "../../api/models";

export interface UserInfo {
    user: User;
    loginerror: boolean;
    errmessage: string;
    loggedIn: boolean;
  }
  