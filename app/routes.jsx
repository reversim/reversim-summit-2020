import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import Submit from 'containers/Submit';
import MyProposals from 'containers/MyProposals';
import AllProposals from 'containers/AllProposals';
import MyProfile from 'containers/MyProfile';
import LoginOrRegister from 'components/LoginOrRegister';
import Session from 'containers/Session';
import { openLoginModal } from 'actions/users';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const isClientSide = typeof window !== 'undefined' && window.document && window.document.createElement;

  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      if (isClientSide) {
        window.location.href = `/auth/google?returnTo=/${nextState.location.pathname}`;
      } else {
       replace({
         pathname: '/auth/google?returnTo='+nextState.location.pathname,
         state: { nextPathname: nextState.location.pathname }
       });
     }
      // store.dispatch(openLoginModal());
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
        <Route path="/submit" component={Submit} onEnter={requireAuth} />
        <Route path="/session/:id" component={Session} />
        <Route path="/my-proposals" component={MyProposals} onEnter={requireAuth} />
        <Route path="/proposals" component={AllProposals} />
        <Route path="/my-profile" component={MyProfile} onEnter={requireAuth} />
      </Route>
  );
};
