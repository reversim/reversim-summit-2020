import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Speaker from 'components/Speaker';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';
import features from 'features';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Attend, { AttendListButton } from 'components/Attend';
import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles);

export default class ProposalPreview extends Component {
  constructor(props) {
    super(props);
  }

  editSession(event) {
    event.preventDefault();

    const { proposal, triggerEdit } = this.props;

    if (triggerEdit !== undefined) {
      triggerEdit(proposal);
    }
  }

  render() {
    const { user, proposal, location, triggerLoginModal } = this.props;

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

    let showEditButton = user !== undefined && user.isReversimTeamMember && this.props.triggerEdit;

    let voting;
    if (features('voting')) {
      voting =
        <div className={cx('col-xs-12', 'col-md-5')} style={{marginLeft: -15}}>
          <Attend type='list'
                  to={proposal.id}
                  speakers={proposal.speaker_ids && proposal.speaker_ids.map(s => s._id)}
                  value={proposal.attended}
                  guestState={triggerLoginModal && <AttendListButton value={false} onClick={triggerLoginModal} />}
                  location={location} />
        </div>
    }

    return (
      <section className={cx({"section": true, "container": true, "proposal-preview-expanded": true })} style={ {padding: '0 30px 60px 0'} }>
        <div className={cx("col-md-8")} style={{paddingLeft: 0}}>
          <div className={cx('align-left')}>
            <article>
              { features('proposalsPageGroupedByTags', false) ? <h6>{proposal.title}</h6> : <h5>{proposal.title}</h5>}
                <p><small style={{marginRight: 30}} className={cx("text-alt")}><span className={cx("highlight")}>{type}</span></small> {proposalTags}</p>

                <div className={cx({"proposal-content-container": features('proposalsPageGroupedByTags', false) })} ref="proposalPreview">
                  <div ref="proposal-content">
                    <ReactMarkdown source={proposal.abstract} className={cx("markdown-block")} />
                    { proposal.status === 'accepted' && proposal.startTime !== undefined ? (
                      <strong style={{marginBottom: 20}}>{ moment(proposal.startTime).format("dddd, MMM Do, HH:mm") + '  //  ' } { proposal.hall !== undefined ? proposal.hall : undefined }</strong>
                    ) : undefined }
                  { features('proposalsPageGroupedByTags') && <p><small><Link to={`/session/${proposal.id}`} className={cx('small')}>Permalink</Link></small></p> }
                  </div>
                </div>
                <div className={cx('row')} style={{marginTop: 30}}>
                    { showEditButton ? <a style={{ marginLeft: -15 }} onClick={this.editSession.bind(this)} href="#" className={cx('col-xs-1', 'proposals-list-action-button')}><span className={cx('fa', 'fa-pencil')}></span> Edit</a> : undefined }
                    { voting }
                </div>
            </article>
          </div>
        </div>
        <div className={cx("col-md-3")}>
        { proposal.speaker_ids && proposal.speaker_ids.map((speaker, i) => {
            let email = user !== undefined && user.isReversimTeamMember ? speaker.email : undefined;
            return (<Speaker  key={i}
                              name={speaker.name}
                              email={email}
                              imageUrl={speaker.picture || defaultSpeakerPic}
                              oneLiner={speaker.oneLiner}
                              linkedin={speaker.linkedin}
                              twitter={speaker.twitter}
                              stackOverflow={speaker.stackOverflow}
                              github={speaker.github}
                              isReversimTeamMember={user ? user.isReversimTeamMember : undefined} />);
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
