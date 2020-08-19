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

export const applyVoucher = (data, token) => {
  return {
    type: types.APPLY_VOUCHER,
    data,
    token,
  };
};

export const applyVoucherSuccess = response => {
  return {
    type: types.APPLY_VOUCHER_SUCCESS,
    payload: response,
  };
};

export const applyVoucherFailure = error => {
  return {
    type: types.APPLY_VOUCHER_FAILURE,
    payload: error,
  };
};
