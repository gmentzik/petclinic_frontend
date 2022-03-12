import { NotificationsReducerActionTypes } from "../actions/actionTypes";


export enum NotificationMessageType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'danger'
}
export interface NotificationMessage {
  timestamp: number;
  type: NotificationMessageType;
  header: string;
  message: string;
}

export interface NotificationsState {
  notificationsList: NotificationMessage[];
}


const createDefaultState = (): NotificationsState => ({
  notificationsList: [],
});
interface ActionType {
  type: string;
  payload: NotificationMessage
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
    case NotificationsReducerActionTypes.CLEAR_ALL_NOTIFICATIONS:
      return {
        ...state,
        notificationsList: [],
      };
    default:
      return state;
  }
};

const addNewNotificationToList = (notificationsArray: NotificationMessage[], newNotification: NotificationMessage): NotificationMessage[] => {
  console.log('addNewNotificationToList');


  // Allow up to 8 notifications to be added
  if (notificationsArray.length < 8) {
    return [...notificationsArray, newNotification];
  }
  return notificationsArray;
}

const removeNotificationMessage = (notificationsArray: NotificationMessage[], notificationToRemoveTimestamp: number): NotificationMessage[] => {
  const foundIndex = notificationsArray.findIndex(
    (notification) => notification.timestamp === notificationToRemoveTimestamp
  );
  console.log(foundIndex);

  if (foundIndex > -1) {
    let deepCopyArray: NotificationMessage[] = [];
    notificationsArray.forEach(element => {
      deepCopyArray.push(element);
    });
    deepCopyArray.splice(foundIndex, 1);
    return deepCopyArray;
  }
  return notificationsArray;
}


// DUMMY CODE FOR TESTING NOTIFICATIONS
// const msg1: NotificationMessage = {
//   timestamp: getUtcSecondsSinceEpoch(),
//   type: NotificationMessageType.INFO,
//   header: NotificationMessageType.INFO.toLocaleUpperCase(),
//   message: 'Info Message'
// }

// const msg2: NotificationMessage = {
//   timestamp: getUtcSecondsSinceEpoch() + 5,
//   type: NotificationMessageType.WARNING,
//   header: NotificationMessageType.WARNING.toLocaleUpperCase(),
//   message: 'Warning Message'
// }

// const msg3: NotificationMessage = {
//   timestamp: getUtcSecondsSinceEpoch() + 10,
//   type: NotificationMessageType.ERROR,
//   header: NotificationMessageType.ERROR.toLocaleUpperCase(),
//   message: 'Error Message'
// }

// const msg4: NotificationMessage = {
//   timestamp: getUtcSecondsSinceEpoch() + 20,
//   type: NotificationMessageType.SUCCESS,
//   header: NotificationMessageType.SUCCESS.toLocaleUpperCase(),
//   message: 'Success Message'
// }

// const testArray: NotificationMessage[] = [msg1, msg2, msg3, msg4];