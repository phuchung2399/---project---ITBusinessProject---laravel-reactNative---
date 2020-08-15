import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getAllOrdersSuccess,
  getAllOrdersFailure,
  getOrderDetailSuccess,
  getOrderDetailFailure,
} from './action';
import {getOrdersOfUser, getOrderDetail} from '../../api/order';
import {GET_ALL_ORDER, GET_ORDER_DETAIL} from '../constants/actionTypes';

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

const orderSagas = () => [
  takeLatest(GET_ALL_ORDER, getAllOrdersSaga),
  takeLatest(GET_ORDER_DETAIL, getOrderDetailSaga),
  // takeLatest(GET_STORE_DETAIL, getStoreDetailSaga),
  // takeLatest(GET_STORE_SERVICES, getStoreServicesSaga),
];
export default orderSagas();
