import {call, put, takeLatest} from 'redux-saga/effects';
import {searchStoreSuccess, searchStoreFailure} from './action';
import {searchStores} from '../../api/search';
import {SEARCH_STORE} from '../constants/actionTypes';

export function* searchStoreSaga({key, token}) {
  try {
    const response = yield call(searchStores, key, token);
    const storeServicesData = response.data.data;
    yield put(searchStoreSuccess(storeServicesData));
  } catch (error) {
    console.log('searchStoreSaga', error);
    yield put({type: searchStoreFailure, payload: error});
  }
}

const storeSagas = () => [
  takeLatest(SEARCH_STORE, searchStoreSaga),
  // takeLatest(GET_STORE_SERVICES, getStoreServicesSaga),
];
export default storeSagas();
