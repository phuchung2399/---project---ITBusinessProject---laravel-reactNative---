import * as types from '../constants/actionTypes';

export const logOut = token => {
  return {
    type: types.LOGOUT_SUCCESS,
    token: token,
  };
};
