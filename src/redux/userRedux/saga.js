import {call, put, takeLatest} from 'redux-saga//effects';
import { logInSuccess, logInFailure } from './action';
import { ADD_USER, LOG_IN, LOGOUT_SUCCESS } from '../constants/actionTypes';
import { login, logout } from '../../api/user';
import {onChangeIntoMainScreen, onSignIn} from '../../navigation';
import {AsyncStorage} from 'react-native';

// export function* registerSaga(action) {
//   try {
//     const response = yield call(register, action.data);
//     const data = response.data;
//     console.log('user data:', data);
//     yield put(addUserSuccess(data));
//     AsyncStorage.setItem('user', JSON.stringify(data));
//     onChangeIntoMainScreen();
//   } catch (error) {
//     yield put(addUserFailure({error}));
//   }
// }

export function* loginSaga({ data }) {
  try {
    const response = yield call(login, data);
    const userData = response.data;
    AsyncStorage.setItem('user', JSON.stringify(userData));
    yield put(logInSuccess(userData));
    onChangeIntoMainScreen();
  } catch (error) {
    console.log('error', error.toJSON());
    yield put(logInFailure(error));
  }
}

export function* logOutSaga({ token }) {
  try {
    const response = yield call(logout, token);
    alert(response.data.message);
    // onSignIn();
    AsyncStorage.clear();
  } catch (error) {
    console.log('error', error.toJSON());
  }
}

// export function* getBestUsersSaga() {
//   try {
//     const response = yield call(getBestUsers);
//     const bestUsersData = response.data.Data;
//     yield put(getBestUsersSuccess(bestUsersData));
//   } catch (error) {
//     yield put(getBestUsersFailure(error));
//   }
// }

const userSagas = () => [
  // takeLatest(ADD_USER, registerSaga),
  takeLatest(LOG_IN, loginSaga),
  takeLatest(LOGOUT_SUCCESS, logOutSaga),
  // takeLatest(GET_BEST_USERS, getBestUsersSaga),
];

export default userSagas();