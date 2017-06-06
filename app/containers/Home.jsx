import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import Hero from 'components/Hero';
import Rodal from 'components/Rodal';
import { fetchProposals, fetchSpeakers } from 'actions/proposals';
import { fetchReversimTeam } from 'actions/users';
import { Element, Link as ScrollLink } from 'react-scroll';
import ReactDOM from 'react-dom';
import features from 'features';
import ga from 'react-ga';
import _ from 'lodash';
import homeSections from 'data/home-sections';

import styles from 'css/main';
import homeStyles from 'css/components/home';

const cxHome = classNames.bind(homeStyles);
const cx = classNames.bind(styles)

class Home extends Component {

    static need = [  // eslint-disable-line
        fetchReversimTeam,
        fetchProposals,
        fetchSpeakers
    ];

    constructor(props) {
        super(props);

        this.state = {
          isRegistrationModalOpen: false
        }
    }

    jumpToLocation() {
      const { location: { state, pathname } } = this.props;

      let pageSection = pathname.replace('/', '').trim() || (state && state.section);

      if (pageSection !== undefined && pageSection !== '') {
        let elem = ReactDOM.findDOMNode(this.refs[pageSection])
        if (elem) {
          elem.scrollIntoView();
        }
      }
    }

    startRegistrationModal(event) {
      event.preventDefault();

      ga.modalview('registration');

      this.setState({ isRegistrationModalOpen: true });
    }

    closeRegistrationModal(event) {
      event.preventDefault();

      this.setState({ isRegistrationModalOpen: false });
    }

    renderSection(section) {
      return (<Element name={section.name} ref={section.name} key={section.name}>
        {React.createElement(section.el, { name: section.name, ...section.props })}
      </Element>);
    }

    render() {
        this.jumpToLocation();
        const sectionElements = homeSections(this.props).map(this.renderSection);

        return (
          <div>
              <div className={cx('home')}>
                <Navigation currentPath={this.props.location.pathname} />
                <Hero/>
                {sectionElements}
                <Footer tweets={this.props.reversimTweets} />
              </div>

              <Rodal  visible={this.state.isRegistrationModalOpen}
                      width={700}
                      height={400}
                      onClose={this.closeRegistrationModal.bind(this)}>
                <div style={ {width: '100%', textAlign: 'left'} }>
                  <iframe  src="//eventbrite.com/tickets-external?eid=26992112134&ref=etckt" frameborder="0" height="400" width="100%" vspace="0" hspace="0" marginheight="5" marginwidth="5" scrolling="auto" allowtransparency="true"></iframe>
                </div>
              </Rodal>
          </div>
        );
    }
}

Home.propTypes = {
  user: PropTypes.object,
  proposals: PropTypes.any,
  reversimTweets: PropTypes.array,
  speakers: PropTypes.array,
  acceptedProposals: PropTypes.array
};

function mapStateToProps(state) {
    return {
        user: state.user,
        proposals: !features('submission', false) ? _.chain(state.proposal.proposals).shuffle().take(4).value() : state.proposal.proposals,
        acceptedProposals: features('publishAgenda', false) ? state.proposal.accepted : [],
        reversimTweets: state.tweets.reversim,
        speakers: state.proposal.speakers
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Home);
