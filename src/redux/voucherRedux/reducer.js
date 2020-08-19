import * as types from '../constants/actionTypes';

const initState = {
  dataAllVouchers: [],
  finalPrice: [],
  error: {},
  loading: false,
};

const voucherReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ALL_VOUCHERS:
      return {
        ...state,
        loading: true,
      };
    case types.GET_ALL_VOUCHERS_SUCCESS:
      return {
        ...state,
        dataAllVouchers: action.payload,
        loading: false,
      };
    case types.GET_ALL_VOUCHERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case types.APPLY_VOUCHER:
      return {
        ...state,
        loading: true,
      };
    case types.APPLY_VOUCHER_SUCCESS:
      return {
        ...state,
        finalPrice: action.payload,
        loading: false,
      };
    case types.APPLY_VOUCHER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default voucherReducer;
