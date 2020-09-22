import callApi from './utils';

//Get all services
export const getAllServices = token => {
  return callApi('/api/v1/services', 'GET', '', token);
};
