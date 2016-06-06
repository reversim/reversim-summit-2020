import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'types';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeTweetsRequest(method, data, api = '/tweets') {
  return request({
    url: api,
    method,
    data,
    withCredentials: true
  });
}

export function fetchReversimTweets() {
  return {
      type: types.GET_REVERSIM_TWEETS,
      promise: makeTweetsRequest('get', null, '/tweets/reversim')
  };
}
