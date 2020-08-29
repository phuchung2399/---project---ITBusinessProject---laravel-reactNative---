import * as types from '../constants/actionTypes';
import store from '../store';
import _ from 'lodash';

export const searchStore = (key, token) => {
  return {
    type: types.SEARCH_STORE,
    key,
    token,
  };
};

export const searchStoreSuccess = response => {
  return {
    type: types.SEARCH_STORE_SUCCESS,
    payload: response,
  };
};

export const searchStoreFailure = error => {
  return {
    type: types.SEARCH_STORE_FAILURE,
    payload: error,
  };
};

export const addKey = key => {
  const keys = store.getState().searchDatas.recentSearchData;
  return {
    type: types.ADD_KEY,
    payload: [key, ...keys],
  };
};

export const deleteKey = key => {
  const keys = store.getState().searchDatas.recentSearchData;
  const newArr = _.filter(keys, item => item.key !== key);
  return {
    type: types.DELETE_KEY,
    payload: newArr,
  };
};
