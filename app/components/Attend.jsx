import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ga from 'react-ga';
import {attendSession} from 'actions/proposals';

const cx = classNames.bind(styles);

const totalRecommendations = 3;

export const AttendListButton = ({ value, onClick, style }) => {
  return (
    <a style={style} className={cx('btn', 'attend-button', (value ? 'attend-button-enabled' : 'attend-button-disabled'), 'btn-sm', 'all-proposals-action-button')} href="#" onClick={onClick}>
      <span className={cx('fa', value ? 'fa-user-plus' : 'fa-user-times')} aria-hidden="true"></span> Will Attend
    </a>
  )
}

class Attend extends Component {
  constructor(props) {
    super(props);
  }

  static attendSession(dispatch, sessionId, userId, speakers, value) {
    if (userId && !Attend.isSpeaker(userId, speakers)) {
      dispatch(attendSession(sessionId, value)).then(() => ga.event({
        category: 'Session',
        action: 'Attend Session',
        label: sessionId
      }));
    }
  }

  static isSpeaker(userId, speakers) {
    if (speakers && speakers.length > 0) {
      return speakers.indexOf(userId) >= 0;
    }

    return false;
  }

  getStyles() {
    return {
      session: {
        authenticated_voted: <span>We will count you in. Thanks for the cooperation!</span>,
        authenticated: <span>Will you attend this session? <a href="#" onClick={this.attendSession.bind(this)} className={cx('btn', 'btn-outline-clr', 'btn-sm')} style={{width:'20px'}}>Yes!</a></span>,
        not_authenticated: <span>Will you attend this session (You must be logged in)? <a href="#" onClick={this.attendSession.bind(this)} className={cx('btn', 'btn-outline-clr', 'btn-sm')} style={{width:'20px'}}>Yes!</a></span>
      },
      list: {
        authenticated_voted: <AttendListButton value={this.props.value} onClick={this.attendSession.bind(this)} />,
        authenticated: <AttendListButton value={this.props.value} onClick={this.attendSession.bind(this)} />,
        not_authenticated: <span></span>
      }
    }
  }

  attendSession(event) {
    event && event.preventDefault();

    const { dispatch, to, user: { authenticated, id }, value, location, speakers } = this.props;

    if (authenticated && !this.isSpeaker()) {
      Attend.attendSession(dispatch, to, id, speakers, !value);
    } else if (!authenticated && window) {
      window.location.href = `/auth/google?returnTo=${location}?attend=true`;
    }
  }

  isSpeaker() {
    const { user: { id }, speakers } = this.props;

    return Attend.isSpeaker(id, speakers);
  }

  render() {
    const { value, user: { authenticated }, type, guestState } = this.props;

    if (!this.isSpeaker()) {
      if (authenticated) {
        if (!value) {
          return this.getStyles()[type || 'session'].authenticated;
        } else {
          return this.getStyles()[type || 'session'].authenticated_voted;
        }
      } else {
        return guestState || this.getStyles()[type || 'session'].not_authenticated;
      }
    }

    return <span></span>;
  }
}

Attend.propTypes = {
  dispatch: PropTypes.func.isRequired,
  value: PropTypes.bool,
  to: PropTypes.string.isRequired,
  speakers: PropTypes.array,
  user: PropTypes.object,
  location: PropTypes.string,
  type: PropTypes.oneOf(['list', 'session']),
  guestState: PropTypes.element
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Attend);
