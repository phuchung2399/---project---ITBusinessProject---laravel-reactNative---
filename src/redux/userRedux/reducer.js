import * as types from '../constants/actionTypes';

const initialState = {
  data: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGOUT_SUCCESS:
      return {...initialState};

    default:
      return state;
  }
};
export default userReducer;
