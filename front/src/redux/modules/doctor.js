import { fetchData } from '../api_helpers/fetchData.js';

export default function doctorReducer(state = [], action = {}) {
  switch(action.type) {
    case RECEIVE_DOCTORS:
      state = Object.assign({}, state);
      state.doctors = action.doctors;
      return state;
    case RECEIVE_DOCTOR:
      state = Object.assign({}, state);
      state.doctor = action.doctor;
      return state;
    default:
      return state;
  }
}

export const REQUEST_DOCTOR = 'REQUEST_DOCTOR';
function requestDoctor() {
  return {
    type: REQUEST_DOCTOR
  };
}

export const RECEIVE_DOCTOR = 'RECEIVE_DOCTOR';
function receiveDoctor(json) {

  return {
    type: RECEIVE_DOCTOR,
    doctor: json
  };
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

export function fetchDoctor(id) {
  let url = `/api/doctor/${ id }`;

  return function(dispatch) {
    dispatch(requestDoctor());

    return fetchData(url)
      .then(data => {
        if (data) {
          console.log(data);
          dispatch(receiveDoctor(data));
        }
      });
  };
}