import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { push } from 'react-router-redux';
import navItems from 'data/nav-items';

import classNames from 'classnames/bind';
import styles from 'css/main.css';
import { Link as ScrollLink } from 'react-scroll';

import logoImg from 'images/reversim_logo.png';
import logoImg2x from 'images/reversim_logo@2x.png';

const cx = classNames.bind(styles);

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = { isNavCollapsed: true, fixed: false };
    this.renderNavItem = this.renderNavItem.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentWillMount() {
    if (typeof window === "object" && window.scrollY > 60) {
      this.setState({ fixed: true });
    }
  }

  componentDidMount() {
    if (typeof window === "object") {
      window.addEventListener("scroll", this.onScroll);
    }
  }

  componentWillUnmount() {
    if (typeof window === "object") {
      window.removeEventListener("scroll", this.onScroll);
    }
  }

  onScroll(e) {
    const fixed = window.scrollY > 60;
    this.setState({ fixed });
  }

  logout(event) {
    event.preventDefault();

    const { dispatch, isHome } = this.props;
    dispatch(logOut());

    if (!isHome) {
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

  renderNavItem(item, i) {
    let link;
    if (item.noScroll) {
      link = <Link className={cx("navigation-link")} to={`/${item.to}`} onClick={this.collapseNav.bind(this)}>{item.text}</Link>;
    } else {
      link = <ScrollLink className={cx("navigation-link")} activeClass={cx('active')} to={item.to} spy={true} smooth={true} offset={-50} duration={500} onClick={this.collapseNav.bind(this)}>{item.text}</ScrollLink>
    }

    return <li className={cx("navigation-item")} key={i}>{link}</li>;
  }

  render() {
    const { user: { authenticated }, isHome } = this.props;

    let navigationElements = navItems(isHome).map(this.renderNavItem);// todo send navItems in props

    return (
      <header className={cx('navbar-fixed-top', { fixed: this.state.fixed, "not-home": !isHome })}>
        <div className={cx("container")}>
          <div className={cx("col-sm-2", "col-xs-12", "navigation-header")}>
            <Link to="/" className={cx("logo")}>
              <img src={logoImg} alt="Reversim" className={cx("retina-hide", "display-block")} />
              <img src={logoImg2x} alt="Reversim" height="47" className={cx("retina-show", "display-block")} />
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
                  <ul style={{marginBottom: 0}}>
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
    	</header>
    );
  }
}


Navigation.propTypes = {
  user: PropTypes.object,
  isHome: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Navigation);
