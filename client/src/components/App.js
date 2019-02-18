import React, {Component, createElement} from 'react';
import {StaticRouter, BrowserRouter, Route} from 'react-router-dom';
import routes from '../data/routeComps';
import ga from 'react-ga';
import {isServer} from '../utils';
import store from '../store';
import {
  getInitialData,
  uploadPhoto,
  updateUser,
  logout,
  registerTeamMember,
  createProposal as doCreateProposal,
  updateProposal as doUpdateProposal,
  addSponsor,
  updateSponsor as doUpdateSponsor,
  deleteSponsor as doDeleteSponsor,
  attend,
  getProposals,
  getProposers,
} from '../data-service';
import findIndex from 'lodash/findIndex';
import shuffle from 'lodash/shuffle';
import without from 'lodash/without';
import ScrollToTop from './ScrollToTop';
import values from 'lodash/values';

if (!isServer && process.env.NODE_ENV !== 'development') {
  ga.initialize('UA-36904731-4');
  ga.pageview(window.location.pathname);
}

const userUpdater = (id, data) => state => {
  const newUser = {...state.users[id], ...data};
  const newState = {
    users: {
      ...state.users,
      [id]: newUser,
    },
  };

  if (state.user && state.user._id === id) {
    newState.user = newUser;
  }
  return newState;
};

const Router = isServer ? StaticRouter : BrowserRouter;
const initialDataPromise = getInitialData();

class App extends Component {
  componentDidMount() {
    initialDataPromise.then(data => {
      const user = data.user ? data.users[data.user] : data.user;

      const shuffledSpeakers = shuffle(
        without(data.speakers, '5b60af7eb5c7a00014aaff91', '5b45baa6990eba0014f62e39'),
      );

      this.setState({
        ...data,
        user,
        shuffledSpeakers,
        fetchComplete: true,
      });

      const __team = window.location.search
        .slice(1)
        .split('&')
        .map(x => x.split('='))
        .find(x => x[0] === '__team');
      if (__team && user) {
        registerTeamMember(__team[1]);
      }
    });

    // !isServer &&
    //   window.addEventListener('resize', () => {
    //     const {innerWidth} = window;
    //     this.setState({
    //       isSmallerScreen: innerWidth < 768,
    //       isSmallScreen: innerWidth < 991,
    //       isXLScreen: innerWidth >= 1200,
    //     });
    //   });
  }

  onLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  updateUserData = async data => {
    const {user} = this.state;
    if (!user) return;

    await updateUser(data);
    this.setState(userUpdater(user._id, data));
  };

  updateUserPhoto = async (id, imgData) => {
    const {imageUrl} = await uploadPhoto(id, imgData);
    this.setState(userUpdater(id, {picture: imageUrl}));
  };

  createProposal = async data => {
    const proposal = await doCreateProposal(data);
    this.setState(state => ({
      proposals: {
        ...state.proposals,
        [proposal._id]: proposal,
      },
    }));
    return proposal;
  };

  updateProposal = async (id, data) => {
    this.setState(state => ({
      gotAllProposals: false,
      fetchComplete: false
    }));
    await doUpdateProposal(id, data);
    let proposals = await getProposals()
    let users = await getProposers(id)
    this.setState(state => ({
      gotAllProposals: true,
      fetchComplete: true,
      proposals: proposals,
      proposal: proposals[id],
      users
    }));
  };

  attendProposal = async (proposalId, isAttending) => {
    // We change the state before for better UX otherise the user waits before he sees the vote
    this.setState(state => ({
      proposals: {
        ...state.proposals,
        [proposalId]: {...state.proposals[proposalId], attended: isAttending},
      },
    }));
    try {
      ga.event({
        category: 'vote',
        action: isAttending ? 'attending' : 'not-attending',
        label: 'vote-click',
        value: 1,
      });
      await attend(proposalId, isAttending);
    } catch (e) {
      //rollback UI
      this.setState(state => ({
        proposals: {
          ...state.proposals,
          [proposalId]: {...state.proposals[proposalId], attended: !isAttending},
        },
      }));
    }
  };

  createSponsor = async data => {
    const sponsor = await addSponsor(data);
    this.setState(state => ({
      sponsors: [...state.sponsors, sponsor],
    }));
  };

  updateSponsor = async (id, sponsor) => {
    await doUpdateSponsor(id, sponsor);
    const index = findIndex(this.state.sponsors, x => x._id === id);
    this.setState(state => {
      const sponsors = state.sponsors
        .slice(0, index)
        .concat(sponsor)
        .concat(state.sponsors.slice(index + 1));
      return {sponsors};
    });
  };

  deleteSponsor = async id => {
    await doDeleteSponsor(id);
    const index = findIndex(this.state.sponsors, x => x._id === id);
    this.setState(state => {
      const sponsors = state.sponsors.slice(0, index).concat(state.sponsors.slice(index + 1));
      return {sponsors};
    });
  };

  getAllProposals = async () => {
    const [allProposals, proposers] = await Promise.all([getProposals(), getProposers()]);
    this.setState(state => ({
      gotAllProposals: true,
      proposals: {...state.proposals, ...allProposals},
      users: {...state.users, ...proposers},
    }));
  };

  // This is passed down to route components
  actions = {
    onLogout: this.onLogout,
    updateUserPhoto: this.updateUserPhoto,
    updateUserData: this.updateUserData,
    createProposal: this.createProposal,
    updateProposal: this.updateProposal,
    attendProposal: this.attendProposal,
    createSponsor: this.createSponsor,
    updateSponsor: this.updateSponsor,
    deleteSponsor: this.deleteSponsor,
    getAllProposals: this.getAllProposals,
  };

  state = store;

  render() {
    const routeProps = {
      ...this.state,
      ...this.actions,
    };
    return (
      <Router location={this.props.location} context={{}}>
        <div>
          {routes.map(route => (
            <Route
              exact
              render={p =>
                createElement(ScrollToTop(route.comp), {...routeProps, ...p, ...route.props})
              }
              path={route.path}
              key={route.path}
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
