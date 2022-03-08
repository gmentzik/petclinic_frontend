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

export const anotherReducer = (state: NotificationsState = createDefaultState(), action: any): NotificationsState => {
  switch (action.type) {
    default:
      return state;
  }
};


