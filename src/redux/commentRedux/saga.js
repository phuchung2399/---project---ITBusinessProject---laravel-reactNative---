import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getAllCommentsSuccess,
  getAllCommentsFailure,
  createCommentSuccess,
  createCommentFailure,
} from './action';
import {getAllCommentOfStore, createComment} from '../../api/comment';
import {GET_ALL_COMMENT, CREATE_COMMENT} from '../constants/actionTypes';

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

export function* createCommentSaga({data, token}) {
  try {
    const response = yield call(createComment, data, token);
    const message = response.data.message;
    // console.log(commentData);
    yield put(createCommentSuccess(message));
    alert('Bình luận thành công');

    const getComment = yield call(getAllCommentOfStore, data.store_id, token);
    const commentData = getComment.data.data;
    yield put(getAllCommentsSuccess(commentData));
  } catch (error) {
    console.log('Create comment', error);
    yield put({type: createCommentFailure, payload: error});
  }
}

const commentSagas = () => [
  takeLatest(GET_ALL_COMMENT, getAllCommentSaga),
  takeLatest(CREATE_COMMENT, createCommentSaga),
];

export default commentSagas();
