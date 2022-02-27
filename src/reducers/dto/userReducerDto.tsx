import { User } from "../../api/models";

export interface UserInfo {
    user: User;
    errmessage: string;
    loggedIn: boolean;
  }
  