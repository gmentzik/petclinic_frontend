import { User } from '../api/models';
import { unknownUser } from '../api/models/User';
import { UserReducerActionTypes } from '../actions/actionTypes'
import { UserInfo } from './dto/userReducerDto';


export interface UserState {
  user: User;
  loginerror: boolean;
  errmessage: string;
  loggedIn: boolean;
}

const createDefaultState = (): UserState => ({
  user: unknownUser,
  loginerror: false,
  errmessage: "",
  loggedIn: false
});

export const userReducer = (state: UserState = createDefaultState(), action: any): UserState => {
  switch (action.type) {
    case UserReducerActionTypes.LOGIN_SUCCESS:
    case UserReducerActionTypes.LOGOUT:
    case UserReducerActionTypes.LOGIN_ERROR:
      return handleUserInfo(state, action.payload);
    default:
      return state;
  }
};

const handleUserInfo = (
  state: UserState,
  userInfo: UserInfo,
): UserState => ({
  ...state,
  user: userInfo.user || unknownUser,
  loginerror: userInfo.loginerror,
  errmessage: userInfo.errmessage || '',
  loggedIn: userInfo.loggedIn,
});

