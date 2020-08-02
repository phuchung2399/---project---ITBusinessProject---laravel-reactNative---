import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getNewStoreSuccess,
  getNewStoreFailure,
  getStoreByStarSuccess,
  getStoreByStarFailure,
} from './action';
import {getNewStore, getStoreByStar} from '../../api/stores';
import {GET_NEW_STORE, GET_STORE_BY_STAR} from '../constants/actionTypes';

export function* getNewStoresSaga({token}) {
  try {
    const response = yield call(getNewStore, token);
    const newStoresData = response.data.data;
    yield put(getNewStoreSuccess(newStoresData));
  } catch (error) {
    console.log(error);
    yield put({type: getNewStoreFailure, payload: error});
  }
}

export function* getStoresByStarSaga({token}) {
  try {
    const response = yield call(getStoreByStar, token);
    const storesDataByStar = response.data.data;
    yield put(getStoreByStarSuccess(storesDataByStar));
  } catch (error) {
    console.log(error);
    yield put({type: getStoreByStarFailure, payload: error});
  }
}

// export function* getBookDetailSaga({idBook}) {
//   try {
//     const response = yield call(getBookDetail, idBook);
//     const bookDetailData = response.data;
//     // console.log('bookDetailData', bookDetailData);
//     yield put(getBookDetailSuccess(bookDetailData));
//   } catch (error) {}
// }

const storeSagas = () => [
  takeLatest(GET_NEW_STORE, getNewStoresSaga),
  takeLatest(GET_STORE_BY_STAR, getStoresByStarSaga),
];
export default storeSagas();
