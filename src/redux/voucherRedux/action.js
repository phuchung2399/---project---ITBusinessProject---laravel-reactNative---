import * as types from '../constants/actionTypes';

export const getAllVouchers = token => {
  return {
    type: types.GET_ALL_VOUCHERS,
    token: token,
  };
};

export const getAllVouchersSuccess = response => {
  return {
    type: types.GET_ALL_VOUCHERS_SUCCESS,
    payload: response,
  };
};

export const getAllVouchersFailure = error => {
  return {
    type: types.GET_ALL_SERVICES_FAILURE,
    payload: error,
  };
};
