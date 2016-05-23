import { fetchData } from '../api_helpers/fetchData.js';

let emptyArrays = {
  monday: createDayArray(),
  tuesday: createDayArray(),
  wednesday: createDayArray(),
  thursday: createDayArray(),
  friday: createDayArray(),
  saturday: createDayArray(),
  sunday: createDayArray(),
};

function createDayArray() {
  return new Array(24).fill(false);
}

export default function workingTimeReducer(state = emptyArrays, action = {}) {
  switch(action.type) {
    case RECEIVE_WORKING_TIME:
      state = action.workingTime.workingHours;
      return state;
    case CLEAR_WORKING_TIME:
      state = emptyArrays;
      return state;
    default:
      return state;
  }
}

export const REQUEST_WORKING_TIME = 'REQUEST_WORKING_TIME';
function requestWorkingTime() {
  return {
    type: REQUEST_WORKING_TIME
  };
}

export const RECEIVE_WORKING_TIME = 'RECEIVE_WORKING_TIME';
function receiveWorkingTime(json) {
  return {
    type: RECEIVE_WORKING_TIME,
    workingTime: json.workingTime
  };
}

export const CLEAR_WORKING_TIME = 'CLEAR_WORKING_TIME';
function clearWorkingTime() {
  return {
    type: CLEAR_WORKING_TIME
  };
}

export function fetchSaveWorkingTime(token, days) {
  let body = JSON.stringify(days);

  return function(dispatch) {
    return fetchData('/api/working-time', 'POST', body, token)
      .then(data => {
        if (data.success) {

        }
      });
  };
}

export function fetchWorkingTime(id, token) {
  let url = `/api/working-time/${ id }`;

  return function(dispatch) {
    dispatch(requestWorkingTime());
    return fetchData(url, 'GET', null, token)
      .then(data => {
        if (data.success) {
          dispatch(receiveWorkingTime(data));
        }
        else {
          dispatch(clearWorkingTime());
        }
      });
  };
}