import { NotificationMessage, NotificationMessageType } from '../reducers/notificationsReducer';
import { getUtcSecondsSinceEpoch } from '../utils/timeDateUtils';
import { NotificationsReducerActionTypes } from './actionTypes';


export interface NewNotificationMessage {
  type: NotificationMessageType;
  message: string;
}

export const addNotification = (notificationMessage: NewNotificationMessage) => (dispatcher:any) =>  {
  const epochtimestamp = getUtcSecondsSinceEpoch();
  const notificationToAdd: NotificationMessage = {
    timestamp: epochtimestamp,
    type: notificationMessage.type,
    header: getNotificationHeader(notificationMessage.type),
    message: notificationMessage.message,
  }
  dispatcher({
    type: NotificationsReducerActionTypes.ADD_NOTIFICATION,
    payload: notificationToAdd,
  });
}

export const removeNotification = (notificationMessage: NotificationMessage) => (dispatcher:any) =>  {
  console.log("removeNotification");
  console.log(notificationMessage);
  dispatcher({
    type: NotificationsReducerActionTypes.REMOVE_NOTIFICATION,
    payload: notificationMessage,
  });
}

export const clearAllNotifications = () => (dispatcher:any) =>  {
  dispatcher({
    type: NotificationsReducerActionTypes.CLEAR_ALL_NOTIFICATIONS,
  });
}


const getNotificationHeader = (type:string):string => {
  switch (type) {
    case NotificationMessageType.SUCCESS:
      return NotificationMessageType.SUCCESS.toLocaleUpperCase();
    case NotificationMessageType.INFO:
      return NotificationMessageType.INFO.toLocaleUpperCase();
    case NotificationMessageType.WARNING:
      return NotificationMessageType.WARNING.toLocaleUpperCase();
    case NotificationMessageType.ERROR:
      return NotificationMessageType.ERROR.toLocaleUpperCase();
    default:
      return "UNEXPECTED VALUE";
  }
} 