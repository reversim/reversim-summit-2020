/**
 * Created by oriharel on 31/05/2016.
 */
/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

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
function makeProposalsRequest(method, id, data, api = '/proposal') {
    return request[method](api + (id ? ('/' + id) : ''), data);
}

// Fetch posts logic
export function fetchProposals() {
    return {
        type: types.GET_PROPOSALS,
        promise: makeProposalsRequest('get')
    };
}