import * as types from '../constants/actionTypes';

const initState = {
  dataComments: {},
  messageSuccess: [],
  messageEditCommentSuccess: [],
  error: {},
  loading: false,
};
const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ALL_COMMENT:
      return {...state, loading: true};

    case types.GET_ALL_COMMENT_SUCCESS:
      return {...state, dataComments: action.payload, loading: false};

    case types.GET_ALL_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.CREATE_COMMENT:
      return {...state, loading: true};

    case types.CREATE_COMMENT_SUCCESS:
      return {...state, messageSuccess: action.payload, loading: false};

    case types.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.UPDATE_COMMENT:
      return {...state, loading: true};

    case types.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        messageEditCommentSuccess: action.payload,
        loading: false,
      };

    case types.UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default commentReducer;
