import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import Speaker from 'components/Speaker';
import SocialShare from 'components/SocialShare';
import {updateProposal, attendSession, fetchProposal, fetchProposalServerSideRendering, fetchProposals, fetchTags} from 'actions/proposals';
import NotificationSystem from 'react-notification-system';
import ga from 'react-ga';
import ReactMarkdown from 'react-markdown';
import features from 'features';
import TagInput from 'components/react-categorized-tag-input';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles)

class SessionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      proposalType: 'full',
      tags: []
    }
  }

  taggingEnabled() {
    const { user: { isReversimTeamMember } } = this.props;

    return features('tagging', false) && isReversimTeamMember;
  }

  componentWillMount() {
    const { dispatch, currentProposal: { type, tags } } = this.props;

    if (this.taggingEnabled()) {
      dispatch(fetchTags());
    }

    if (!this.state.isEditing) {
      this.setState({ proposalType: type, tags: tags.map(tag => { return { category: 'Topics', title: tag } }) });
    }
  }

  isSpeaker(userId) { // TODO: Duplicate, refactor
    const { currentProposal: { speaker_ids }, user: { id, authenticated } } = this.props;

    if (authenticated && userId) {
      return userId === id;
    } else if (authenticated && speaker_ids) {
      return speaker_ids.map(speaker => speaker._id).indexOf(id) > -1;
    } else {
      return false;
    }
  }

  handleProposalTypeChange(event) {
    this.setState({ proposalType: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { dispatch, user: { authenticated, id, isReversimTeamMember }, currentProposal, onFinishEdit } = this.props;

    if (authenticated && (isReversimTeamMember || this.isSpeaker())) {
      const formElements = event.target.elements;

      const title = formElements.title.value;
      const proposalType = this.state.proposalType;
      const abstract = formElements.abstract.value;

      let updatedProposal = {
        title: title,
        type: proposalType,
        abstract: abstract
      };

      if (this.taggingEnabled()) {
        updatedProposal.tags = this.state.tags.map(tag => tag.title);
      }

      dispatch(updateProposal(currentProposal.id, updatedProposal))
      .then(() => {
        this.props.notificationSystem.addNotification({
          title: 'Proposal Updated!',
          level: 'success'
        });

        onFinishEdit(event);
      })
      .catch(e => ga.exception({
        description: `Error on editing session ${currentProposal.id} (${currentProposal.title}): ${e}`,
        fatal: true
      }));
    }
  }

  render() {
    const { allTags, currentProposal: { title, abstract, type, tags }, user: { id, isReversimTeamMember } } = this.props;

    let proposalType;
    if (type === 'ossil') {
      proposalType = "Open Source in Israel (10 min.)";
    } else if (type === 'lightning') {
      proposalType = "Lightning Talk (5 min.)";
    } else {
      proposalType = "Full Featured (30-40 min.)";
    }

    let categories = [ {
      id: 'topics',
      title: 'Topics',
      type: 'topic',
      items: allTags || []
    } ]

    let tagsInput;
    if (this.taggingEnabled()) {
      tagsInput =
        <fieldset>
          <span className={cx("col-xs-12")}>
            <label htmlFor="title">Tags</label>
          </span>
          <span className={cx("col-xs-12")}>
            <TagInput
              categories={categories}
              addNew={true}
              onChange={(tags) => this.setState({tags})}
              value={this.state.tags}
            />
          </span>
        </fieldset>
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)} className={cx('form')}>
          <fieldset>
            <span className={cx("col-xs-12")}>
              <label htmlFor="title">Title</label>
            </span>
            <span className={cx("col-xs-12")}>
              <input id="title" ref="title" type="text" defaultValue={title} required />
            </span>
          </fieldset>

          {tagsInput}

          <fieldset>
            <span className={cx("col-xs-12")}>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "full"} value="full" /> <label htmlFor="full">Full Featured (30-40 min.)</label></div>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "lightning"} value="lightning" /> <label htmlFor="lightning">Lightning Talk (5 min.)</label></div>
              <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "ossil"} value="ossil" /> <label htmlFor="ossil">Open Source in Israel (10 min.)</label></div>
            </span>
          </fieldset>

          <fieldset>
            <span className={cx("col-xs-12")}>
              <label htmlFor="abstract">Abstract</label>
            </span>
            <span className={cx("col-xs-12")}>
              <textarea id="abstract" ref="abstract" required defaultValue={abstract} />
            </span>
            <small className={cx("col-xs-8")}>Markdown syntax is supported</small>
          </fieldset>

          <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
            <input type="submit" value="save" className={cx('btn', 'btn-sm')} />
          </fieldset>

          <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
            <button title="cancel" className={cx('btn', 'btn-sm', 'btn-outline-clr')} onClick={this.props.onCancel}>Cancel</button>
          </fieldset>
      </form>
    );
  }
}

SessionForm.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  currentProposal: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onFinishEdit: PropTypes.func.isRequired,
  allTags: PropTypes.array
};

SessionForm = connect((state) => {
  return {
      user: state.user,
      currentProposal: state.proposal.currentProposal,
      allTags: state.proposal.tags
  };
})(SessionForm);

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

    componentWillMount() {
      const { location: { query }, currentProposal } = this.props;

      if (query && query.attend && query.attend === "true") {
        this.attendSession();
      }
    }

    attendSession(event) {
      event && event.preventDefault();

      const { dispatch, params: { id }, user: { authenticated }, currentProposal: { attended }, location: { pathname } } = this.props;

      if (authenticated && !attended && !this.isSpeaker()) {
        dispatch(attendSession(id)).then(() => ga.event({
          category: 'Session',
          action: 'Attend Session',
          value: id
        }));
      } else if (!authenticated && window) {
        window.location.href = `/auth/google?returnTo=${pathname}?attend=true`
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
      const { currentProposal: { title, abstract, type, attended, tags }, user: { id, authenticated, isReversimTeamMember }, location } = this.props;

      let proposalType;
      if (type === 'ossil') {
        proposalType = "Open Source in Israel (10 min.)";
      } else if (type === 'lightning') {
        proposalType = "Lightning Talk (5 min.)";
      } else {
        proposalType = "Full Featured (30-40 min.)";
      }

      let action, voting;
      if (isReversimTeamMember || features('submission', false) && this.isSpeaker()) {
        action = <div className={cx("row", "pull-right")} style={{margin: '50px 0'}}><a href="#" onClick={this.toggleEdit.bind(this)} className={cx('btn', 'btn-outline-clr', 'btn-sm')}>Edit</a></div>
      }

      if (features('voting', false) && !this.isSpeaker()) {
        // voting is open
        if (authenticated && attended) {
          voting = <div className={cx("row", "h7")} style={ {margin: '30px 0'} }>We will count you in. Thanks for the cooperation!</div>
        } else if (!attended) {
          voting = <div className={cx("row", "h7")} style={ {margin: '30px 0'} }>
                      Will you attend this session {!authenticated ? "(You must be logged in)" : undefined}? <a href="#" onClick={this.attendSession.bind(this)} className={cx('btn', 'btn-outline-clr', 'btn-sm')} style={{width:'20px'}}>Yes!</a>
                   </div>
        }
      }

      let canUseDom = typeof window !== 'undefined' && window.document && window.document.createElement;

      let proposalTags;
      if (features('tagging', false) && tags && tags.length > 0) {
        proposalTags = <p><small className={cx("text-alt")}>{tags.map((tag, index) => <span className={cx('session-tag')} key={index}>#{tag}</span>)}</small></p>
      }

      return (
        <div>
          <p><small className={cx("text-alt")}><span className={cx("highlight")}>{proposalType}</span></small></p>
          {proposalTags}
          <ReactMarkdown source={abstract} className={cx("markdown-block")} />
          { voting }
          { action }
          { canUseDom ? <SocialShare url={window.location.href} title={this.isSpeaker() ? `My proposal to #ReversimSummit16: ${title}` : `#ReversimSummit16: ${title}`} /> : undefined }
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
          action: 'Toggle edit',
          value: id
        });
      }
    }

    renderSessionInfo() {
      const { currentProposal, user: { id }, location: { pathname, query } } = this.props;

      let speakers;
      if (currentProposal && currentProposal.speaker_ids) {
        speakers = currentProposal.speaker_ids.map((speaker, i) => {
          return (
            <div className={cx("align-center")} key={i}>
              <Speaker name={speaker.name} imageUrl={speaker.picture || defaultSpeakerPic} oneLiner={speaker.oneLiner} bio={speaker.bio} linkedin={speaker.linkedin} twitter={speaker.twitter} stackOverflow={speaker.stackOverflow} />
              {this.isSpeaker(speaker._id) ? <Link to={`my-profile`} state={{ from: pathname }} className={cx('btn', 'btn-outline-clr', 'btn-sm')}>Edit Bio</Link> : undefined}
            </div>
          );
        });
      }

      let sessionBody;
      if (currentProposal) {
        sessionBody = this.state.isEditing ? <SessionForm notificationSystem={this.refs.notificationSystem} onFinishEdit={this.toggleEdit.bind(this)} onCancel={this.toggleEdit.bind(this)} /> : this.previewSession()
      }

      return (<div>
                <section id="register" className={cx('section', 'overlay', 'header-bg', currentProposal ? `bg-${currentProposal.type}-session` : undefined, 'light-text', 'align-center')}>
                  <div className={cx("container")}>
                    <h2>{currentProposal ? currentProposal.title : undefined}</h2>
                  </div>
                </section>

                <section id="session-info" className={cx('section', 'container')}>
                  <div className={cx('col-md-6', 'col-md-offset-1')}>
                    { sessionBody }
                  </div>

                  <div className={cx('col-md-4', 'col-md-offset-1')}>
                    {speakers}
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
