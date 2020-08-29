import * as types from '../constants/actionTypes';

const initState = {
  dataStoresSearch: {},
  error: {},
  loading: false,
  recentSearchData: [
    {
      key: 'Mai Nail Store',
    },
    {
      key: 'Tuấn Tảo Spa',
    },
    {
      key: 'Spa Phương Nam',
    },
    {
      key: 'HP Nail',
    },
  ],
};

const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SEARCH_STORE:
      return {
        ...state,
        loading: true,
      };
    case types.SEARCH_STORE_SUCCESS:
      return {
        ...state,
        dataStoresSearch: action.payload,
        loading: false,
      };
    case types.SEARCH_STORE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.ADD_KEY:
      return {
        ...state,
        recentSearchData: action.payload,
        loading: false,
      };

    case types.DELETE_KEY:
      return {...state, recentSearchData: action.payload};

    default:
      return state;
  }
};

export default storeReducer;
