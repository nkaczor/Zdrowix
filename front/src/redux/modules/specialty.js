import { fetchData } from '../api_helpers/fetchData.js';

export default function specialtyReducer(state = [], action = {}) {
  switch(action.type) {
    case RECEIVE_SPECIALTIES:
      state = action.specialties;
      return state;
    default:
      return state;
  }
}

export const REQUEST_SPECIALTIES = 'REQUEST_SPECIALTIES';
function requestSpecialties() {
  return {
    type: REQUEST_SPECIALTIES
  };
}

export const RECEIVE_SPECIALTIES = 'RECEIVE_SPECIALTIES';
function receiveSpecialties(json) {
  return {
    type: RECEIVE_SPECIALTIES,
    specialties: json
  };
}

export function fetchSpecialities() {
  let url = '/api/specialty';

  return function(dispatch) {
    dispatch(requestSpecialties());

    return fetchData(url)
      .then(data => {
        if (data) {
          dispatch(receiveSpecialties(data));
        }
      });
  };
}