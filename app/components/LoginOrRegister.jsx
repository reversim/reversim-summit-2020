import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import stylesLogin from 'css/components/login';
import styles from 'css/main';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

const cxLogin = classNames.bind(stylesLogin);
const cx = classNames.bind(styles);

class LoginOrRegister extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={cxLogin('login')}>
        <div className={cxLogin('container')}>
          <div className={cx('align-center')}>
            <h5>Login</h5>
            <div className={cxLogin('alternative')}>
              In order to submit a proposal you must be logged-in
            </div>
            <div className={cx('align-center')}>
              <a className={cx('btn', 'gmail-btn')} href="/auth/google">Login with Google</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(LoginOrRegister);
