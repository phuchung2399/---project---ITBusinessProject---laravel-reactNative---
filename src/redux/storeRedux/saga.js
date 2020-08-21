import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getNewStoreSuccess,
  getNewStoreFailure,
  getStoreByStarSuccess,
  getStoreByStarFailure,
  getStoreDetailSuccess,
  getStoreServicesSuccess,
  getStoreDetailFailure,
  getStoreServicesFailure,
  getAllStoresSuccess,
  getAllStoresFailure,
} from './action';
import {
  getNewStore,
  getStoreByStar,
  getStoreDetail,
  getStoreServices,
  getAllStores,
} from '../../api/stores';
import {
  GET_NEW_STORE,
  GET_STORE_BY_STAR,
  GET_STORE_DETAIL,
  GET_STORE_SERVICES,
  GET_ALL_STORE,
} from '../constants/actionTypes';

export function* getNewStoresSaga({token}) {
  try {
    const response = yield call(getNewStore, token);
    const newStoresData = response.data.data;
    yield put(getNewStoreSuccess(newStoresData));
  } catch (error) {
    console.log('getNewStoresSaga', error);
    yield put({type: getNewStoreFailure, payload: error});
  }
}

export function* getStoresByStarSaga({token}) {
  try {
    const response = yield call(getStoreByStar, token);
    const storesDataByStar = response.data.data;
    yield put(getStoreByStarSuccess(storesDataByStar));
  } catch (error) {
    console.log('getStoresByStarSaga', error);
    yield put({type: getStoreByStarFailure, payload: error});
  }
}

export function* getStoreDetailSaga({storeId, token}) {
  try {
    const response = yield call(getStoreDetail, storeId, token);
    const storeDetailData = response.data.data;
    yield put(getStoreDetailSuccess(storeDetailData));
  } catch (error) {
    console.log('getStoreDetailSaga', error);
    yield put({type: getStoreDetailFailure, payload: error});
  }
}

export function* getStoreServicesSaga({storeId, token}) {
  try {
    const response = yield call(getStoreServices, storeId, token);
    const storeServicesData = response.data.data;
    yield put(getStoreServicesSuccess(storeServicesData));
  } catch (error) {
    console.log('getStoreServicesSaga', error);
    yield put({type: getStoreServicesFailure, payload: error});
  }
}

export function* getAllStoresSaga({token}) {
  try {
    const response = yield call(getAllStores, token);
    const storeServicesData = response.data.data;
    yield put(getAllStoresSuccess(storeServicesData));
  } catch (error) {
    console.log('getAllStoresSaga', error);
    yield put({type: getAllStoresFailure, payload: error});
  }
}

const storeSagas = () => [
  takeLatest(GET_NEW_STORE, getNewStoresSaga),
  takeLatest(GET_STORE_BY_STAR, getStoresByStarSaga),
  takeLatest(GET_STORE_DETAIL, getStoreDetailSaga),
  takeLatest(GET_STORE_SERVICES, getStoreServicesSaga),
  takeLatest(GET_ALL_STORE, getAllStoresSaga),
];
export default storeSagas();
