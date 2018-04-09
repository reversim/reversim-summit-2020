import React, { Component, createElement } from 'react';
import { StaticRouter, BrowserRouter, Route, withRouter } from 'react-router-dom';
import routes from '../data/routeComps';
import ga from 'react-ga';
import { isServer } from '../utils';
import store from '../store';
import { getInitialData } from '../data-service';

if (!isServer && process.env.NODE_ENV !== "development") {
  ga.initialize('UA-36904731-4');
  ga.pageview(window.location.pathname);

}

const Router = isServer ? StaticRouter : BrowserRouter;
const initialDataPromise = getInitialData();

class App extends Component {

  componentDidMount() {
    initialDataPromise.then(data => {
      this.setState({
        ...data,
        isFetching: false
      })
    });
  }

  state = store;

  render() {
    return (
      <Router location={this.props.location} context={{}}>
        <div>
          { routes.map(route=> (
            <Route exact component={() => createElement(withRouter(route.comp), { ...this.state })} path={route.path} key={route.path}/>
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
