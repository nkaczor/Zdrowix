import { fetchData } from '../api_helpers/fetchData.js';

export default function doctorReducer(state = [], action = {}) {
  switch(action.type) {
    case RECEIVE_DOCTORS:
      state = action.doctors;
      return state;
    default:
      return state;
  }
}

export const REQUEST_DOCTORS = 'REQUEST_DOCTORS';
function requestDoctors() {
  return {
    type: REQUEST_DOCTORS
  };
}

export const RECEIVE_DOCTORS = 'RECEIVE_DOCTORS';
function receiveDoctors(json) {
  return {
    type: RECEIVE_DOCTORS,
    doctors: json
  };
}

export function fetchDoctors() {
  let url = '/api/doctor';

  return function(dispatch) {
    dispatch(requestDoctors());

    return fetchData(url)
      .then(data => {
        if (data) {
          dispatch(receiveDoctors(data));
        }
      });
  };
}