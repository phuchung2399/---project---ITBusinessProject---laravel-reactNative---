import {call, takeLatest} from 'redux-saga//effects';
import {LOGOUT_SUCCESS} from '../constants/actionTypes';
import {logout} from '../../api/user';
import {onSignIn} from '../../navigation';
import {Alert} from 'react-native';

export function* logOutSaga({token}) {
  try {
    const response = yield call(logout, token);
    Alert.alert('Thông báo', response.data.message);
    onSignIn();
  } catch (error) {
    console.log('errorLogout', error);
  }
}

const userSagas = () => [takeLatest(LOGOUT_SUCCESS, logOutSaga)];

export default userSagas();
