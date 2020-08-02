import {all} from 'redux-saga/effects';
import userSagas from './userRedux/saga';
import storeSagas from './storeRedux/saga';

function* rootSagas() {
  yield all([
    ...userSagas,
    ...storeSagas,
    // ...bookSagas,
    // ...commentSagas,
    // ...relatedBookSagas,
    // ...cardSaga,
    // ...notificationSaga,
  ]);
}

export default rootSagas;
