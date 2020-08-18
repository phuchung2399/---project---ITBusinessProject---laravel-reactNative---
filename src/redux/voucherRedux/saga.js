import {call, put, takeLatest} from 'redux-saga/effects';
import {getAllVouchersSuccess, getAllVouchersFailure} from './action';
import {getAllVouchers} from '../../api/voucher';
import {GET_ALL_VOUCHERS} from '../constants/actionTypes';

export function* getAllVouchersSaga({token}) {
  try {
    const response = yield call(getAllVouchers, token);
    const vouchersData = response.data.data;
    console.log(vouchersData);
    yield put(getAllVouchersSuccess(vouchersData));
  } catch (error) {
    console.log('getStoresByStarSaga', error);
    yield put({type: getAllVouchersFailure, payload: error});
  }
}

const voucherSagas = () => [
  takeLatest(GET_ALL_VOUCHERS, getAllVouchersSaga),
  // takeLatest(GET_STORE_BY_STAR, getStoresByStarSaga),
];
export default voucherSagas();
