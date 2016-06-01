import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import stylesLogin from 'css/components/login';
import styles from 'css/main';
import hourGlassSvg from 'images/hourglass.svg';
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
    this.toggleMode = this.toggleMode.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { dispatch, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      dispatch(manualLogin({
        email,
        password
      }));
    } else {
      dispatch(signUp({
        email,
        password
      }));
    }
  }

  toggleMode() {
    this.props.dispatch(toggleLoginMode());
  }

  renderHeader() {
    const { isLogin } = this.props.user;
    if (isLogin) {
      return (
        <div className={cx('align-center')}>
          <h5>Login with Email</h5>
          <div className={cxLogin('alternative')}>
            Not what you want?
            <a className={cxLogin('alternative-link')}
              onClick={this.toggleMode}> Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div className={cx('align-center')}>
        <h5>Register with Email</h5>
        <div className={cxLogin('alternative')}>
          Already have an account?
          <a className={cxLogin('alternative-link')}
            onClick={this.toggleMode}> Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div className={cxLogin('login', {
        waiting: isWaiting
      })}>
        <div className={cxLogin('container')}>
          { this.renderHeader() }
          <img className={cxLogin('loading')} src={hourGlassSvg} />
          <div className={cxLogin('email-container')}>
            <form onSubmit={this.handleOnSubmit}>
              <input className={cxLogin('input')}
              type="email"
              ref="email"
              placeholder="email" />
            <input className={cxLogin('input')}
              type="password"
              ref="password"
              placeholder="password" />
              <p className={cxLogin('message', {
                'message-show': message && message.length > 0
              })}>{message}</p>
            <div className={cx('align-center')}>
              <input className={cx('btn', 'col-xs-4')}
                type="submit"
                value={isLogin ? 'Login' : 'Register'} />
                <a className={cx('btn', 'col-xs-7', 'gmail-btn')} href="/auth/google">Login with Google</a>
                </div>
            </form>
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
