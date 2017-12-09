import React, { Component } from 'react';
import { StaticRouter, BrowserRouter, Route } from 'react-router-dom';
import routes from '../data/routeComps';
import withStore from '../components/withStore';
import { observer } from 'mobx-react';
import ga from 'react-ga';
import { isServer } from '../utils';

if (!isServer && process.env.NODE_ENV !== "development") {
  ga.initialize('UA-36904731-4');
  ga.pageview(window.location.pathname);

}

const Router = isServer ? StaticRouter : BrowserRouter;

class App extends Component {

  render() {
    return (
      <Router location={this.props.location} context={{}}>
        <div>
          { routes.map(route=> <Route exact component={observer(withStore(route.comp))} path={route.path} key={route.path}/>) }
        </div>
      </Router>
    );
  }
}

export default App;
