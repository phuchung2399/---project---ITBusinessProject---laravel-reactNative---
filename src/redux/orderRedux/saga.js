import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getAllOrdersSuccess,
  getAllOrdersFailure,
  getOrderDetailSuccess,
  getOrderDetailFailure,
  createOrderSuccess,
  createOrderFailure,
  cancelOrderSuccess,
  cancelOrderFailure,
} from './action';
import {
  getOrdersOfUser,
  getOrderDetail,
  createOrder,
  cancelOrder,
} from '../../api/order';
import {
  GET_ALL_ORDER,
  GET_ORDER_DETAIL,
  CREATE_ORDER,
  CANCEL_ORDER,
} from '../constants/actionTypes';

export function* getAllOrdersSaga({token}) {
  try {
    const response = yield call(getOrdersOfUser, token);
    const ordersData = response.data.data;
    yield put(getAllOrdersSuccess(ordersData));
  } catch (error) {
    console.log('getOrdersSaga', error);
    yield put({type: getAllOrdersFailure, payload: error});
  }
}

export function* getOrderDetailSaga({order_id, token}) {
  try {
    const response = yield call(getOrderDetail, order_id, token);
    const orderDetailData = response.data.data;
    yield put(getOrderDetailSuccess(orderDetailData));
  } catch (error) {
    console.log('getOrderDetailSaga', error);
    yield put({type: getOrderDetailFailure, payload: error});
  }
}

export function* createOrderSaga({data, token}) {
  try {
    const response = yield call(createOrder, JSON.stringify(data), token);
    const messageCreateSuccess = response.data.message;
    // alert(messageCreateSuccess);

    console.log(response);
    // console.log('messageCreateSuccess, ', messageCreateSuccess);
    yield put(createOrderSuccess(messageCreateSuccess));

    const reGetOrders = yield call(getOrdersOfUser, token);
    const ordersData = reGetOrders.data.data;
    yield put(getAllOrdersSuccess(ordersData));
  } catch (error) {
    console.log('createOrderSaga', error);
    yield put({type: createOrderFailure, payload: error});
  }
}

export function* cancelOrderSaga({order_id, token}) {
  try {
    const response = yield call(cancelOrder, order_id, token);
    const message = response.data.status.massage;
    alert('Đơn hàng đã được huỷ');
    yield put(cancelOrderSuccess(message));

    const regetAllOrder = yield call(getOrdersOfUser, token);
    const ordersData = regetAllOrder.data.data;
    yield put(getAllOrdersSuccess(ordersData));

    const reGetOrderDetail = yield call(getOrderDetail, order_id, token);
    const orderDetailData = reGetOrderDetail.data.data;
    yield put(getOrderDetailSuccess(orderDetailData));
  } catch (error) {
    console.log('cancelOrderSaga', error);
    yield put({type: cancelOrderFailure, payload: error});
  }
}

const orderSagas = () => [
  takeLatest(GET_ALL_ORDER, getAllOrdersSaga),
  takeLatest(GET_ORDER_DETAIL, getOrderDetailSaga),
  takeLatest(CREATE_ORDER, createOrderSaga),
  takeLatest(CANCEL_ORDER, cancelOrderSaga),
];
export default orderSagas();
