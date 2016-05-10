import { singleFetch, singleFetchWithError } from './singleFetch';

function getInitFetch(method, body, token, contentType) {
  const headers = new Headers();

  if(contentType !== 'multipart/form-data'){
    headers.append('Content-Type', contentType || 'application/json');
  }
  headers.append('Authorization', token);

  const initFetch = {
    method,
    headers,
    mode: 'cors',
  };

  if (method === 'POST' || method === 'PATCH') {
    initFetch.body = body;
  }

  return initFetch;
}

export function fetchData(url, method = 'GET', body = {}, token, contentType) {
  const initFetch = getInitFetch(method, body, token, contentType);

  return singleFetch(url, initFetch);
}

export function fetchDataWithError(url, method = 'GET', body = {}, token, contentType) {
  const initFetch = getInitFetch(method, body, token, contentType);

  return singleFetchWithError(url, initFetch);
}