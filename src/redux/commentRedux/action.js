import * as types from '../constants/actionTypes';

export const getAllComments = (storeId, token) => {
  return {
    type: types.GET_ALL_COMMENT,
    storeId,
    token,
  };
};

export const getAllCommentsSuccess = response => {
  return {
    type: types.GET_ALL_COMMENT_SUCCESS,
    payload: response,
  };
};

export const getAllCommentsFailure = error => {
  return {
    type: types.GET_ALL_COMMENT_FAILURE,
    payload: error,
  };
};
