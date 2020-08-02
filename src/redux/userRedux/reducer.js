import * as types from '../constants/actionTypes';

const initialState = {
  data: {},
  error: '',
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.ADD_USER:
    //   return {...state, loading: true};

    // case types.ADD_USER_SUCCESS:
    //   return {...state, data: action.payload, loading: false};

    // case types.ADD_USER_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };

    case types.LOG_IN:
      return {...state, loading: true};

    case types.LOGIN_SUCCESS:
      return {...state, data: action.payload, loading: false};

    case types.LOGIN_FAILURE:
      return {...state, error: action.payload, loading: false};

    case types.LOGOUT_SUCCESS:
      return {...initialState};

    // case types.GET_BEST_USERS:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case types.GET_BEST_USERS_SUCCESS:
    //   return {
    //     ...state,
    //     bestUsers: action.payload,
    //     loading: false,
    //   };
    // case types.GET_BEST_USERS_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };

    default:
      return state;
  }
};
export default userReducer;
