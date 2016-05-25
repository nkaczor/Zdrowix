import { fetchData } from '../api_helpers/fetchData.js';

export default function voivodeshipReducer(state = [], action = {}) {
  switch(action.type) {
    case RECEIVE_VOIVODESHIPS:
      state = action.voivodeships;
      return state;
    default:
      return state;
  }
}

export const REQUEST_VOIVODESHIPS = 'REQUEST_VOIVODESHIPS';
function requestVoivodeships() {
  return {
    type: REQUEST_VOIVODESHIPS
  };
}

export const RECEIVE_VOIVODESHIPS = 'RECEIVE_VOIVODESHIPS';
function receiveVoivodeships(json) {
  return {
    type: RECEIVE_VOIVODESHIPS,
    voivodeships: json
  };
}

export function fetchVoivodeships() {
  let url = '/api/voivodeship';

  return function(dispatch) {
    dispatch(requestVoivodeships());

    return fetchData(url)
      .then(data => {
        if (data) {
          dispatch(receiveVoivodeships(data));
        }
      });
  };
}