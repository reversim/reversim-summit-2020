import {
  TOGGLE_LOGIN_MODE,
  MANUAL_LOGIN_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_ERROR_USER,
  SIGNUP_USER,
  SIGNUP_SUCCESS_USER,
  SIGNUP_ERROR_USER,
  UPDATE_SUCCESS_USER,
  UPDATE_FAILURE_USER,
  LOGOUT_USER,
  LOGOUT_SUCCESS_USER,
  LOGOUT_ERROR_USER,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  GET_USER_PROPOSALS_REQUEST,
  GET_USER_PROPOSALS_SUCCESS,
  GET_USER_PROPOSALS_FAILURE } from 'types';

export default function user(state = {
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false,
  proposals: [],
  isLoginModalOpen: false }, action = {}) {
  switch (action.type) {
    case TOGGLE_LOGIN_MODE:
      return Object.assign({}, state, {
        isLogin: !state.isLogin,
        message: ''
      });
    case MANUAL_LOGIN_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        message: ''
      });
    case LOGIN_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case SIGNUP_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case SIGNUP_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case SIGNUP_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case LOGOUT_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case LOGOUT_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        isLogin: true
      });
    case OPEN_LOGIN_MODAL:
      return Object.assign({}, state, {
        isLoginModalOpen: true
      });
    case CLOSE_LOGIN_MODAL:
      return Object.assign({}, state, {
        isLoginModalOpen: false
      });
    case GET_USER_PROPOSALS_REQUEST:
      return Object.assign({}, state, {
        isWaiting: true,
      });
    case GET_USER_PROPOSALS_SUCCESS:
      return Object.assign({}, state, {
        isWaiting: false,
        proposals: action.req.data
      });
    case GET_USER_PROPOSALS_FAILURE:
      return Object.assign({}, state, {
        isWaiting: false
      });
    default:
      return state;
  }
}
