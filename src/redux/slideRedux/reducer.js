import * as types from '../constants/actionTypes';

const initState = {
  slides: {},
  error: {},
  loading: false,
};
const slidesReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ALL_SLIDE:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_SLIDE_SUCCESS:
      return {
        ...state,
        slides: action.payload,
        loading: false,
      };
    case types.GET_ALL_SLIDE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default slidesReducer;
