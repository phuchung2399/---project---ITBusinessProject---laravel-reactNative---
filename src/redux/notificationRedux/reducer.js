import * as types from '../constants/actionTypes';

const initState = {
  dataNotification: [],
  error: {},
  loading: false,
};
const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATION:
      return {
        ...state,
        loading: true,
      };
    case types.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        dataNotification: action.payload,
        loading: false,
      };
    case types.GET_NOTIFICATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default notificationReducer;
