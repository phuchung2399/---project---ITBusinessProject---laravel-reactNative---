import {all} from 'redux-saga/effects';
import userSagas from './userRedux/saga';

function* rootSagas() {
  yield all([
    ...userSagas,
    // ...bookSagas,
    // ...commentSagas,
    // ...relatedBookSagas,
    // ...cardSaga,
    // ...notificationSaga,
  ]);
}

export default rootSagas;
