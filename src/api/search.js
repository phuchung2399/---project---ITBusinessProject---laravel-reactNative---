import callApi from './utils';

// Search store
export const searchStores = (key, token) => {
  return callApi(`/api/v1/store/store-search?key=${key}`, 'POST', '', token);
};
