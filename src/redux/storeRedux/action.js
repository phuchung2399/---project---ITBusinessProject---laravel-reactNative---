import * as types from '../constants/actionTypes';

export const getNewStore = token => {
  return {
    type: types.GET_NEW_STORE,
    token: token,
  };
};

export const getNewStoreSuccess = response => {
  return {
    type: types.GET_NEW_STORE_SUCCESS,
    payload: response,
  };
};

export const getNewStoreFailure = error => {
  return {
    type: types.GET_NEW_STORE_FAILURE,
    payload: error,
  };
};

export const getStoreByStar = token => {
  return {
    type: types.GET_STORE_BY_STAR,
    token: token,
  };
};

export const getStoreByStarSuccess = response => {
  return {
    type: types.GET_STORE_BY_STAR_SUCCESS,
    payload: response,
  };
};

export const getStoreByStarFailure = error => {
  return {
    type: types.GET_STORE_BY_STAR_FAILURE,
    payload: error,
  };
};

export const getStoreDetail = idBook => {
  return {
    type: types.GET_STORE_DETAIL,
    idBook,
  };
};

export const getStoreDetailSuccess = response => {
  return {
    type: types.GET_STORE_DETAIL_SUCCESS,
    payload: response,
  };
};

export const getStoreDetailFailure = error => {
  return {
    type: types.GET_STORE_DETAIL_FAILURE,
    payload: error,
  };
};
