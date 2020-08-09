import * as types from '../constants/actionTypes';

const initState = {
  dataNewStores: {},
  dataStoresByStar: {},
  detailStore: {},
  storeServices: {},
  error: {},
  loading: false,
};
const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_NEW_STORE:
      return {
        ...state,
        loading: true,
      };
    case types.GET_NEW_STORE_SUCCESS:
      return {
        ...state,
        dataNewStores: action.payload,
        loading: false,
      };
    case types.GET_NEW_STORE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.GET_STORE_BY_STAR:
      return {
        ...state,
        loading: true,
      };
    case types.GET_STORE_BY_STAR_SUCCESS:
      return {
        ...state,
        dataStoresByStar: action.payload,
        loading: false,
      };
    case types.GET_STORE_BY_STAR_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.GET_STORE_DETAIL:
      return {...state, loading: true};

    case types.GET_STORE_DETAIL_SUCCESS:
      return {...state, detailStore: action.payload, loading: false};

    case types.GET_STORE_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.GET_STORE_SERVICES:
      return {...state, loading: true};

    case types.GET_STORE_SERVICES_SUCCESS:
      return {...state, storeServices: action.payload, loading: false};

    case types.GET_STORE_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default storeReducer;
