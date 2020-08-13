import callApi from './utils';

//Get all services
export const getAllServices = token => {
  console.log(token);
  return callApi('/api/v1/services', 'GET', '', token);
};
