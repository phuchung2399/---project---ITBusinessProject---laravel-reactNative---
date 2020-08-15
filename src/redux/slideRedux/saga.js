import {call, put, takeLatest} from 'redux-saga/effects';
import {getAllSlidesSuccess, getAllSlicesFailure} from './action';
import {getAllSlide} from '../../api/slide';
import {GET_ALL_SLIDE} from '../constants/actionTypes';

export function* getAllSlicesSaga({token}) {
  try {
    const response = yield call(getAllSlide, token);
    const dataSlices = response.data.data;
    // console.log('dataSlices ', dataSlices);
    yield put(getAllSlidesSuccess(dataSlices));
  } catch (error) {
    console.log(error);
    yield put({type: getAllSlicesFailure, payload: error});
  }
}

const slicesSagas = () => [takeLatest(GET_ALL_SLIDE, getAllSlicesSaga)];
export default slicesSagas();
