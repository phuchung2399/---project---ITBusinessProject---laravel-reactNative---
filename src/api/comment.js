import callApi from './utils';

//Get all comment of store
export const getAllCommentOfStore = (store_id, token) => {
  return callApi(`/api/v1/comment-store/${store_id}`, 'GET', '', token);
};

// Add comment from user
export const createComment = (data, token) => {
  return callApi('/api/v1/comment', 'POST', data, token);
};

// Edit comment from user
export const editComment = (comment_id, data, token) => {
  return callApi(`/api/v1/comment/${comment_id}`, 'PUT', data, token);
};
