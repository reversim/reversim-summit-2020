import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Navigation from './Navigation';
import About from './About';
import Speakers from './Speakers';
import Timeline from './Timeline';
import Sessions from './Sessions';
import CFP from './CFP';
import Sponsors from './Sponsors';
import Location from './Location';
import Footer from './Footer';
import { StickyContainer, Sticky } from 'react-sticky';

import styles from 'css/main';
import homeStyles from 'css/components/home';

const cxHome = classNames.bind(homeStyles);
const cx = classNames.bind(styles)

//class Home extends Component {
//
//    constructor(props) {
//        super(props);
//    }
//
//
//    render() {
//        return (
//            <div className={cx('home')}>
//                This is the home of the site {this.props.user.email}
//            </div>
//        );
//    }
//}

const Home = ({user, dispatch}) => {

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
                  <a href="#" className={cx('btn', 'btn-md')} data-modal-link="email-ticket">SUBMIT PROPOSAL</a>
                <a href="#" className={cx('btn', 'btn-outline', 'btn-md')} data-modal-link="0">REGISTER</a>
                </div>
              </div>
            </div>
          </section>

          <Sticky style={{zIndex: 1000}}>
            <Navigation />
          </Sticky>
          <About />
          <Timeline />
          <Sessions />
          <CFP />
          <Sponsors />
          <Location />

          <Footer />
        </div>
        </StickyContainer>
    );
};

Home.propTypes = {
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Home);
