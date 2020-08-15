import callApi from './utils';

//Create order - booking service
export const createOrder = (data, token) => {
  return callApi('/api/v1/order', 'POST', data, token);
};

//Get all order of user
export const getOrdersOfUser = token => {
  return callApi('/api/v1/order-user', 'GET', '', token);
};

//Get order detail
export const getOrderDetail = (order_id, token) => {
  return callApi(`/api/v1/order-detail/${order_id}`, 'GET', '', token);
};
