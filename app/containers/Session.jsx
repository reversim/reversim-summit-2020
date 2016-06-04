import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import {fetchProposal} from 'actions/proposals';
import Speaker from 'components/Speaker';
import SocialShare from 'components/SocialShare';
import {updateProposal} from 'actions/proposals';
import NotificationSystem from 'react-notification-system';
import ga from 'react-ga';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles)

class Session extends Component {

    constructor(props) {
        super(props);

        this.state = {
          isEditing: false,
          proposalType: 'full'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProposalTypeChange = this.handleProposalTypeChange.bind(this);
    }

    componentWillMount() {
      const { params: { id } } = this.props;
      this.props.dispatch(fetchProposal(id)).then(() => this.setState({ proposalType: this.props.currentProposal.type }));
    }

    handleProposalTypeChange(event) {
      this.setState({ proposalType: event.target.value });
    }

    handleSubmit(event) {
      event.preventDefault();

      const { dispatch, user: { authenticated, id }, currentProposal } = this.props;

      if (authenticated && this.isSpeaker()) {
        const formElements = event.target.elements;

        const title = formElements.title.value;
        const proposalType = this.state.proposalType;
        const abstract = formElements.abstract.value;

        dispatch(updateProposal(currentProposal.id, {
          title: title,
          type: proposalType,
          abstract: abstract
        }))
        .then(() => this.setState({ isEditing: false }))
        .then(() => {
          this.refs.notificationSystem.addNotification({
            title: 'Proposal Updated!',
            level: 'success'
          });
        })
        .catch(e => ga.exception({
          description: `Error on editing session ${currentProposal.id} (${currentProposal.title}): ${e}`,
          fatal: true
        }));
      }
    }

    isSpeaker(userId) {
      const { currentProposal: { speaker_ids }, user: { id } } = this.props;
      if (userId) {
        return userId === id;
      } else {
        return speaker_ids.map(speaker => speaker._id).indexOf(id) > -1;
      }
    }

    editSession() {
      const { currentProposal: { title, abstract, type }, user: { id } } = this.props;

      let proposalType;
      if (type === 'ossil') {
        proposalType = "Open Source in Israel (10 min.)";
      } else if (type === 'lightning') {
        proposalType = "Lightning Talk (5 min.)";
      } else {
        proposalType = "Full Featured (30-40 min.)";
      }
      const abstractParagraphs = abstract.split('\n').map((paragraph, i) => <p key={i}>{paragraph}</p>);

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
            </fieldset>

            <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
              <input type="submit" value="save" className={cx('btn', 'btn-sm')} />
            </fieldset>

            <fieldset className={cx("col-xs-2", "col-xs-offset-2")} style={{marginTop: '30px'}}>
              <button title="cancel" className={cx('btn', 'btn-sm', 'btn-outline-clr')} onClick={this.toggleEdit.bind(this)}>Cancel</button>
            </fieldset>
        </form>
      );
    }

    previewSession() {
      const { currentProposal: { title, abstract, type }, user: { id } } = this.props;

      let proposalType;
      if (type === 'ossil') {
        proposalType = "Open Source in Israel (10 min.)";
      } else if (type === 'lightning') {
        proposalType = "Lightning Talk (5 min.)";
      } else {
        proposalType = "Full Featured (30-40 min.)";
      }
      const abstractParagraphs = abstract.split('\n').map((paragraph, i) => <p key={i}>{paragraph}</p>);

      return (
        <div>
          <p><small className={cx("text-alt")}><span className={cx("highlight")}>{proposalType}</span></small></p>
          {abstractParagraphs}
          { this.isSpeaker() ? <div className={cx("row", "pull-right")} style={{margin: '50px 0'}}><a href="#" onClick={this.toggleEdit.bind(this)} className={cx('btn', 'btn-outline-clr', 'btn-sm')}>Edit</a></div> : undefined }
          <SocialShare url={window.location.href} title={this.isSpeaker() ? `My proposal to #ReversimSummit16: ${title}` : `#ReversimSummit16: ${title}`} />
        </div>
      );
    }

    toggleEdit(event) {
      event.preventDefault();

      if (this.isSpeaker()) {
        this.setState({ isEditing: !this.state.isEditing });
      }
    }

    renderSessionInfo() {
      const { currentProposal: { title, type, speaker_ids }, user: { id } } = this.props;

      let speakers = speaker_ids.map((speaker, i) => {
        return (
          <div className={cx("align-center")} key={i}>
            <Speaker name={speaker.name} imageUrl={speaker.picture || defaultSpeakerPic} oneLiner={speaker.oneLiner} bio={speaker.bio} linkedin={speaker.linkedin} twitter={speaker.twitter}></Speaker>
          {this.isSpeaker(speaker._id) ? <Link to={`my-profile`} className={cx('btn', 'btn-outline-clr', 'btn-sm')}>Edit Bio</Link> : undefined}
          </div>
        );
      });

      return (<div>
                <section id="register" className={cx('section', 'overlay', `bg-${type}-session`, 'light-text', 'align-center')}>
                  <div className={cx("container")}>
                    <h2>{title}</h2>
                  </div>
                </section>

                <section id="session-info" className={cx('section', 'container')}>
                  <div className={cx('col-md-6', 'col-md-offset-1')}>
                    { this.state.isEditing ? this.editSession() : this.previewSession() }
                  </div>

                  <div className={cx('col-md-4', 'col-md-offset-1')}>
                    {speakers}
                  </div>
                </section>
              </div>);
    }

    render() {
        const { isFetching } = this.props;

        return (
            <BaseLayout currentPath={this.props.location.pathname} name="session-page">
                <NotificationSystem ref="notificationSystem" style={{ NotificationItem: { DefaultStyle: { marginTop: '120px', padding: '20px' } } } } />

                {isFetching ? undefined : this.renderSessionInfo()}
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
