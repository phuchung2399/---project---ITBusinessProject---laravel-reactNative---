import {all} from 'redux-saga/effects';
import userSagas from './userRedux/saga';
import relatedStoreSaga from './relatedBooksRedux/saga';
import orderSaga from './cardRedux/saga';

function* rootSagas() {
  yield all([...userSagas, ...relatedStoreSaga, ...orderSaga]);
}

export default rootSagas;
