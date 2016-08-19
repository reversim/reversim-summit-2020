/**
 * Created by oriharel on 31/05/2016.
 */
/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import * as types from 'types';
import features from 'features';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
function makeProposalsRequest(method, id, data, action, api = '/proposal') {
    return request[method](api + (id ? ('/' + id) : '') + (action ? `/${action}` : ''), data);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export function createProposalRequest(data) {
    return {
        type: types.CREATE_PROPOSAL_REQUEST,
        id: data.id,
        title: data.title,
        abstract: data.abstract,
        proposalType: data.type,
        speaker_ids: data.speaker_ids
    };
}

export function createProposalSuccess(id) {
    return {
        type: types.CREATE_PROPOSAL_SUCCESS,
        id: id
    };
}

export function createProposalFailure(data) {
    return {
        type: types.CREATE_PROPOSAL_FAILURE,
        id: data.id,
        error: data.error
    };
}

// Fetch posts logic
export function fetchProposals() {
    let endpoint = '/proposal';
    // if (features('proposalsPageGroupedByTags', false)) {
    //   endpoint += '?group=tags';
    // }

    return {
        type: types.GET_PROPOSALS,
        promise: makeProposalsRequest('get', null, null, null, endpoint)
    };
}

export function fetchSpeakers() {
    return {
        type: types.GET_SPEAKERS,
        promise: makeProposalsRequest('get', null, null, null, '/api/speakers')
    };
}

export function fetchTags() {
    return {
        type: types.GET_TAGS,
        promise: makeProposalsRequest('get', 'tags')
    };
}

export function fetchRecommendationsFor(id) {
    return {
        type: types.GET_RECOMMENDATIONS,
        promise: makeProposalsRequest('get', id, null, features('publishAgenda', false) ? 'recommendations?onlyAccepted=true' : 'recommendations')
    };
}

export function fetchProposal(params) {
    return {
        type: types.GET_PROPOSAL,
        id: params.id,
        promise: makeProposalsRequest('get', params.id)
    };
}

export function attendSession(id, value) {
  let newValue = value === undefined ? true : value;

  let basePayload = {
    id,
    value: newValue
  }

  return dispatch => {
    dispatch(Object.assign({}, basePayload, { type: types.ATTEND_SESSION_REQUEST }));

    return makeProposalsRequest('post', id, { value: newValue }, 'attend')
      .then(response => {
        if (response.status === 200) {
          return dispatch(Object.assign({}, basePayload, { type: types.ATTEND_SESSION_SUCCESS }));
        } else {
          return dispatch(Object.assign({}, basePayload, { type: types.ATTEND_SESSION_FAILURE }));
        }
      });
  };
}

function updateProposalSuccess(id, data, message) {
  return {
    type: types.UPDATE_PROPOSAL_SUCCESS,
    id,
    data,
    message
  };
}

function updateProposalError(message) {
  return {
    type: types.UPDATE_PROPOSAL_FAILURE,
    message
  };
}

export function updateProposal(id, data) {
  return dispatch => {
    return makeProposalsRequest('put', id, data)
      .then(response => {
        if (response.status === 200) {
          dispatch(updateProposalSuccess(id, data, response.data.message));
        } else {
          dispatch(updateProposalError('Oops! Something went wrong'));
        }
      });
  };
}

export function createProposal(title, abstract, type, speaker_ids) {
    return (dispatch, getState) => {
        // If the text box is empty
        // if (text.trim().length <= 0) return;

        const id = guid();
        // Redux thunk's middleware receives the store methods `dispatch`
        // and `getState` as parameters
        const { proposal } = getState();
        const data = {
            id,
            title,
            abstract,
            type,
            speaker_ids
        };

        // Conditional dispatch
        // If the proposal already exists, make sure we emit a dispatch event
        //if (proposal.proposals.filter(proposalItem => proposalItem.id === id).length > 0) {
            // Currently there is no reducer that changes state for this
            // For production you would ideally have a message reducer that
            // notifies the user of a duplicate proposal
            //return dispatch(createTopicDuplicate());
        //}

        // First dispatch an optimistic update
        dispatch(createProposalRequest(data));

        return makeProposalsRequest('post', id, data)
            .then(res => {
                if (res.status === 200) {
                    // We can actually dispatch a CREATE_PROPOSAL_SUCCESS
                    // on success, but I've opted to leave that out
                    // since we already did an optimistic update
                    // We could return res.json();
                    return dispatch(createProposalSuccess(id));
                }
            })
            .catch(() => {
                return dispatch(createProposalFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your proposal'}));
            });
    };
}
