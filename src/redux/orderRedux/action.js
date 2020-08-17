import * as types from '../constants/actionTypes';
import store from '../store';
import _ from 'lodash';

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

// Cancel order
export const cancelOrder = (order_id, token) => {
  return {
    type: types.CANCEL_ORDER,
    order_id,
    token,
  };
};

export const cancelOrderSuccess = response => {
  return {
    type: types.CANCEL_ORDER_SUCCESS,
    payload: response,
  };
};

export const cancelOrderFailure = error => {
  return {
    type: types.CANCEL_ORDER_FAILURE,
    payload: error,
  };
};

export const addCart = newCart => {
  const cartItems = store.getState().orders.cartItems;
  return {
    type: types.ADD_CART,
    payload: [...cartItems, newCart],
  };
};

export const addStoreId = store_id => {
  return {
    type: types.ADD_STORE_ID,
    payload: store_id,
  };
};

export const deleteCart = id => {
  const cartItems = store.getState().orders.cartItems;
  const newArr = _.filter(cartItems, item => item.service_id !== id);
  return {
    type: types.DELETE_CART,
    payload: newArr,
  };
};
