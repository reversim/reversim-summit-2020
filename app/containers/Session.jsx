import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import Speaker from 'components/Speaker';
import SocialShare from 'components/SocialShare';
import {updateProposal, fetchProposal, fetchProposalServerSideRendering, fetchProposals, fetchTags} from 'actions/proposals';
import NotificationSystem from 'react-notification-system';
import ga from 'react-ga';
import ReactMarkdown from 'react-markdown';
import features, { canUseDom } from 'features';
import TagInput from 'components/react-categorized-tag-input';
import Recommender from 'components/Recommender';
import SessionForm from 'components/SessionForm';
import Attend from 'components/Attend';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles)

class Session extends Component {

    static need = [
      fetchProposal
    ];

    constructor(props) {
      super(props);

      this.state = {
        isEditing: false
      };
    }

    componentWillReceiveProps(newProps) {
      const { dispatch, user, location: { query }, currentProposal } = newProps;

      if (features('voting', false) &&
          currentProposal &&
          !currentProposal.attended &&
          currentProposal.status !== 'archived' &&
          query &&
          query.attend) {
        Attend.attendSession(dispatch, currentProposal.id, user.id, currentProposal.speaker_ids.map(s => s._id), true, 'Login');
      }
    }

    isSpeaker(userId) {
      const { currentProposal: { speaker_ids }, user: { id, authenticated } } = this.props;

      if (authenticated && userId) {
        return userId === id;
      } else if (authenticated && speaker_ids) {
        return speaker_ids.map(speaker => speaker._id).indexOf(id) > -1;
      } else {
        return false;
      }
    }

    previewSession() {
      const { currentProposal: { title, abstract, type, attended, tags, speaker_ids, status }, user: { id, authenticated, isReversimTeamMember }, location } = this.props;

      let proposalType;
      if (type === 'ossil') {
        proposalType = "Open Source in Israel (10 min.)";
      } else if (type === 'lightning') {
        proposalType = "Lightning Talk (5 min.)";
      } else {
        proposalType = "Full Featured (30-40 min.)";
      }

      let action;
      const showEditButton =
        isReversimTeamMember ||
        features('editAcceptedProposals', false) && this.isSpeaker() && status === 'accepted' || 
        features('submission', false) && this.isSpeaker();

      if (showEditButton) {
        action = <div className={cx("row", "pull-right")} style={{margin: '50px 0'}}><a href="#" onClick={this.toggleEdit.bind(this)} className={cx('btn', 'btn-outline-clr', 'btn-sm')}>Edit</a></div>
      }

      let proposalTags;
      if (features('tagging', false) && tags && tags.length > 0) {
        proposalTags = <p><small className={cx("text-alt")}>{tags.map((tag, index) => <span className={cx('session-tag')} key={index}>#{tag}</span>)}</small></p>
      }

      let speakerTrackRecord;
      if (isReversimTeamMember) {
        speakerTrackRecord =
          <div style={{marginTop: 30}}>
            <h6>Speaker{speaker_ids && speaker_ids.length > 1 ? 's' : undefined} Track Record</h6>
            {speaker_ids && speaker_ids.map((speaker, i) => <ReactMarkdown key={i} source={speaker.trackRecord || ''} className={cx("markdown-block")} />)}
          </div>
      }

      let voting;
      if (features('voting', false) && speaker_ids) {
        if (this.props.currentProposal.status === 'archived') {
          voting =
            <div className={cx("row", "h7")} style={ {margin: '30px 0'} }>
              This session was archived.
            </div>
        } else {
          voting =
            <div className={cx("row", "h7")} style={ {margin: '30px 0'} }>
              <Attend to={this.props.currentProposal.id} speakers={speaker_ids.map(s => s._id)} value={attended} location={location.pathname} />
            </div>
        }
      }

      return (
        <div>
          <p><small className={cx("text-alt")}><span className={cx("highlight")}>{proposalType}</span></small></p>
          {proposalTags}
          <ReactMarkdown source={abstract || ''} className={cx("markdown-block")} />
          { speakerTrackRecord }
          { voting }
          { action }
          { canUseDom() ? <SocialShare url={window.location.href} title={this.isSpeaker() ? `My proposal to #ReversimSummit16: ${title}` : `#ReversimSummit16: ${title}`} /> : undefined }
          { features('recommendations', false) ? <Recommender id={this.props.currentProposal.id} /> : undefined }
        </div>
      );
    }

    toggleEdit(event) {
      event.preventDefault();

      const { user: { isReversimTeamMember }, params: { id } } = this.props;

      if (this.isSpeaker() || isReversimTeamMember) {
        this.setState({ isEditing: !this.state.isEditing });
        ga.event({
          category: 'Session',
          action: 'Edit Session',
          label: id
        });
      }
    }

    renderSessionInfo() {
      const { currentProposal, user: { id, isReversimTeamMember }, location: { pathname, query } } = this.props;

      let speakers;
      if (currentProposal && currentProposal.speaker_ids) {
        speakers = currentProposal.speaker_ids.map((speaker, i) => {
          let email = isReversimTeamMember ? speaker.email : undefined;
          return (
            <div className={cx("align-center")} key={i}>
              <Speaker  name={speaker.name}
                        imageUrl={speaker.picture || defaultSpeakerPic}
                        oneLiner={speaker.oneLiner}
                        bio={speaker.bio}
                        linkedin={speaker.linkedin}
                        twitter={speaker.twitter}
                        stackOverflow={speaker.stackOverflow}
                        email={email}
                        isReversimTeamMember={isReversimTeamMember} />
              {this.isSpeaker(speaker._id) ? <Link to={`my-profile`} state={{ from: pathname }} className={cx('btn', 'btn-outline-clr', 'btn-sm')}>Edit Bio</Link> : undefined}
            </div>
          );
        });
      }

      let sessionBody;
      if (currentProposal) {
        sessionBody = this.state.isEditing ? <SessionForm proposal={currentProposal} notificationSystem={this.refs.notificationSystem} onFinishEdit={this.toggleEdit.bind(this)} onCancel={this.toggleEdit.bind(this)} /> : this.previewSession()
      }

      let archivedWarning =
        <div className={cx('row')}>
          <div className={cx('col-md-10', 'col-md-offset-1')}>
            <div className={cx("alert", "alert-warning")} role="alert">This session was archived and is no longer a candidate for Reversim Summit 2016.</div>
          </div>
        </div>

      return (<div>
                <section id="register" className={cx('section', 'overlay', currentProposal ? `${currentProposal.status}-session-header` : '', 'header-bg', currentProposal ? `bg-${currentProposal.type}-session` : undefined, 'light-text', 'align-center')}>
                  <div className={cx("container")}>
                    <h2>{currentProposal ? currentProposal.title : undefined}</h2>
                  </div>
                </section>

                <section id="session-info" className={cx('section', 'container')}>

                  { currentProposal && currentProposal.status === 'archived' ? archivedWarning : undefined }

                  <div className={cx('col-md-6', 'col-md-offset-1')}>
                    { sessionBody }
                  </div>

                  <div className={cx('col-md-4', 'col-md-offset-1')}>
                    { speakers }
                  </div>
                </section>
              </div>);
    }

    render() {
        const { currentProposal } = this.props;

        return (
            <BaseLayout currentPath={this.props.location.pathname} name="session-page">
                <NotificationSystem ref="notificationSystem" style={{ NotificationItem: { DefaultStyle: { marginTop: '120px', padding: '20px' } } } } />
                { this.renderSessionInfo() }
            </BaseLayout>
        );
    }
}

Session.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  currentProposal: PropTypes.object,
  isFetching: PropTypes.bool
};

Session.defaultProps = { isFetching: true };

function mapStateToProps(state) {
    return {
        user: state.user,
        currentProposal: state.proposal.currentProposal,
        isFetching: state.proposal.isFetching
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Session);
