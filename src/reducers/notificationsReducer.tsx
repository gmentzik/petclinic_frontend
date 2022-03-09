import { NotificationsReducerActionTypes } from "../actions/actionTypes";

export interface Notification {
  index: number;
  type: string;
  message: string;
}

export interface NotificationsState {
  notificationsList: Notification[];
}

const createDefaultState = (): NotificationsState => ({
  notificationsList: [],
});

interface ActionType {
  type: string;
  payload: Notification
}

export const anotherReducer = (state: NotificationsState = createDefaultState(), action: ActionType): NotificationsState => {
  switch (action.type) {
    case NotificationsReducerActionTypes.ADD_NOTIFICATION:
      const arrayLength = state.notificationsList.length;
      const newNotification:Notification = {
        index: arrayLength,
        type: action.payload.type,
        message: action.payload.message
      }
      return {
        ...state,
        notificationsList: [...state.notificationsList, newNotification] 
      };
    case NotificationsReducerActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notificationsList: [...state.notificationsList, action.payload] 
      };
    case NotificationsReducerActionTypes.REMOVE_NOTIFICATION:
        return {
          ...state,
          notificationsList: []
        };
    default:
      return state;
  }
};


const removeNotificationMessage = (notificationsArray:Notification[], notificationToRemoveIndex:number):Notification[] => {
  if (notificationsArray.findIndex(
    (notification) => notification.index === notificationToRemoveIndex
  )) > -1 {
    return [];  
  }
  return [];
}

