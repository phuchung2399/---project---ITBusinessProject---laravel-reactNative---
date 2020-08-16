import {call, put, takeLatest} from 'redux-saga//effects';
import {
  logInSuccess,
  logInFailure,
  addUserSuccess,
  addUserFailure,
} from './action';
import {ADD_USER, LOG_IN, LOGOUT_SUCCESS} from '../constants/actionTypes';
import {login, logout, register} from '../../api/user';
import {onChangeIntoMainScreen, onSignIn} from '../../navigation';
import {AsyncStorage} from 'react-native';
import {storageSet} from '../../checkAsyncStorage';

export function* registerSaga(action) {
  try {
    const response = yield call(register, action.data);
    console.log('user data:', response);
    // yield put(addUserSuccess(data));
    // AsyncStorage.setItem('user', JSON.stringify(data));
    // onChangeIntoMainScreen();
  } catch (error) {
    yield put(addUserFailure({error}));
  }
}

export function* loginSaga({data}) {
  try {
    const response = yield call(login, data);
    const getData = response.data;
    if (getData.message) {
      yield put(logInFailure(getData.message));
    } else {
      try {
        storageSet('user', JSON.stringify(getData));
      } catch (e) {
        console.log('Login failed', e);
      }
      // AsyncStorage.setItem('user', JSON.stringify(getData));
      yield put(logInSuccess(getData));
      onChangeIntoMainScreen();
    }
  } catch (error) {
    yield put(logInFailure(error));
  }
}

export function* logOutSaga({token}) {
  try {
    const response = yield call(logout, token);
    alert(response.data.message);
    onSignIn();
    // AsyncStorage.clear();
  } catch (error) {
    console.log('errorLogout', error.toJSON());
  }
}

const userSagas = () => [
  takeLatest(ADD_USER, registerSaga),
  takeLatest(LOG_IN, loginSaga),
  takeLatest(LOGOUT_SUCCESS, logOutSaga),
  // takeLatest(GET_BEST_USERS, getBestUsersSaga),
];

export default userSagas();
