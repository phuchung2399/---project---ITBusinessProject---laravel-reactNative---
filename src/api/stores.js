import callApi from './utils';

//Get new stores
export const getNewStore = token => {
  return callApi('/api/v1/store/store-new-home', 'GET', '', token);
};

//Get store by star
export const getStoreByStar = token => {
  return callApi('/api/v1/store/store-sort-star-home', 'GET', '', token);
};

//Get store detail
export const getStoreDetail = (store_id, token) => {
  return callApi(`/api/v1/store/store-detail/${store_id}`, 'GET', '', token);
};

//Get store's servives
export const getStoreServices = (store_id, token) => {
  return callApi(`/api/v1/service-store/${store_id}`, 'GET', '', token);
};

//Get all stores
export const getAllStores = token => {
  return callApi('/api/v1/store/store-all', 'GET', '', token);
};

//Search store by star
export const searchStoresByStar = (star, token) => {
  return callApi('/api/v1/store/store-search-star', 'POST', star, token);
};
