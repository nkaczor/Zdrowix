import AppConfig from '../../../AppConfig';

function FetchError(response) {
  this.name = 'Fetch error';
  this.message = response;
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;

export function singleFetchWithError(url, initFetch) {
  let status = null;

  return fetch(AppConfig.apiUrl + url, initFetch)
    .then(response => {
      status = response.status;
      return response.json();
    })
    .then(response => {
      if (status < 200 || status >= 300) {
        let error = new FetchError(response);

        error.response = response;
        throw error;
      }

      return response;
    });
}

export function singleFetch(url, initFetch) {
  return singleFetchWithError(url, initFetch)
    .catch(console.error.bind(console));
}