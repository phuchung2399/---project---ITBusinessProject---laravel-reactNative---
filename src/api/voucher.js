import callApi from './utils';

export const getAllVouchers = token => {
  return callApi('/api/v1/voucher-to-user', 'GET', '', token);
};
