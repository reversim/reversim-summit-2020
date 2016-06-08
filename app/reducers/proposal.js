/**
 * Created by oriharel on 31/05/2016.
 */
import {
    GET_PROPOSALS_REQUEST,
    GET_PROPOSALS_SUCCESS,
    GET_PROPOSALS_FAILURE,
    GET_PROPOSAL_REQUEST,
    GET_PROPOSAL_SUCCESS,
    GET_PROPOSAL_FAILURE,
    CREATE_PROPOSAL_REQUEST,
    CREATE_PROPOSAL_FAILURE,
    UPDATE_PROPOSAL_SUCCESS,
    ATTEND_SESSION_REQUEST,
    ATTEND_SESSION_FAILURE,
    ATTEND_SESSION_SUCCESS
} from 'types';


export default function proposal(state = {
    proposals: [],
    currentProposal: undefined
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
        case GET_PROPOSAL_REQUEST:
            let proposals = state.proposals.filter(p => p.id === action.id);
            return Object.assign({}, state, {
                isFetching: true,
                currentProposal: proposals.length > 0 ? proposals[0] : undefined
            });
        case GET_PROPOSAL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                currentProposal: action.req.data
            });
        case GET_PROPOSAL_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case CREATE_PROPOSAL_REQUEST:
            return {
                proposals: [...state.proposals, { id: action.id, count: action.count, text: action.text }]
            };
        case CREATE_PROPOSAL_FAILURE:
            return {
                proposals: [...state.proposals.filter((tp) => tp.id !== action.id)]
            };
        case UPDATE_PROPOSAL_SUCCESS:
            return Object.assign({}, state, {
                currentProposal: Object.assign({}, state.currentProposal, action.data)
            });
        case ATTEND_SESSION_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ATTEND_SESSION_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                currentProposal: Object.assign({}, state.currentProposal, { attended: false })
            });
        case ATTEND_SESSION_SUCCESS:
            return Object.assign({}, state, {
                currentProposal: Object.assign({}, state.currentProposal, { attended: true })
            });

        default:
            return state;
    }
}
