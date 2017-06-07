import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import Hero from 'components/Hero';
import { fetchProposals, fetchSpeakers } from 'actions/proposals';
import { fetchReversimTeam } from 'actions/users';
import { Element } from 'react-scroll';
import ReactDOM from 'react-dom';
import features from 'features';
import _ from 'lodash';
import homeSections from 'data/home-sections';

import styles from 'css/main';

const cx = classNames.bind(styles)

class Home extends Component {

    static need = [  // eslint-disable-line
        fetchReversimTeam,
        fetchProposals,
        fetchSpeakers
    ];

    componentDidMount() {
      this.jumpToLocation();
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

    renderSection(section) {
      return (<Element name={section.name} ref={section.name} key={section.name}>
        {React.createElement(section.el, { name: section.name, ...section.props })}
      </Element>);
    }

    render() {
        const sectionElements = homeSections(this.props).map(this.renderSection);

        return (
          <div>
              <div className={cx('home')}>
                <Navigation currentPath={this.props.location.pathname} />
                <Hero/>
                {sectionElements}
                <Footer tweets={this.props.reversimTweets} />
              </div>
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
