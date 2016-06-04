import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Navigation from 'components/Navigation';
import About from 'components/About';
import Speakers from 'components/Speakers';
import Timeline from 'components/Timeline';
import Proposals from 'components/Proposals';
import CFP from 'components/CFP';
import Sponsors from 'components/Sponsors';
import Location from 'components/Location';
import Footer from 'components/Footer';
import { Link } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
import {fetchProposals } from 'actions/proposals';
import { Element } from 'react-scroll';

import styles from 'css/main';
import homeStyles from 'css/components/home';

const cxHome = classNames.bind(homeStyles);
const cx = classNames.bind(styles)

class Home extends Component {

    static need = [  // eslint-disable-line
        fetchProposals
    ];

    constructor(props) {
        super(props);
    }

    render() {
        const { proposals } = this.props;

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
                                  <a href="#" className={cx('btn', 'btn-outline')} data-modal-link="0">REGISTER</a>
                              </div>
                          </div>
                      </div>
                  </section>

                  <Sticky style={{zIndex: 5}}>
                      <Navigation currentPath={this.props.location.pathname} />
                  </Sticky>

                  <Element name="about">
                    <About />
                  </Element>

                  <Element name="timeline">
                    <Timeline />
                  </Element>

                  <Element name="proposals">
                    <Proposals data={proposals} />
                  </Element>

                  <CFP />

                  <Element name="sponsors">
                    <Sponsors />
                  </Element>

                  <Element name="location">
                    <Location />
                  </Element>

                  <Footer />
              </div>
          </StickyContainer>
        );
    }
}

Home.propTypes = {
  user: PropTypes.object,
  proposals: PropTypes.array
};

function mapStateToProps(state) {
    return {
        user: state.user,
        proposals: state.proposal.proposals
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Home);
