import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut, openLoginModal, closeLoginModal } from 'actions/users';
import LoginOrRegister from 'components/LoginOrRegister';
import { push } from 'react-router-redux';

import classNames from 'classnames/bind';
import styles from 'css/main';
import Scroll, { Link as ScrollLink } from 'react-scroll';

import logoImg from 'images/reversim_logo.png';
import logoImg2x from 'images/reversim_logo@2x.png';

const cx = classNames.bind(styles);

class Navigation extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const { user: { isLoginModalOpen, authenticated }, currentPath } = this.props;

    let navigationElements;
    if (currentPath === '/') {
      // Home navigation
      navigationElements = [
        <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="about" spy={true} smooth={true} offset={-50} duration={500}>About</ScrollLink>,
        <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="timeline" spy={true} smooth={true} offset={-50} duration={500}>Timeline</ScrollLink>,
        /*<ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="proposals" spy={true} smooth={true} offset={-100} duration={500}>Proposals</ScrollLink>,*/
        <Link className={cx("navigation-link")} to="proposals">Proposals</Link>,
        <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="team" spy={true} smooth={true} offset={-50} duration={500}>Team</ScrollLink>,
        /*<ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="sponsors" spy={true} smooth={true} offset={-50} duration={500}>Sponsors</ScrollLink>*/,
        <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to="location" spy={true} smooth={true} offset={-50} duration={500}>Location</ScrollLink>
      ];
    } else {
      navigationElements = [
        <Link className={cx("navigation-link")} to="/" state={ { section: 'about' } }>About</Link>,
        <Link className={cx("navigation-link")} to="/" state={ { section: 'timeline' } }>Timeline</Link>,
        <Link className={cx("navigation-link")} to="proposals" activeClassName={cx('active')}>Proposals</Link>,
        <Link className={cx("navigation-link")} to="/" state={ { section: 'team' } }>Team</Link>,
        /*<Link className={cx("navigation-link")}  to="/" state={ { section: 'sponsors' } }>Sponsors</Link>*/,
        <Link className={cx("navigation-link")} to="/" state={ { section: 'location' } }>Location</Link>
      ];
    }

    navigationElements = navigationElements.map((elem, i) => <li className={cx("navigation-item")} key={i}>{elem}</li>);

    return (
      <header className={cx('header', 'header-black')}>
    		<div className={cx("header-wrapper")}>
    			<div className={cx("container")}>
    				<div className={cx("col-sm-2", "col-xs-12", "navigation-header")}>
    					<Link to="/" className={cx("logo")}>
    						<img src={logoImg} alt="Reversim" width="143" height="63" className={cx("retina-hide")} />
                <img src={logoImg2x} alt="Reversim" width="119" height="53" className={cx("retina-show")} />
    					</Link>
    					<button className={cx("navbar-toggle", "collapsed")} data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-controls="navigation">
    						<span className={cx("icon-bar")}></span>
                <span className={cx("icon-bar")}></span>
                <span className={cx("icon-bar")}></span>
    					</button>
    				</div>

    				<div className={cx("col-sm-10", "col-xs-12", "navigation-container")}>
    					<div id="navigation" className={cx("navbar-collapse", "collapse")}>
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
