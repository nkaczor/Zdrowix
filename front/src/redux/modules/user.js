import { fetchData, fetchDataWithError } from '../api_helpers/fetchData.js';
import localStore from 'store';

export default function userReducer(state = {}, action = {}) {
  switch(action.type) {
    case RECEIVE_USER_INFO:
      return action.user;
    default:
      return state;
  }
}

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
function requestUserInfo() {
  return {
    type: REQUEST_USER_INFO
  };
}

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
function receiveUserInfo(json) {
  return {
    type: RECEIVE_USER_INFO,
    user: json
  };
}

export const SIGN_UP = 'SIGN_UP';

export const SIGN_IN = 'SIGN_IN';
export function signIn(token) {
  return {
    type: SIGN_IN,
    token: token
  };
}

export const SIGN_OUT = 'SIGN_OUT';
export function signOut() {
  localStore.remove('user');
  return {
    type: SIGN_OUT
  };
}

export function fetchToken(email, password) {
  let url = '/api/authenticate';
  let body = JSON.stringify({
    email: email,
    password: password
  });

  return dispatch =>
    fetchDataWithError(url, 'POST', body)
    .then(data => {
      // store the key so that on next start of the app
      // you don't have to login again
      localStore.set('user', {
        username: email,
        token: data.token,
      });

      dispatch(signIn(data.token));
    })
    .catch(error => {
      return error.response;
    });
}

export function fetchUserInfo() {
  return function(dispatch) {
    dispatch(requestUserInfo());

    return fetchData('/api/user')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveUserInfo(json))
      );
  };
}
