import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/main';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ga from 'react-ga';
import {attendSession} from 'actions/proposals';

const cx = classNames.bind(styles);

const totalRecommendations = 3;

export const AttendListButton = ({ value, onClick, style, dataOrigin }) => {
  return (
    <a style={style} data-origin={dataOrigin} className={cx('proposals-list-action-button', 'attend-button', (value ? 'attend-button-enabled' : 'attend-button-disabled'))} href="#" onClick={onClick}>
      <span className={cx('fa', value ? 'fa-user-plus' : 'fa-user-times')} aria-hidden="true"></span> Will Attend
    </a>
  )
}

class Attend extends Component {
  constructor(props) {
    super(props);
  }

  static attendSession(dispatch, sessionId, userId, speakers, value, origin) {
    if (userId && !Attend.isSpeaker(userId, speakers)) {
      dispatch(attendSession(sessionId, value)).then(() => ga.event({
        category: origin || 'Unknown',
        action: value ? 'Attend Session' : 'Unvote Session',
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
        authenticated_voted: <span>We will count you in. Thanks for the cooperation! (won't come? <a href="#" onClick={this.toggleAttendance.bind(this)} data-origin="Session" style={{width:'20px'}}>click here</a>)</span>,
        authenticated: <span>Will you attend this session? <a href="#" onClick={this.toggleAttendance.bind(this)} className={cx('btn', 'btn-outline-clr', 'btn-sm')} data-origin="Session" style={{width:'20px'}}>Yes!</a></span>,
        not_authenticated: <span>Will you attend this session (You must be logged in)? <a href="#" onClick={this.toggleAttendance.bind(this)} className={cx('btn', 'btn-outline-clr', 'btn-sm')} data-origin="Session" style={{width:'20px'}}>Yes!</a></span>
      },
      list: {
        authenticated_voted: <AttendListButton dataOrigin="Proposals" style={this.props.style} value={this.props.value} onClick={this.toggleAttendance.bind(this)} />,
        authenticated: <AttendListButton  dataOrigin="Proposals" style={this.props.style} value={this.props.value} onClick={this.toggleAttendance.bind(this)} />,
        not_authenticated: <span></span>
      }
    }
  }

  toggleAttendance(event) {
    event && event.preventDefault();

    const { dispatch, to, user: { authenticated, id }, value, location, speakers } = this.props;

    if (authenticated && !this.isSpeaker()) {
      Attend.attendSession(dispatch, to, id, speakers, !value, event.target.getAttribute('data-origin'));
    } else if (!authenticated && window) {
      window.location.href = `/auth/google?returnTo=${location}`;
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
