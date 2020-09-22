import callApi from './utils';
import uploadProfile from './uploadProfile';

// Register
export const register = data => {
  return uploadProfile('/api/v1/user/register', 'POST', data, '');
};

// Login
export const login = data => {
  return callApi('/api/v1/user/login', 'POST', data);
};

// Logout
export const logout = token => {
  return callApi('/api/v1/user/logout', 'POST', '', token);
};

// Update username
export const updateUserName = (data, token) => {
  return callApi('/api/v1/user/update-user-name', 'PUT', data, token);
};

// Update user phone number
export const updateUserPhoneNumber = (data, token) => {
  return callApi('/api/v1/user/update-user-phone', 'PUT', data, token);
};

// Update user image
export const updateUserImage = (data, token) => {
  return callApi('/api/v1/user/update-user-image', 'POST', data, token);
};

// User password change
export const updateUserPassword = (data, token) => {
  return callApi('/api/v1/user/password', 'PUT', data, token);
};
