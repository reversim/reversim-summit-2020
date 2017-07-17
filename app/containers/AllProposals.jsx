import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import {Link} from 'react-router';
import { Element, Link as ScrollLink } from 'react-scroll';
import { fetchProposals, fetchTags } from 'actions/proposals';
import features, { canUseLocalStorage } from 'features';
import Rodal from 'components/Rodal';
import SessionForm from 'components/SessionForm';
import NotificationSystem from 'react-notification-system';
import Attend, { AttendListButton } from 'components/Attend';
import LoginOrRegister from 'components/LoginOrRegister';
import ProposalPreview from 'components/ProposalPreview';
import ga from 'react-ga';
import shuffler from 'shuffle-seed';
import _ from 'lodash';
import pluralize from 'pluralize';

import styles from 'css/main';

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
        fetchProposals,
        fetchTags
    ];

    constructor(props) {
        super(props);

        this.state = {
          votedSessionIdAsGuest: undefined,
          editingSession: undefined,
          showOnBoardingModal: false,
          filter: []
        }
    }

    componentDidMount() {
      this.setState({
        showOnBoardingModal: features('voting', false) && canUseLocalStorage() && (window.localStorage.getItem(showAttendOnBoardingKey) === undefined || window.localStorage.getItem(showAttendOnBoardingKey) !== 'true')
      })
    }

    renderProposals(proposals) {
      const { user, location: { pathname } } = this.props;

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

    renderProposalsGroupedByTags() {
      let tags = Object.keys(this.props.proposals).sort();

      return (
          <div style={{marginTop: 20}}>
            { tags.map((tag, index) => {
              let shuffledProposals = this.props.proposals[tag];
              if (this.props.user.id !== undefined) {
                shuffledProposals = shuffler.shuffle(shuffledProposals, this.props.user.id);
              }

              return (
                <Element key={index} name={tag} ref={tag} style={{marginBottom: 50}}>
                  <h4 style={ {marginBottom: 30} }>{tag}</h4>
                {shuffledProposals.map((proposal, i) => {
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

    filterTag(tag) {
      if (this.state.filter) {
        if (this.state.filter.indexOf(tag) >= 0) {
          this.setState({ filter: this.state.filter.filter(t => t !== tag) });
        } else {
          this.setState({ filter: [...this.state.filter, tag] });
        }
      } else {
        this.setState({ filter: [tag] })
      }

      ga.event({ category: 'Proposals', action: 'Click on Tag', label: tag});
    }

    filterByType(type) {
      if (this.state.typeFilter === type) {
        this.setState({
          typeFilter: null
        })
      } else {
        this.setState({
          typeFilter: type
        });
      }
    }

    render() {
      const { user: { authenticated }, tags, proposals } = this.props;
      const tagCount = {};
      proposals.forEach(p => {
        p.tags.forEach(tag => {
          tagCount[tag] = tagCount[tag] !== undefined ? tagCount[tag] + 1 : 1;
        });
      });
      const sortedTags = tags.sort((t1, t2) => {
        const diff = tagCount[t2] - tagCount[t1];
        return diff || (t2 > t1 ? 1 : -1);
      });

      let proposalsToRender = proposals;
      if (this.state.filter && this.state.filter.length > 0) {
        proposalsToRender = proposals.filter(p => _.some(this.state.filter, tag => p.tags.indexOf(tag) >= 0));
      }

      if (this.state.typeFilter) {
        proposalsToRender = proposalsToRender.filter(p => p.type === this.state.typeFilter);
      }

      const totalCount = proposalsToRender.length;

      let tagsBar;
      if (features('proposalsPageGroupedByTags', false) && tags) {
        tagsBar =
          <div style={{padding: '15px 0'}}>
            { sortedTags.map((tag, index) => <a onClick={(event) => { event.preventDefault; this.filterTag(tag) }} className={cx({'active-tag': this.state.filter && this.state.filter.indexOf(tag) >= 0, 'label': true, 'label-info': true, 'session-tag': true})} key={index}>{tag} ({tagCount[tag]})</a> )}
          </div>
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

      let subheaderContent;
      if (features('proposalsPageGroupedByTags') && this.state.filter && this.state.filter.length > 0) {
        subheaderContent = this.state.filter.join(', ');
      } else {
        subheaderContent = 'All proposals';
      }

      const subheader = (
        <div>
          <h4 style={ {marginBottom: 20, letterSpacing: 1} }>{subheaderContent}</h4>
          <div style={{ marginBottom: 20, marginLeft: -7 }}>
            <button className={cx('btn', 'btn-sm', 'filter-btn', { active: this.state.typeFilter === 'full'})} onClick={() => this.filterByType('full')}>Full talks</button>
            <button className={cx('btn', 'btn-sm', 'filter-btn', { active: this.state.typeFilter === 'lightning'})} onClick={() => this.filterByType('lightning')}>Lightning talks</button>
            <button className={cx('btn', 'btn-sm', 'filter-btn', { active: this.state.typeFilter === 'ossil'})} onClick={() => this.filterByType('ossil')}>Open source</button>
          </div>
          <div style={{ marginBottom: 60 }}><small>Showing {totalCount} {pluralize('result', totalCount)}</small></div>
        </div>);

      return (
          <BaseLayout currentPath={this.props.location.pathname} name="all-proposals">
            <NotificationSystem ref="notificationSystem" style={{ NotificationItem: { DefaultStyle: { marginTop: '120px', padding: '20px' } } } } />
            <svg width="0" height="0" viewBox="0 0 2000 80" style={{display:'none'}}>
              <defs>
                <mask id="textFade">
                  <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="100%">
                    <stop offset="0.5" stopColor="white" />
                    <stop offset="1" stopColor="black" stopOpacity="0.5"/>
                  </linearGradient>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)"/>
                </mask>
              </defs>
            </svg>
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
                <h1>Reversim Summit 2017 - Proposals</h1>
              </div>
            </section>

            <section id="all-proposals" className={cx('section', 'container')} style={{ marginTop: 60 }}>
              <div className={cx("col-md-11", "col-md-offset-1")}>
                {votingInfoSection}
                {tagsBar}
                {subheader}
                {this.renderProposals(proposalsToRender)}
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
    let propsFromState = {
        user: state.user,
        proposals: state.proposal.proposals
    };

    if (features('proposalsPageGroupedByTags', false)) {
      propsFromState.tags = state.proposal.tags;
    }

    return propsFromState;
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(AllProposals);
