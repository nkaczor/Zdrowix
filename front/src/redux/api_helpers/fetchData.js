import { singleFetch, singleFetchWithError } from './singleFetch';

function getInitFetch(method, body, token) {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
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

export function fetchData(url, method = 'GET', body = {}, token) {
  const initFetch = getInitFetch(method, body, token);

  return singleFetch(url, initFetch);
}

export function fetchDataWithError(url, method = 'GET', body = {}, token) {
  const initFetch = getInitFetch(method, body, token);

  return singleFetchWithError(url, initFetch);
}