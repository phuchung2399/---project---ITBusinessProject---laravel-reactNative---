import * as types from '../constants/actionTypes';

//Get all orders of users
export const getAllOrders = token => {
  return {
    type: types.GET_ALL_ORDER,
    token: token,
  };
};

export const getAllOrdersSuccess = response => {
  return {
    type: types.GET_ALL_ORDER_SUCCESS,
    payload: response,
  };
};

export const getAllOrdersFailure = error => {
  return {
    type: types.GET_ALL_ORDER_FAILURE,
    payload: error,
  };
};

//Get Order detail
export const getOrderDetail = (order_id, token) => {
  return {
    type: types.GET_ORDER_DETAIL,
    order_id,
    token,
  };
};

export const getOrderDetailSuccess = response => {
  return {
    type: types.GET_ORDER_DETAIL_SUCCESS,
    payload: response,
  };
};

export const getOrderDetailFailure = error => {
  return {
    type: types.GET_ORDER_DETAIL_FAILURE,
    payload: error,
  };
};

//Create order
export const createOrder = (data, token) => {
  return {
    type: types.CREATE_ORDER,
    data,
    token,
  };
};

export const createOrderSuccess = response => {
  return {
    type: types.CREATE_ORDER_SUCCESS,
    payload: response,
  };
};

export const createOrderFailure = error => {
  return {
    type: types.CREATE_ORDER_FAILURE,
    payload: error,
  };
};
