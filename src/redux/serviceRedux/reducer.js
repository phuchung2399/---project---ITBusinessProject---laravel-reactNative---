import * as types from '../constants/actionTypes';

const initState = {
  services: {},
  error: {},
  loading: false,
};
const servicesReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ALL_SERVICES:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
        loading: false,
      };
    case types.GET_ALL_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default servicesReducer;
