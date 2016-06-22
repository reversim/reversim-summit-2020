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
  GET_USER_PROPOSALS_FAILURE,
  GET_REVERSIM_TEAM_REQUEST,
  GET_REVERSIM_TEAM_SUCCESS,
  GET_REVERSIM_TEAM_FAILURE,
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
 } from 'types';

const initialState = {
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false,
  proposals: [],
  team: [],
  isLoginModalOpen: false }

export default function user(state = initialState, action = {}) {
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
      return initialState;
    case LOGOUT_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        isLogin: true
      });
    case UPDATE_SUCCESS_USER:
      return Object.assign({}, state, {
        name: action.data['profile.name'],
        oneLiner: action.data['profile.oneLiner'],
        bio: action.data['profile.bio'],
        linkedin: action.data['profile.linkedin'],
        twitter: action.data['profile.twitter'],
        trackRecord: action.data['profile.trackRecord'],
      });
    case UPLOAD_PROFILE_IMAGE:
      return Object.assign({}, state, {
        picture: action.imageBinary
      });
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      return Object.assign({}, state, {
        picture: action.imageUrl
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
        isWaiting: true
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
    case GET_REVERSIM_TEAM_SUCCESS:
      return Object.assign({}, state, {
        team: action.req.data
      });
    default:
      return state;
  }
}
