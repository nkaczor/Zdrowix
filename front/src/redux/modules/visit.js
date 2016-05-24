import { fetchData } from '../api_helpers/fetchData.js';

export default function visitReducer(state = [], action = {}) {
  switch(action.type) {
    case RECEIVE_VISITS:
      state = action.visits;
      return state;
    default:
      return state;
  }
}

export const REQUEST_VISITS = 'REQUEST_VISITS';
function requestVisits() {
  return {
    type: REQUEST_VISITS
  };
}

export const RECEIVE_VISITS = 'RECEIVE_VISITS';
function receiveVisits(json) {
  return {
    type: RECEIVE_VISITS,
    visits: json
  };
}

export function fetchSaveVisit(token, data) {
  let body = JSON.stringify(data);

  return function(dispatch) {
    return fetchData('/api/visit', 'POST', body, token)
      .then(data => {
        console.log(data);
      });
  };
}

export function fetchVisits(id, from, to, token) {
  let url = `/api/visit/${ id }/${ from }/${ to }`;

  return function(dispatch) {
    dispatch(requestVisits());
    return fetchData(url, 'GET', null, token)
      .then(data => {
        if (data.success) {
          dispatch(receiveVisits(data.visits));
        }
      });
  };
}