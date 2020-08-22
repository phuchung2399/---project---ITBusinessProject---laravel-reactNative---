import {call, put, takeLatest} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {
  getAllCommentsSuccess,
  getAllCommentsFailure,
  createCommentSuccess,
  createCommentFailure,
  editCommentSuccess,
  editCommentFailure,
} from './action';
import {
  getAllCommentOfStore,
  createComment,
  editComment,
} from '../../api/comment';
import {
  GET_ALL_COMMENT,
  CREATE_COMMENT,
  UPDATE_COMMENT,
} from '../constants/actionTypes';

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
    Alert.alert('Thông báo', message);

    const getComment = yield call(getAllCommentOfStore, data.store_id, token);
    const commentData = getComment.data.data;
    yield put(getAllCommentsSuccess(commentData));
  } catch (error) {
    console.log('Create comment', error);
    yield put({type: createCommentFailure, payload: error});
  }
}

export function* updateCommentSaga({comment_id, data, token}) {
  try {
    const response = yield call(editComment, comment_id, data, token);
    console.log(response);

    const message = response.data.message;
    yield put(editCommentSuccess(message));

    const getComment = yield call(getAllCommentOfStore, data.store_id, token);
    const commentData = getComment.data.data;
    yield put(getAllCommentsSuccess(commentData));
  } catch (error) {
    console.log('Edit comment', error);
    yield put({type: editCommentFailure, payload: error});
  }
}

const commentSagas = () => [
  takeLatest(GET_ALL_COMMENT, getAllCommentSaga),
  takeLatest(CREATE_COMMENT, createCommentSaga),
  takeLatest(UPDATE_COMMENT, updateCommentSaga),
];

export default commentSagas();
