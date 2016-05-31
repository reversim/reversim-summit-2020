import { combineReducers } from 'redux';
import user from 'reducers/user';
import proposal from 'reducers/proposal';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  proposal,
  routing
});

export default rootReducer;
