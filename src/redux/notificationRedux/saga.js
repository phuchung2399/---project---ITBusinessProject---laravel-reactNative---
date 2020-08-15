import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getNotificationOfUserSuccess,
  getNotificationOfUserFailure,
} from './action';
import {getNotification} from '../../api/notification';
import {GET_NOTIFICATION} from '../constants/actionTypes';

export function* getNotificationsSaga({token}) {
  try {
    const response = yield call(getNotification, token);
    const newData = response.data.data;
    console.log(newData);
    yield put(getNotificationOfUserSuccess(newData));
  } catch (error) {
    console.log('getNotificationOfUserFailure', error);
  }
}

const storeSagas = () => [
  takeLatest(GET_NOTIFICATION, getNotificationsSaga),
  // takeLatest(GET_STORE_BY_STAR, getStoresByStarSaga),
];
export default storeSagas();
