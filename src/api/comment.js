import callApi from './utils';

//Get all comment of store
export const getAllCommentOfStore = (store_id, token) => {
  return callApi(`/api/v1/comment-store/${store_id}`, 'GET', '', token);
};

// Add comment from user
export const createComment = (data, token) => {
  return callApi('/api/v1/comment', 'POST', data, token);
};
