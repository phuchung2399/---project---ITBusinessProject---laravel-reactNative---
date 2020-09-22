import callApi from './utils';

export const getAllVouchers = token => {
  return callApi('/api/v1/voucher-to-user', 'GET', '', token);
};

export const totalApplyVouchers = (voucher_name, total, token) => {
  return callApi(
    `/api/v1/total-by-voucher?voucher_name=${voucher_name}&total=${total}`,
    'POST',
    '',
    token,
  );
};
