import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut, openLoginModal, closeLoginModal } from 'actions/users';
import LoginOrRegister from 'components/LoginOrRegister';
import { push } from 'react-router-redux';

import classNames from 'classnames/bind';
import styles from 'css/main';
import Scroll, { Link as ScrollLink } from 'react-scroll';
import features from 'features';

import logoImg from 'images/reversim_logo.png';
import logoImg2x from 'images/reversim_logo@2x.png';

const cx = classNames.bind(styles);

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = { isNavCollapsed: true }
  }

  logout(event) {
    event.preventDefault();

    const { dispatch, currentPath } = this.props;
    dispatch(logOut());

    if (currentPath !== '/') {
      dispatch(push('/'));
    }
  }

  openLoginModal() {
    const { dispatch } = this.props;
    dispatch(openLoginModal());
  }

  closeLoginModal() {
    const { dispatch } = this.props;
    dispatch(closeLoginModal());
  }

  collapseNav() {
    if (!this.state.isNavCollapsed) {
      this.setState({ isNavCollapsed: true });
    }
  }

  toggleHamburgerNav(event) {
    this.setState({ isNavCollapsed: !!!this.state.isNavCollapsed });
  }

  render() {
    const { user: { isLoginModalOpen, authenticated }, currentPath } = this.props;

    let navigationElements;
    if (currentPath === '/') {
      // Home navigation
      navigationElements = [
        <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="about" spy={true} smooth={true} offset={-50} duration={500} onClick={this.collapseNav.bind(this)}>About</ScrollLink>,
        features('publishAgenda', false) ? (
          <Link className={cx("navigation-link")} to="schedule" onClick={this.collapseNav.bind(this)}>Schedule</Link>
        ) : (
          <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="timeline" spy={true} smooth={true} offset={-50} duration={500} onClick={this.collapseNav.bind(this)}>Timeline</ScrollLink>
        ),
        features('publishAgenda', false) ? (
          <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="speakers" spy={true} smooth={true} offset={-50} duration={500} onClick={this.collapseNav.bind(this)}>Speakers</ScrollLink>
        ) : (
          <Link className={cx("navigation-link")} to="proposals" onClick={this.collapseNav.bind(this)}>Proposals</Link>
        ),
        <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="team" spy={true} smooth={true} offset={-50} duration={500} onClick={this.collapseNav.bind(this)}>Team</ScrollLink>,
        <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="sponsors" spy={true} smooth={true} offset={-50} duration={500} onClick={this.collapseNav.bind(this)}>Sponsors</ScrollLink>,
        <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="location" spy={true} smooth={true} offset={-50} duration={500} onClick={this.collapseNav.bind(this)}>Location</ScrollLink>,
        features('networking', false) ? <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="networking" spy={true} smooth={true} offset={-50} duration={500} onClick={this.collapseNav.bind(this)}>Networking</ScrollLink> : undefined
      ];
    } else {
      navigationElements = [
        <Link className={cx("navigation-link")} to="/" state={ { section: 'about' } } onClick={this.collapseNav.bind(this)}>About</Link>,
        features('publishAgenda', false) ? (
          <Link className={cx("navigation-link")} to="schedule" onClick={this.collapseNav.bind(this)}>Schedule</Link>
        ) : (
          <Link className={cx("navigation-link")} to="/" state={ { section: 'timeline' } } onClick={this.collapseNav.bind(this)}>Timeline</Link>
        ),
        features('publishAgenda', false) ? (
          <Link className={cx("navigation-link")} to="/" state={ { section: 'speakers' } } onClick={this.collapseNav.bind(this)}>Speakers</Link>
        ) : (
          <Link className={cx("navigation-link")} to="/proposals" activeClassName={cx('active')} onClick={this.collapseNav.bind(this)}>Proposals</Link>
        ),
        <Link className={cx("navigation-link")} to="/" state={ { section: 'team' } } onClick={this.collapseNav.bind(this)}>Team</Link>,
        <Link className={cx("navigation-link")}  to="/" state={ { section: 'sponsors' } } onClick={this.collapseNav.bind(this)}>Sponsors</Link>,
        <Link className={cx("navigation-link")} to="/" state={ { section: 'location' } } onClick={this.collapseNav.bind(this)}>Location</Link>,
        features('networking', false) ? <Link className={cx("navigation-link")} to="/" state={ { section: 'networking' } } onClick={this.collapseNav.bind(this)}>Networking</Link> : undefined
      ];
    }

    navigationElements = navigationElements.filter(elem => elem !== undefined).map((elem, i) => <li className={cx("navigation-item")} key={i}>{elem}</li>);

    return (
      <header className={cx('header', 'header-black')}>
    		<div className={cx("header-wrapper")}>
    			<div className={cx("container")}>
    				<div className={cx("col-sm-2", "col-xs-12", "navigation-header")}>
    					<Link to="/" className={cx("logo")}>
    						<img src={logoImg} alt="Reversim" width="143" height="63" className={cx("retina-hide")} />
                <img src={logoImg2x} alt="Reversim" width="119" height="53" className={cx("retina-show")} />
    					</Link>
    					<button className={cx("navbar-toggle", "collapsed")} onClick={this.toggleHamburgerNav.bind(this)} aria-expanded="false" aria-controls="navigation">
    						<span className={cx("icon-bar")}></span>
                <span className={cx("icon-bar")}></span>
                <span className={cx("icon-bar")}></span>
    					</button>
    				</div>

    				<div className={cx("col-sm-10", "col-xs-12", "navigation-container")}>
    					<div id="navigation" ref="navigation" className={cx("navbar-collapse", this.state.isNavCollapsed ? "collapse" : "")}>
    						<ul className={cx("navigation-list", "pull-left", "light-text")}>
    							{navigationElements}
    						</ul>

                { authenticated ? (
                  <div className={cx("pull-right")}>
                    <ul>
                      <li className={cx('navigation-item', 'dropdown')}>
                        <a className={cx('navigation-link', 'dropdown-toggle', 'header-login')} data-toggle="dropdown">{this.props.user.name || this.props.user.email} <i className={cx('fa', 'fa-caret-down')}></i></a>
                        <ul className={cx("dropdown-menu")}>
                          <li className={cx("navigation-item")}>
                            <Link to="/my-profile" className={cx('navigation-link')}>Edit Profile</Link>
                          </li>
                          <li className={cx("navigation-item")}>
                            <Link to="/my-proposals" className={cx('navigation-link')}>My Proposals</Link>
                          </li>
                          <li className={cx("navigation-item")}>
                            <Link to="/my-favorites" className={cx('navigation-link')}>Favorite Sessions</Link>
                          </li>
                          <li className={cx("navigation-item")}>
                            <a onClick={this.logout.bind(this)} className={cx('navigation-link')}>Logout</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <a href="/auth/google" className={cx("pull-right", "btn", "btn-outline-clr", "buy-btn")}>Login</a>
                )}
    					</div>
    				</div>
    			</div>
    		</div>
    	</header>
    );
  }
}

// <Link className={cx("pull-right", "buy-btn")} to="/login">Login</Link>

Navigation.propTypes = {
  user: PropTypes.object,
  currentPath: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Navigation);
