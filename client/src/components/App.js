import React, { Component, createElement } from 'react';
import { StaticRouter, BrowserRouter, Route, withRouter } from 'react-router-dom';
import routes from '../data/routeComps';
import ga from 'react-ga';
import { isServer } from '../utils';
import store from '../store';
import { getInitialData, uploadPhoto, updateUser } from '../data-service';

if (!isServer && process.env.NODE_ENV !== "development") {
  ga.initialize('UA-36904731-4');
  ga.pageview(window.location.pathname);

}

const userUpdater = (id, data) => state => ({
  users: {
    ...state.users,
    [id]: { ...state.users[id], ...data }
  }
});

const Router = isServer ? StaticRouter : BrowserRouter;
const initialDataPromise = getInitialData();

class App extends Component {

  componentDidMount() {
    initialDataPromise.then(data => {
      const user = data.user ? data.users[data.user] : data.user;
      this.setState({
        ...data,
        user,
      })
    });
  }

  onLogout = () => this.setState({ user: null });

  updateUserData = async (data) => {
    const userId = this.state.user;
    if (!userId) return;

    await updateUser(data);
    this.setState(userUpdater(userId, data));
  };

  updateUserPhoto = async (id, imgData) => {
    const { imageUrl } = uploadPhoto(id, imgData);
    this.setState(userUpdater(id, { picture: imageUrl }));
  };

  // This is passed down to route components
  actions = {
    onLogout: this.onLogout,
    updateUserPhoto: this.updateUserPhoto,
    updateUserData: this.updateUserData,
  };

  state = store;

  render() {
    const routeProps = {
      ...this.state,
      ...this.actions
    };
    return (
      <Router location={this.props.location} context={{}}>
        <div>
          { routes.map(route=> (
            <Route exact component={() => createElement(withRouter(route.comp), routeProps)} path={route.path} key={route.path}/>
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
