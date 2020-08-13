import {all} from 'redux-saga/effects';
import userSagas from './userRedux/saga';
import storeSagas from './storeRedux/saga';
import servicesSagas from './serviceRedux/saga';
import slidesSagas from './slideRedux/saga';
import commentSagas from './commentRedux/saga';

function* rootSagas() {
  yield all([
    ...userSagas,
    ...storeSagas,
    ...servicesSagas,
    ...slidesSagas,
    ...commentSagas,
  ]);
}

export default rootSagas;
