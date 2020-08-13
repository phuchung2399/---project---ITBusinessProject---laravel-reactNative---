import callApi from './utils';

//Get all comment of store
export const getAllCommentOfStore = (store_id, token) => {
  return callApi(`/api/v1/comment-store/${store_id}`, 'GET', '', token);
};
