import * as types from '../constants/actionTypes';

const initState = {
  dataOrders: {},
  dataOrderDetail: [],
  messageOrderSuccess: [],
  messageCancelOrderSuccess: [],
  error: {},
  loading: false,
};
const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ALL_ORDER:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        dataOrders: action.payload,
        loading: false,
      };
    case types.GET_ALL_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.GET_ORDER_DETAIL:
      return {...state, loading: true};

    case types.GET_ORDER_DETAIL_SUCCESS:
      return {...state, dataOrderDetail: action.payload, loading: false};

    case types.GET_ORDER_DETAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.CREATE_ORDER:
      return {...state, loading: true};

    case types.CREATE_ORDER_SUCCESS:
      return {...state, messageOrderSuccess: action.payload, loading: false};

    case types.CREATE_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.CANCEL_ORDER:
      return {...state, loading: true};

    case types.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        messageCancelOrderSuccess: action.payload,
        loading: false,
      };

    case types.CANCEL_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;
