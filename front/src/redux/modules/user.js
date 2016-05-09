import { fetchData, fetchDataWithError } from '../api_helpers/fetchData.js';
import localStore from 'store';

export default function userReducer(state = {}, action = {}) {
  switch(action.type) {
    case RECEIVE_USER_INFO:
      state = Object.assign({}, state);
      state.userInfo = action.user;
      return state;
    case SIGN_IN:
      state = Object.assign({}, state);
      state.token = action.token;
      return state;
    case SIGN_OUT:
      state = Object.assign({}, state);
      state.token = '';
      return state;
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

function saveToken(token) {
  localStore.set('user', {
    token
  });
}

export function fetchToken(email, password) {
  let url = '/api/authenticate';
  let body = JSON.stringify({
    email: email,
    password: password
  });

  return dispatch =>
    fetchData(url, 'POST', body)
    .then(data => {
      if (data.token) {
        saveToken(data.token);
        dispatch(signIn(data.token));
      }
    });
}

export function fetchUserInfo(token, saveToLocalStore) {
  return function(dispatch) {
    dispatch(requestUserInfo());

    return fetchData('/api/user', 'GET', {}, token)
      .then(data => {
        if (data.success) {
          dispatch(receiveUserInfo(data.user));
          if (saveToLocalStore) {
            dispatch(signIn(token));
          }
        }
      }
      );
  };
}
