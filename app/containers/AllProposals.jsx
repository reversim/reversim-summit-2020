import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import { StickyContainer, Sticky } from 'react-sticky';
import Speaker from 'components/Speaker';
import {Link} from 'react-router';
import { Element, Link as ScrollLink } from 'react-scroll';
import { fetchProposals } from 'actions/proposals';
import ReactMarkdown from 'react-markdown';
import features, { canUseLocalStorage } from 'features';
import ReactDOM from 'react-dom';
import Rodal from 'components/Rodal';
import SessionForm from 'components/SessionForm';
import NotificationSystem from 'react-notification-system';
import Attend, { AttendListButton } from 'components/Attend';
import LoginOrRegister from 'components/LoginOrRegister';
import ga from 'react-ga';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles);

const CollapsedProposalHeight = 80;
const votingOBKey = 'voting_ob';

class VotingOnBoarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      demoAttendButtonValue: false
    }
  }

  render() {
    const { onClose, authenticated } = this.props;

    return (
      <div className={cx('align-center')} style={{padding: 15}}>
        <h6>Proposals Review</h6>
        <p className={cx('align-left')} style={{width: '90%', marginTop: 30}}>
          You can now review the proposals and mark your favorite sessions by clicking on
          <AttendListButton style={{margin: '0 15px', padding:0}}
                            value={this.state.demoAttendButtonValue}
                            onClick={(event) => {
                              event.preventDefault();
                              this.setState({ demoAttendButtonValue: !this.state.demoAttendButtonValue });
                            } } /> button (you can try here!).
        </p>
        <p className={cx('align-left')} style={{width: '95%', marginTop: 30}}>
          Attendance count is confidential, and nobody else, except the moderation team, will see the results.
          { !authenticated ? 'You must be logged in to mark your favorite sessions!' : undefined }
        </p>
        <div style={{margin: '20px 0'}}>
          { authenticated ? <a href="#" onClick={onClose} className={cx('btn', 'btn-sm')}>Start Reviewing</a> : <a href='/auth/google?returnTo=/proposals' className={cx('btn', 'btn-sm', 'gmail-btn')}>Login to Review</a> }
        </div>
      </div>
    );
  }
}

class ProposalPreview extends Component {
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
    let actionButtonSize = 'col-xs-2'
    if (features('proposalsPageGroupedByTags', false)) {
      viewButton =
        <a className={cx((this.state.isOpen ? actionButtonSize : 'col-xs-3'), 'btn', 'btn-outline-clr', 'btn-sm', 'all-proposals-action-button', 'preview-proposal-button')} href={proposal.id} onClick={this.toggleFullView.bind(this)}>
          { this.state.isOpen ? 'Close' : 'View More' }
        </a>
    } else {
      viewButton = <Link to={`/session/${proposal.id}`} className={cx(actionButtonSize, 'btn', 'btn-outline-clr', 'btn-sm', 'all-proposals-action-button')}>View</Link>
    }

    let contentContainerStyle = {};
    if (features('proposalsPageGroupedByTags')) {
      contentContainerStyle = { maxHeight: this.state.contentHeight };
    }

    let showEditButton = isReversimTeamMember && (features('proposalsPageGroupedByTags') ? this.state.isOpen : true)

    let voting;
    if (features('voting')) {
      voting =
        <div className={cx('col-xs-11', 'col-md-4')}>
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
                    { features('proposalsPageGroupedByTags') ? <p><small><Link to={`/session/${proposal.id}`}>Permalink</Link></small></p> : undefined }
                  </div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('col-xs-12')}>
                      { viewButton }
                      { showEditButton ? <a onClick={this.editSession.bind(this)} href="#" className={cx(actionButtonSize, 'btn', 'btn-outline-clr', 'btn-sm', 'all-proposals-action-button')}>Edit</a> : undefined }
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

class AllProposals extends Component {

    static need = [  // eslint-disable-line
        fetchProposals
    ];

    constructor(props) {
        super(props);

        this.state = {
          votedSessionIdAsGuest: undefined,
          editingSession: undefined,
          showOnBoardingModal: false
        }
    }

    componentDidMount() {
      this.setState({
        showOnBoardingModal: features('voting', false) && canUseLocalStorage() && (window.localStorage.getItem(votingOBKey) === undefined || window.localStorage.getItem(votingOBKey) !== 'true')
      })
    }

    renderAllProposals() {
      const { proposals, user, location: { pathname } } = this.props;

      if (proposals.map !== undefined) {
        return proposals.map((proposal, i) => {
          return (
            <ProposalPreview  triggerLoginModal={() => this.openLoginModal(proposal.id)}
                              triggerEdit={this.editSession.bind(this)}
                              proposal={proposal}
                              user={user}
                              key={i}
                              location={pathname} />
          );
        });
      }

      return;
    }

    renderProposalsGroupedByTags() {
      let tags = Object.keys(this.props.proposals);

      return (
          <div style={{marginTop: 20}}>
            { tags.map((tag, index) => {
              return (
                <Element key={index} name={tag} ref={tag} style={{marginBottom: 50}}>
                  <h4 style={ {marginBottom: 30} }>{tag}</h4>
                {this.props.proposals[tag].map((proposal, i) => {
                  return (
                    <ProposalPreview  triggerLoginModal={() => this.openLoginModal(proposal.id)}
                                      triggerEdit={this.editSession.bind(this)}
                                      proposal={proposal}
                                      user={this.props.user}
                                      key={i}
                                      location={this.props.location.pathname} />
                                  );
                })}
                </Element>
              )
            }) }
          </div>
      )
    }

    closeEditModal(event) {
      event.preventDefault();

      this.setState({ editingSession: undefined });
    }

    editSession(session) {
      this.setState({ editingSession: session });

      ga.event({
        category: 'Proposals',
        action: 'Edit Session',
        label: session.id
      });
    }

    closeLoginModal(event) {
      event.preventDefault();

      this.setState({ votedSessionIdAsGuest: undefined });
    }

    openLoginModal(sessionId) {
      this.setState({ votedSessionIdAsGuest: sessionId });
    }

    closeOnBoardingModal(event) {
      event.preventDefault();

      this.setState({ showOnBoardingModal: false });
      localStorage.setItem(votingOBKey, true);
    }

    render() {
      const { user: { authenticated } } = this.props;

      let mainSection;

      if (features('proposalsPageGroupedByTags', false)) {
        let tags = Object.keys(this.props.proposals);

        mainSection =
          <StickyContainer ref="tags-container">
            <Sticky style={{backgroundColor: '#fff', zIndex: 4}}>
              <div style={{padding: '15px 0'}}>
                { tags.map((tag, index) => <ScrollLink onClick={() => ga.event({ category: 'Proposals', action: 'Click on Tag', label: tag})} activeClass={cx('active-tag')} to={tag} key={index} className={cx('label', 'label-info', 'session-tag')} spy={true} smooth={true} offset={-280} duration={250}>{tag}</ScrollLink>) }
              </div>
            </Sticky>

            { this.renderProposalsGroupedByTags() }
          </StickyContainer>
      } else {
        mainSection = this.renderAllProposals()
      }

      return (
          <BaseLayout currentPath={this.props.location.pathname} name="all-proposals">
            <NotificationSystem ref="notificationSystem" style={{ NotificationItem: { DefaultStyle: { marginTop: '120px', padding: '20px' } } } } />

            <Rodal  visible={this.state.editingSession}
                    width={700}
                    height={600}
                    onClose={this.closeEditModal.bind(this)}>
              { this.state.editingSession ? <SessionForm proposal={this.state.editingSession} notificationSystem={this.refs.notificationSystem} onFinishEdit={this.closeEditModal.bind(this)} onCancel={this.closeEditModal.bind(this)} /> : undefined }
            </Rodal>

            <Rodal  visible={this.state.votedSessionIdAsGuest}
                    width={500}
                    height={250}
                    onClose={this.closeLoginModal.bind(this)}>
              <LoginOrRegister loginQueryString={`returnTo=/session/${this.state.votedSessionIdAsGuest}?attend=true`} />
            </Rodal>

            <Rodal  visible={this.state.showOnBoardingModal}
                    width={600}
                    animation='slideDown'
                    duration={1000}
                    height={authenticated ? 310 : 340}
                    onClose={this.closeOnBoardingModal.bind(this)}>
                <VotingOnBoarding onClose={this.closeOnBoardingModal.bind(this)} authenticated={authenticated} />
            </Rodal>

            <section id="register" className={cx('section', 'overlay', 'header-bg', 'bg-my-proposals', 'light-text', 'align-center')}>
              <div className={cx("container")}>
                <h1>Reversim Summit 2016 - Proposals</h1>
              </div>
            </section>

            <section id="all-proposals" className={cx('section', 'container')}>
              <div className={cx("col-md-11", "col-md-offset-1")}>
                {mainSection}
              </div>
            </section>
        </BaseLayout>
      );
  }
}

AllProposals.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  proposals: PropTypes.any
};

AllProposals.defaultProps = { };

function mapStateToProps(state) {
    return {
        user: state.user,
        proposals: state.proposal.proposals
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(AllProposals);
