import * as types from '../constants/actionTypes';

// Get all comment of stores
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

// Create comment
export const createComment = (data, token) => {
  return {
    type: types.CREATE_COMMENT,
    data,
    token,
  };
};

export const createCommentSuccess = data => {
  return {
    type: types.CREATE_COMMENT_SUCCESS,
    payload: data,
  };
};

export const createCommentFailure = error => {
  return {
    type: types.CREATE_COMMENT_FAILURE,
    payload: error,
  };
};

// Edit comment
export const editComment = (comment_id, data, token) => {
  return {
    type: types.UPDATE_COMMENT,
    comment_id,
    data,
    token,
  };
};

export const editCommentSuccess = data => {
  return {
    type: types.UPDATE_COMMENT_SUCCESS,
    payload: data,
  };
};

export const editCommentFailure = error => {
  return {
    type: types.UPDATE_COMMENT_FAILURE,
    payload: error,
  };
};
