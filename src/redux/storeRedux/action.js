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

export const getStoreDetail = (storeId, token) => {
  return {
    type: types.GET_STORE_DETAIL,
    storeId,
    token,
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

export const getStoreServices = (storeId, token) => {
  return {
    type: types.GET_STORE_SERVICES,
    storeId,
    token,
  };
};

export const getStoreServicesSuccess = response => {
  return {
    type: types.GET_STORE_SERVICES_SUCCESS,
    payload: response,
  };
};

export const getStoreServicesFailure = error => {
  return {
    type: types.GET_STORE_SERVICES_FAILURE,
    payload: error,
  };
};

export const getAllStores = token => {
  return {
    type: types.GET_ALL_STORE,
    token,
  };
};

export const getAllStoresSuccess = response => {
  return {
    type: types.GET_ALL_STORE_SUCCESS,
    payload: response,
  };
};

export const getAllStoresFailure = error => {
  return {
    type: types.GET_ALL_STORE_FAILURE,
    payload: error,
  };
};
