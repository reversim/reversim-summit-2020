import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from '../data/routeComps';
import withStore from '../components/withStore';
import { observer } from 'mobx-react';
import ga from 'react-ga';

if (process.env.NODE_ENV !== "development") {
  ga.initialize('UA-36904731-4');
  ga.pageview(window.location.pathname);

}

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          { routes.map(route=> <Route exact component={observer(withStore(route.comp))} path={route.path} key={route.path}/>) }
        </div>
      </Router>
    );
  }
}

export default App;
