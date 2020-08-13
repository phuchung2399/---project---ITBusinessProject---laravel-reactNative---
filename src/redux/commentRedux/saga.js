import {call, put, takeLatest} from 'redux-saga/effects';
import {getAllCommentsSuccess, getAllCommentsFailure} from './action';
import {getAllCommentOfStore} from '../../api/comment';
import {GET_ALL_COMMENT} from '../constants/actionTypes';

export function* getAllCommentSaga({storeId, token}) {
  try {
    const response = yield call(getAllCommentOfStore, storeId, token);
    const commentData = response.data.data;
    yield put(getAllCommentsSuccess(commentData));
  } catch (error) {
    console.log(error);
    yield put({type: getAllCommentsFailure, payload: error});
  }
}

const commentSagas = () => [takeLatest(GET_ALL_COMMENT, getAllCommentSaga)];
export default commentSagas();
