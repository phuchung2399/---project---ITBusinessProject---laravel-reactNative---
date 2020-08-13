import {call, put, takeLatest} from 'redux-saga/effects';
import {getAllServicesSuccess, getAllServicesFailure} from './action';
import {getAllServices} from '../../api/services';
import {GET_ALL_SERVICES} from '../constants/actionTypes';

export function* getAllServicesSaga({token}) {
  try {
    const response = yield call(getAllServices, token);
    const dataServices = response.data.data;
    yield put(getAllServicesSuccess(dataServices));
  } catch (error) {
    console.log(error);
    yield put({type: getAllServicesFailure, payload: error});
  }
}

const servicesSagas = () => [takeLatest(GET_ALL_SERVICES, getAllServicesSaga)];
export default servicesSagas();
