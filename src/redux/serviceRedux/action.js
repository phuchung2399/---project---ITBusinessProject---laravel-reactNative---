import * as types from '../constants/actionTypes';

export const getAllServices = token => {
  return {
    type: types.GET_ALL_SERVICES,
    token: token,
  };
};

export const getAllServicesSuccess = response => {
  return {
    type: types.GET_ALL_SERVICES_SUCCESS,
    payload: response,
  };
};

export const getAllServicesFailure = error => {
  return {
    type: types.GET_ALL_SERVICES_FAILURE,
    payload: error,
  };
};
