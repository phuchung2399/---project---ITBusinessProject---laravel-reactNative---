import callApi from './utils';

//Create order - booking service
export const createOrder = (data, token) => {
  return callApi('/api/v1/order', 'POST', data, token);
};

//Get all order of user
