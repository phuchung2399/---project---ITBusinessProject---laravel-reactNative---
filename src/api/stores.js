import callApi from './utils';

export const getNewStore = token => {
  return callApi('/api/v1/store/store-new-home', 'GET', '', token);
};

export const getStoreByStar = token => {
  return callApi('/api/v1/store/store-sort-star-home', 'GET', '', token);
};

export const getStoreDetail = store_id => {
  return callApi(`/api/v1/service-store/${store_id}`, 'GET');
};
