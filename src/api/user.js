import callApi from './utils';

export const register = data => {
  return callApi('/api/v1/user/register', 'POST', data);
};

export const login = data => {
  return callApi('/api/v1/user/login', 'POST', data);
};

export const logout = (token) => {
  return callApi('/api/v1/user/logout', 'POST', '', token);
};
