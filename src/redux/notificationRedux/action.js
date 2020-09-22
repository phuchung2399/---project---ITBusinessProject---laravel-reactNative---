import * as types from '../constants/actionTypes';

export const getNotificationOfUser = token => {
  return {
    type: types.GET_NOTIFICATION,
    token: token,
  };
};

export const getNotificationOfUserSuccess = response => {
  return {
    type: types.GET_NOTIFICATION_SUCCESS,
    payload: response,
  };
};

export const getNotificationOfUserFailure = error => {
  return {
    type: types.GET_NOTIFICATION_FAILURE,
    payload: error,
  };
};
