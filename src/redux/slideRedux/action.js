import * as types from '../constants/actionTypes';

export const getAllSlides = token => {
  return {
    type: types.GET_ALL_SLIDE,
    token: token,
  };
};

export const getAllSlidesSuccess = response => {
  return {
    type: types.GET_ALL_SLIDE_SUCCESS,
    payload: response,
  };
};

export const getAllSlicesFailure = error => {
  return {
    type: types.GET_ALL_SERVICES_FAILURE,
    payload: error,
  };
};
