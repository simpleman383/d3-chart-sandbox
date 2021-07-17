import { createAction } from "state/utils";
import { generateKey } from "utils/entity";

export const actions = {
  LOADER_SHOW: "[core/layout]:LOADER_SHOW",
  LOADER_HIDE: "[core/layout]:LOADER_HIDE",

  NOTIFICATION_SHOW: "[core/layout]:NOTIFICATION_SHOW",
  NOTIFICATION_REMOVE: "[core/layout]:NOTIFICATION_REMOVE",
  NOTIFICATION_RESET: "[core/layout]:NOTIFICATION_RESET"
};

export const showLoader = (loaderId) => createAction({
  type: actions.LOADER_SHOW,
  payload: {
    loader: { id: loaderId }
  }
});

export const hideLoader = (loaderId) => createAction({
  type: actions.LOADER_HIDE,
  payload: { id: loaderId }
});


export const showNotification = (notificationType, message) => createAction({
  type: actions.NOTIFICATION_SHOW,
  payload: { 
    id: generateKey(),
    type: notificationType, 
    message: message 
  }
});

export const removeNotification = (notificationId) => createAction({
  type: actions.NOTIFICATION_REMOVE,
  payload: { id: notificationId }
});

export const resetNotifications = () => createAction({ type: actions.NOTIFICATION_RESET });