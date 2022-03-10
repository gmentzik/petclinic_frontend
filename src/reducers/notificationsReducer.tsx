import { NotificationsReducerActionTypes } from "../actions/actionTypes";
import { getUtcSecondsSinceEpoch } from "../utils/timeDateUtils";

export interface Notification {
  timestamp: number;
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

export const notificationsReducer = (state: NotificationsState = createDefaultState(), action: ActionType): NotificationsState => {
  switch (action.type) {
    case NotificationsReducerActionTypes.ADD_NOTIFICATION:

      return {
        ...state,
        notificationsList: addNewNotificationToList(state.notificationsList, action.payload),
      };
    case NotificationsReducerActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notificationsList: removeNotificationMessage(state.notificationsList, action.payload.timestamp),
      };
    case NotificationsReducerActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notificationsList: [],
      };
    default:
      return state;
  }
};

const addNewNotificationToList = (notificationsArray: Notification[], newNotification: Notification): Notification[] => {
  const notificationToAdd: Notification = {
    timestamp: getUtcSecondsSinceEpoch(),
    type: newNotification.type,
    message: newNotification.message
  }
  return [...notificationsArray, notificationToAdd];
}

const removeNotificationMessage = (notificationsArray: Notification[], notificationToRemoveTimestamp: number): Notification[] => {
  const foundIndex = notificationsArray.findIndex(
    (notification) => notification.timestamp === notificationToRemoveTimestamp
  );
  if (foundIndex > -1) {
    return notificationsArray.slice(foundIndex, 1);
  }
  return notificationsArray;
}

