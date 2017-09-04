import axios from 'axios';

/*
If it's initialized with a cookie, it sets it as a global interceptor
if it gets called with no arguemnts, it deletes *all* request intercepotrs
*/
let interceptorID;
export default function ssrAuth(cookie) {
  if (arguments.length === 0) {
    axios.interceptors.request.eject(interceptorID);
  } else {
    interceptorID = axios.interceptors.request.use(function(config) {
      config.headers['cookie'] = cookie;
      return config;
    }, function(error) {
      return Promise.reject(error);
    });
  }
}
