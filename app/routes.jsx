import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Vote from 'containers/Vote';
import Home from 'containers/Home';
import Timeline from 'containers/Timeline';
import Submit from 'containers/Submit';
import Sessions from 'containers/Sessions';
import About from 'containers/About';
import LoginOrRegister from 'containers/LoginOrRegister';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={LoginOrRegister} onEnter={redirectAuth} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/submit" component={Submit} onEnter={requireAuth}/>
        <Route path="/sessions" component={Sessions}/>
        <Route path="/about" component={About} />
      </Route>
  );
};
