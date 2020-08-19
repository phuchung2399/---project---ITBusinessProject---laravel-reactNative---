import callApi from './utils';

export const getAllVouchers = token => {
  return callApi('/api/v1/voucher-to-user', 'GET', '', token);
};

export const totalApplyVouchers = (data, token) => {
  console.log('data', data, token);
  return callApi('/api/v1/total-by-voucher', 'POST', data, token);
};
