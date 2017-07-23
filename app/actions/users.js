import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
import ga from 'react-ga';
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
function makeUserRequest(axiosInst, method, data, api = '/login') {
  return (axiosInst || request)[method](api, data);
}

// Log In Action Creators
function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

// Sign Up Action Creators
function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

function updateUserSuccess(data, message) {
  return {
    type: types.UPDATE_SUCCESS_USER,
    data,
    message
  };
}

function updateUserError(message) {
  return {
    type: types.UPDATE_FAILURE_USER,
    message
  };
}

function beginUploadProfileImage(imageBinary, message) {
  return {
    type: types.UPLOAD_PROFILE_IMAGE,
    imageBinary,
    message
  };
}

function uploadProfileImageSuccess(imageUrl, message) {
  return {
    type: types.UPLOAD_PROFILE_IMAGE_SUCCESS,
    imageUrl,
    message
  };
}

function uploadProfileImageError(message) {
  return {
    type: types.UPLOAD_PROFILE_IMAGE_FAILURE,
    message
  };
}

// Log Out Action Creators
function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

// login modal
export function openLoginModal() {
  ga.modalview('/login');
  return { type: types.OPEN_LOGIN_MODAL };
}

export function closeLoginModal() {
  return { type: types.CLOSE_LOGIN_MODAL };
}

export function fetchUserProposals(params, api) {
  return {
      type: types.GET_USER_PROPOSALS,
      promise: makeUserRequest(api, 'get', null, '/user/proposals')
  };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest(null, 'post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(closeLoginModal());
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(err.data.message));
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return makeUserRequest(null, 'post', data, '/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(closeLoginModal());
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError(err.data.message));
      });
  };
}

export function updateUser(data) {
  return dispatch => {
    return makeUserRequest(null, 'post', data, '/updateUser')
      .then(response => {
        if (response.status === 200) {
          dispatch(updateUserSuccess(data, response.data.message));
        } else {
          dispatch(updateUserError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError(err.data.message));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    return makeUserRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}

export function fetchReversimTeam(params, api) {
  console.log("fetch reversim team");
  return {
      type: types.GET_REVERSIM_TEAM,
      promise: makeUserRequest(api, 'get', null, '/api/team').then(resp => {
        console.log("fetch team complete", resp.data.length);
        return resp;
      })
  };
}

export function uploadProfileImage(data) {

  return dispatch => {
    dispatch(beginUploadProfileImage(data.imageBinary, 'going to server soon...'));
    return makeUserRequest(null, 'post', data, '/profileImage')
        .then(response => {
          if (response.status === 200) {
            dispatch(uploadProfileImageSuccess(response.data.imageUrl, response.data.message));

          } else {
            dispatch(uploadProfileImageError('Oops! Something went wrong'));
          }
        })
        .catch(err => {
          dispatch(uploadProfileImageError(err));
        });
  };
}
