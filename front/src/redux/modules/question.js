import { fetchData } from '../api_helpers/fetchData.js';

export default function questionReducer(state = [], action = {}) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      state = action.questions;
      return state;
    default:
      return state;
  }
}

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
function requestQuestions() {
  return {
    type: REQUEST_QUESTIONS
  };
}

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
function receiveQuestions(json) {
  return {
    type: RECEIVE_QUESTIONS,
    questions: json
  };
}

export function fetchSaveQuestion(token, data) {
  let body = JSON.stringify(data);

  return function(dispatch) {
    return fetchData('/api/question', 'POST', body, token)
      .then(data => {
        console.log(data);
      });
  };
}


export function fetchQuestions(id, token) {
  let url = `/api/question/${ id }`;

  return function(dispatch) {
    dispatch(requestQuestions());
    return fetchData(url, 'GET', null, token)
      .then(data => {
        if (data.success) {
          dispatch(receiveQuestions(data.questions));
        }
      });
  };
}