import callApi from './utils';

//Get store by star
export const getNotification = token => {
  return callApi('/api/v1/notification/user', 'GET', '', token);
};
