import * as types from '../constants/actionTypes';

//Login App
export const logIn = data => {
  return {
    type: types.LOG_IN,
    data,
  };
};

export const logInSuccess = data => {
  // console.log('logInSuccess', data);
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

export const logInFailure = error => {
  return {
    type: types.LOGIN_FAILURE,
    payload: error,
  };
};

export const logOut = (token) => {
  return {
    type: types.LOGOUT_SUCCESS,
    token: token,
  };
};


// export const addUser = data => {
//   return {
//     type: types.ADD_USER,
//     data,
//   };
// };

// export const addUserSuccess = data => {
//   return {
//     type: types.ADD_USER_SUCCESS,
//     payload: data,
//   };
// };

// export const addUserFailure = error => {
//   return {
//     type: types.ADD_USER_FAILURE,
//     payload: error,
//   };
// };




// export const getBestUsers = () => {
//   return {
//     type: types.GET_BEST_USERS,
//     //payload: data,
//   };
// };

// export const getBestUsersSuccess = response => {
//   // console.log('response', response);
//   return {
//     type: types.GET_BEST_USERS_SUCCESS,
//     payload: response,
//   };
// };

// export const getBestUsersFailure = error => {
//   return {
//     type: types.GET_BEST_USERS_FAILURE,
//     payload: error,
//   };
// };