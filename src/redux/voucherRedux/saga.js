import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getAllVouchersSuccess,
  getAllVouchersFailure,
  applyVoucherSuccess,
  applyVoucherFailure,
} from './action';
import {getAllVouchers, totalApplyVouchers} from '../../api/voucher';
import {GET_ALL_VOUCHERS, APPLY_VOUCHER} from '../constants/actionTypes';

export function* getAllVouchersSaga({token}) {
  try {
    const response = yield call(getAllVouchers, token);
    const vouchersData = response.data.data;
    yield put(getAllVouchersSuccess(vouchersData));
  } catch (error) {
    console.log('getStoresByStarSaga', error);
    yield put({type: getAllVouchersFailure, payload: error});
  }
}

export function* totalApplyVouchersSaga({data, token}) {
  try {
    const response = yield call(
      totalApplyVouchers,
      data.voucher_name,
      data.total,
      token,
    );
    const reducePrice = response.data.data;
    console.log(reducePrice);
    yield put(applyVoucherSuccess(reducePrice));
  } catch (error) {
    console.log('applyVoucherSaga', error);
    yield put({type: applyVoucherFailure, payload: error});
  }
}

const voucherSagas = () => [
  takeLatest(GET_ALL_VOUCHERS, getAllVouchersSaga),
  takeLatest(APPLY_VOUCHER, totalApplyVouchersSaga),
];
export default voucherSagas();
