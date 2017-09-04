import {
  GET_REVERSIM_TWEETS_REQUEST,
  GET_REVERSIM_TWEETS_SUCCESS,
  GET_REVERSIM_TWEETS_FAILURE,
 } from 'types';

const initialState = {
  reversim: []
}

export default function tweets(state = initialState, action = {}) {
  switch (action.type) {
    case GET_REVERSIM_TWEETS_SUCCESS:
      return Object.assign({}, state, {
        reversim: action.tweets
      });
    default:
      return state;
  }
}
