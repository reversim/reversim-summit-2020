import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Speaker from 'components/Speaker';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';
import features from 'features';
import ReactDOM from 'react-dom';
import Attend, { AttendListButton } from 'components/Attend';
import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles);

const CollapsedProposalHeight = 80;

export default class ProposalPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      contentHeight: CollapsedProposalHeight
    }
  }

  toggleFullView(event) {
    event.preventDefault();

    let newState = { isOpen: !this.state.isOpen };
    if (this.state.isOpen === false) {
      newState.contentHeight = ReactDOM.findDOMNode(this.refs['proposal-content']).clientHeight;
    } else {
      newState.contentHeight = CollapsedProposalHeight
    }

    this.setState(newState);
  }

  editSession(event) {
    event.preventDefault();

    const { proposal, triggerEdit } = this.props;

    if (triggerEdit !== undefined) {
      triggerEdit(proposal);
    }
  }

  render() {
    const { user: { isReversimTeamMember }, proposal, location, triggerLoginModal } = this.props;

    let type;
    if (proposal.type === 'ossil') {
      type = "Open Source in Israel (10 min.)";
    } else if (proposal.type === 'lightning') {
      type = "Lightning Talk (5 min.)";
    } else {
      type = "Full Featured (30-40 min.)";
    }

    let proposalTags;
    if (features('tagging', false) && proposal.tags && proposal.tags.length > 0) {
      proposalTags = <small className={cx("text-alt")}>{proposal.tags.map((tag, index) => <span className={cx('session-tag')} style={{margin: '0 15px 0px 0'}} key={index}>#{tag}</span>)}</small>
    }

    let viewButton;
    if (features('proposalsPageGroupedByTags', false)) {
      viewButton =
        <a className={cx(this.state.isOpen ? 'col-xs-6' : 'col-xs-12', 'col-md-3', 'proposals-list-action-button', 'preview-proposal-button')} href={proposal.id} onClick={this.toggleFullView.bind(this)}>
          <span className={cx('fa', this.state.isOpen ? 'fa-arrow-up' : 'fa-arrow-down')}></span> { this.state.isOpen ? 'Close' : 'View More' }
        </a>
    } else {
      viewButton = <Link to={`/session/${proposal.id}`} className={cx('col-xs-2', 'proposals-list-action-button')}><span className={cx('fa', 'fa-terminal')}></span> View</Link>
    }

    let contentContainerStyle = {};
    if (features('proposalsPageGroupedByTags')) {
      contentContainerStyle = { maxHeight: this.state.contentHeight };
    }

    let showEditButton = isReversimTeamMember && this.props.triggerEdit && (features('proposalsPageGroupedByTags') ? this.state.isOpen : true)

    let voting;
    if (features('voting')) {
      voting =
        <div className={cx('col-xs-12', 'col-md-4')} width>
          <Attend type='list'
                  to={proposal.id}
                  speakers={proposal.speaker_ids && proposal.speaker_ids.map(s => s._id)}
                  value={proposal.attended}
                  guestState={<AttendListButton value={false} onClick={triggerLoginModal} />}
                  location={location} />
        </div>
    }

    return (
      <section className={cx({"section": true, "container": true, "proposal-preview-expanded": this.state.isOpen })} style={ {padding: '0 30px 60px 0'} }>
        <div className={cx("col-md-8")} style={{paddingLeft: 0}}>
          <div className={cx('align-left')}>
            <article>
              { features('proposalsPageGroupedByTags', false) ? <h6>{proposal.title}</h6> : <h5>{proposal.title}</h5>}
                <p><small style={{marginRight: 30}} className={cx("text-alt")}><span className={cx("highlight")}>{type}</span></small> {proposalTags}</p>

                <div className={cx({"proposal-content-container": features('proposalsPageGroupedByTags', false) })} style={contentContainerStyle} ref="proposalPreview">
                  <div ref="proposal-content">
                    <ReactMarkdown source={proposal.abstract} className={cx("markdown-block")} />
                  { features('proposalsPageGroupedByTags') ? <p><small><Link to={`/session/${proposal.id}`} className={cx('small')}>Permalink</Link></small></p> : undefined }
                  </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-xs-12')}>
                      { viewButton }
                      { showEditButton ? <a onClick={this.editSession.bind(this)} href="#" className={cx('col-xs-1', 'proposals-list-action-button')}><span className={cx('fa', 'fa-pencil')}></span> Edit</a> : undefined }
                      { voting }
                    </div>
                </div>
            </article>
          </div>
        </div>
        <div className={cx("col-md-3")}>
        { proposal.speaker_ids && proposal.speaker_ids.map((speaker, i) => {
            let email = isReversimTeamMember ? speaker.email : undefined;
            return (<Speaker  key={i}
                              name={speaker.name}
                              email={email}
                              imageUrl={speaker.picture || defaultSpeakerPic}
                              oneLiner={speaker.oneLiner}
                              linkedin={speaker.linkedin}
                              twitter={speaker.twitter}
                              stackOverflow={speaker.stackOverflow}
                              isReversimTeamMember={isReversimTeamMember} />);
        })  }
        </div>
      </section>
    );
  }
}

ProposalPreview.propTypes = {
  triggerEdit: PropTypes.func,
  proposal: PropTypes.object,
  triggerLoginModal: PropTypes.func,
  location: PropTypes.string,
  user: PropTypes.object
};
