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
import ProposalPreview from 'components/ProposalPreview';
import ga from 'react-ga';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles);

const showAttendOnBoardingKey = 'show_attend_on_boarding';

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
          Attendance count is <strong>confidential</strong>, and nobody else, except the moderation team, will see the results. You can find more info <Link to='/attending-faq'>here</Link>.
          { !authenticated ? 'You must be logged in to mark your favorite sessions!' : undefined }
        </p>
        <div style={{margin: '20px 0'}}>
          { authenticated ? <a href="#" onClick={onClose} className={cx('btn', 'btn-sm')}>Start Reviewing</a> : <a href='/auth/google?returnTo=/proposals' className={cx('btn', 'btn-sm', 'gmail-btn')}>Login to Review</a> }
        </div>
      </div>
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
        showOnBoardingModal: features('voting', false) && canUseLocalStorage() && (window.localStorage.getItem(showAttendOnBoardingKey) === undefined || window.localStorage.getItem(showAttendOnBoardingKey) !== 'true')
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
      let tags = Object.keys(this.props.proposals).sort();

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
      localStorage.setItem(showAttendOnBoardingKey, true);
    }

    render() {
      const { user: { authenticated } } = this.props;

      let mainSection;
      if (features('proposalsPageGroupedByTags', false)) {
        let tags = Object.keys(this.props.proposals).sort();

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

      let votingInfoSection;
      if (features('voting', false)) {
        votingInfoSection =
          <div className={cx('alert', 'alert-info')} style={{marginBottom: 40}} role="alert">
            <strong>Mark your favorite sessions!</strong>
            <p>
              You can now review the proposals and mark your favorite sessions by clicking on <strong>Will Attend</strong> button.
            </p>
            <p>
              The proposals you marked as favorite will always be available in <Link to='/my-favorites' style={{color: '#000'}}>my favorites</Link> page.
            </p>
            <p>
              Have any questions about the process? more info <Link to='/attending-faq' style={{color: '#000'}}>here</Link>.
            </p>
          </div>
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

            <section className={cx('section', 'overlay', 'header-bg', 'bg-my-proposals', 'light-text', 'align-center')}>
              <div className={cx("container")}>
                <h1>Reversim Summit 2016 - Proposals</h1>
              </div>
            </section>

            <section id="all-proposals" className={cx('section', 'container')}>
              <div className={cx("col-md-11", "col-md-offset-1")}>
                {votingInfoSection}
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
