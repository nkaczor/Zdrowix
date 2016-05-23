import { fetchData } from '../api_helpers/fetchData.js';


export function fetchSaveQuestion(token, data) {
  let body = JSON.stringify(data);

  return function(dispatch) {
    return fetchData('/api/question', 'POST', body, token)
      .then(data => {
        console.log(data);
      });
  };
}
