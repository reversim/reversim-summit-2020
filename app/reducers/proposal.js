/**
 * Created by oriharel on 31/05/2016.
 */
import {
    GET_PROPOSALS_REQUEST,
    GET_PROPOSALS_SUCCESS,
    GET_PROPOSALS_FAILURE
} from 'types';


export default function proposal(state = {
    proposals: []
}, action) {
    switch (action.type) {
        case GET_PROPOSALS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case GET_PROPOSALS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                proposals: action.req.data
            });
        case GET_PROPOSALS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });

        default:
            return state;
    }
}
