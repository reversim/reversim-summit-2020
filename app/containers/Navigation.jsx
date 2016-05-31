import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames/bind';
import stylesNav from 'css/components/navigation';
import styles from 'css/main';

import logoImg from 'images/reversim_logo.png';
import logoImg2x from 'images/reversim_logo@2x.png';

const cxNav = classNames.bind(stylesNav);
const cx = classNames.bind(styles);

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(logOut());
  }

  render() {
    return (
      <header className={cx('header', 'header-black')}>
    		<div className={cx("header-wrapper")}>
    			<div className={cx("container")}>
    				<div className={cx("col-sm-2", "col-xs-12", "navigation-header")}>
    					<a href="#" className={cx("logo")}>
    						<img src={logoImg} alt="Reversim" width="143" height="63" className={cx("retina-hide")} />
                <img src={logoImg2x} alt="Reversim" width="119" height="53" className={cx("retina-show")} />
    					</a>
    					<button className={cx("navbar-toggle", "collapsed")} data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-controls="navigation">
    						<span className={cx("icon-bar")}></span>
                <span className={cx("icon-bar")}></span>
                <span className={cx("icon-bar")}></span>
    					</button>
    				</div>

    				<div className={cx("col-sm-10", "col-xs-12", "navigation-container")}>
    					<div id="navigation" className={cx("navbar-collapse", "collapse")}>
    						<ul className={cx("navigation-list", "pull-left", "light-text")}>
    							<li className={cx("navigation-item")}><a href="#about" className={cx("navigation-link")}>About</a></li>
                  <li className={cx("navigation-item")}><a href="#timeline" className={cx("navigation-link")}>Timeline</a></li>
                  <li className={cx("navigation-item")}><a href="#sessions" className={cx("navigation-link")}>Proposals</a></li>
                  <li className={cx("navigation-item")}><a href="#sponsors" className={cx("navigation-link")}>Sponsors</a></li>
                  <li className={cx("navigation-item")}><a href="#location" className={cx("navigation-link")}>Location</a></li>
    						</ul>

    						<a href="#" className={cx("pull-right", "buy-btn")}>Submit Proposal</a>
    					</div>
    				</div>
    			</div>
    		</div>
    	</header>
    );
  }
}

Navigation.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

// <nav className={cx('navigation')} role="navigation">
//     <Link to="/" className={cx('item', 'logo')} activeClassName={cx('active')}>Reversim Summit 2016</Link>
//     { user.authenticated ? (
//         <Link onClick={logout}
//               className={cx('item')} to="/">Logout</Link>
//     ) : (
//         <Link className={cx('item')} to="/login">Log in</Link>
//     )}
// </nav>

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Navigation);
