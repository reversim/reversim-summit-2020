import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Navigation from 'components/Navigation';
import About from 'components/About';
import Timeline from 'components/Timeline';
import Proposals from 'components/Proposals';
import CFP from 'components/CFP';
import Register from 'components/Register';
import Sponsors from 'components/Sponsors';
import Team from 'components/Team';
import Location from 'components/Location';
import Footer from 'components/Footer';
import { Link } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
import { fetchProposals } from 'actions/proposals';
import { fetchReversimTeam } from 'actions/users';
import { Element, Link as ScrollLink } from 'react-scroll';
import ReactDOM from 'react-dom';

import styles from 'css/main';
import homeStyles from 'css/components/home';

const cxHome = classNames.bind(homeStyles);
const cx = classNames.bind(styles)

class Home extends Component {

    static need = [  // eslint-disable-line
        fetchReversimTeam,
        fetchProposals
    ];

    constructor(props) {
        super(props);
    }

    jumpToLocation() {
      const { location: { state } } = this.props;

      if (state && state.section) {
        let elem = ReactDOM.findDOMNode(this.refs[state.section])
        if (elem) {
          elem.scrollIntoView();
        }
      }
    }

    render() {
        const { proposals, user: { team }, reversimTweets } = this.props;
        this.jumpToLocation();

        return (
          <StickyContainer>
              <div className={cx('home')}>
                  <section id="hero" className={cx('hero-section', 'bg1', 'bg-cover', 'window-height', 'light-text')}>
                      <ul className={cx("socials-nav")}>
                          <li className={cx('socials-nav-item')}><a href="https://twitter.com/reversim"><span className={cx('fa', 'fa-twitter')}></span></a></li>
                          <li className={cx('socials-nav-item')}><a href="https://www.facebook.com/groups/806177629478248/"><span className={cx('fa', 'fa-facebook')}></span></a></li>
                      </ul>
                      <div className={cx('heading-block', 'centered-block', 'align-center')}>
                          <div className={cx('container')}>
                              <h5 className={cx('heading-alt')} style={ {marginBottom: '8px'} }><span className={cx('fa', 'fa-calendar-o', 'base-clr-txt')}></span>19-20.sep <span className={cx('fa', 'fa-map-marker', 'base-clr-txt')} style={ {marginLeft: '14px'} }></span>Weizmann Institute of Science</h5>
                              <h1 className={cx('extra-heading')}>Reversim Summit 2016</h1>
                              <h5 className={cx('base-font')}>Call for papers is now open!</h5>
                              <div className={cx('btns-container')}>
                                  <Link to="submit" className={cx('btn')}>SUBMIT PROPOSAL</Link>
                                  <ScrollLink to="register" className={cx('btn', 'btn-outline')} spy={true} smooth={true} offset={-100} duration={500}>REGISTER</ScrollLink>
                              </div>
                          </div>
                      </div>
                  </section>

                  <Sticky style={{zIndex: 5}}>
                      <Navigation currentPath={this.props.location.pathname} />
                  </Sticky>

                  <Element name="about" ref="about">
                    <About />
                  </Element>

                  <Element name="timeline" ref="timeline">
                    <Timeline />
                  </Element>

                  <Element name="register" ref="register">
                    <Register />
                  </Element>

                  <Element name="proposals" ref="proposals">
                    <Proposals data={proposals} isReversimTeamMember={this.props.user.isReversimTeamMember} />
                  </Element>

                  <CFP />

                {/*<Element name="sponsors"  ref="sponsors">
                    <Sponsors />
                  </Element>*/}

                  <Element name="team" ref="team">
                    <Team team={team} />
                  </Element>

                  <Element name="location" ref="location">
                    <Location />
                  </Element>

                  <Footer tweets={reversimTweets} />
              </div>
          </StickyContainer>
        );
    }
}

Home.propTypes = {
  user: PropTypes.object,
  proposals: PropTypes.array,
  reversimTweets: PropTypes.array
};

function mapStateToProps(state) {
    return {
        user: state.user,
        proposals: state.proposal.proposals,
        reversimTweets: state.tweets.reversim
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Home);
