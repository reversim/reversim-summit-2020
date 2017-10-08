import http from 'axios';

const headers = {
  Accept: 'application/json'
};

const get = (
  url,
  params = {}
) => http.get(url, {
  params,
  headers
}).then(resp => resp.data);

const post = (
  url,
  data = {},
  params = {}
) => http.post(url, data, {
  params,
  headers
}).then(resp => resp.data);

const put = (
  url,
  data = {},
  params = {}
) => http.put(url, data, {
  params,
  headers
}).then(resp => resp.data);

const delete2 = (
  url,
  params = {}
) => http.delete(url, {
  params,
  headers
}).then(resp => resp.data);

export {
  get,
  post,
  put,
	delete2
}
