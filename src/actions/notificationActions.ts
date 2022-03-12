import { NotificationMessage, NotificationMessageType } from '../reducers/notificationsReducer';
import { getUtcSecondsSinceEpoch } from '../utils/timeDateUtils';
import { NotificationsReducerActionTypes } from './actionTypes';


export interface NewNotificationMessage {
  type: NotificationMessageType;
  message: string;
}

export const addNotificationAction = (notificationMessage: NewNotificationMessage) => (dispatcher:any) =>  {
  console.log('addNotificationAction');
  const epochtimestamp = getUtcSecondsSinceEpoch();
  const notificationToAdd: NotificationMessage = {
    timestamp: epochtimestamp,
    type: notificationMessage.type,
    header: getNotificationHeader(notificationMessage.type),
    message: notificationMessage.message,
  }
  console.log('addNotificationAction');
  console.log(notificationToAdd);
  dispatcher({
    type: NotificationsReducerActionTypes.ADD_NOTIFICATION,
    payload: notificationToAdd,
  });
}

export const removeNotificationAction = (notificationMessage: NotificationMessage) => (dispatcher:any) =>  {
  dispatcher({
    type: NotificationsReducerActionTypes.REMOVE_NOTIFICATION,
    payload: notificationMessage,
  });
}

export const clearAllNotificationsAction = () => (dispatcher:any) =>  {
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
      return 'ERROR';
    default:
      return "UNEXPECTED VALUE";
  }
} 


export const createAndDispachNewNotification = (dispatcher: any, type: NotificationMessageType, message: string) => {
  const notificationMessage:NewNotificationMessage = {
    type,
    message
  }
  dispatcher(addNotificationAction(notificationMessage));
}