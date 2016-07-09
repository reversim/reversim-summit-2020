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
import features from 'features';

import styles from 'css/main';

import defaultSpeakerPic from 'images/default_speaker.png'

const cx = classNames.bind(styles)

class AllProposals extends Component {

    static need = [  // eslint-disable-line
        fetchProposals
    ];

    constructor(props) {
        super(props);
    }

    renderSingleProposal(proposal, index) {
      const { user: { isReversimTeamMember } } = this.props;

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

      return (
        <section className={cx("section", "container")} style={ {padding: '0 30px 60px 0'} } key={index}>
          <div className={cx("col-md-8")} style={{paddingLeft: 0}}>
            <div className={cx('align-left')}>
              <article>
                { features('proposalsPageGroupedByTags', false) ? <h6>{proposal.title}</h6> : <h5>{proposal.title}</h5>}
                  <p><small style={{marginRight: 30}} className={cx("text-alt")}><span className={cx("highlight")}>{type}</span></small> {proposalTags}</p>
                  <ReactMarkdown source={proposal.abstract} className={cx("markdown-block")} />
                  <Link to={`/session/${proposal.id}`} className={cx('btn', 'btn-outline-clr', 'btn-sm')} style={{ margin: '20px 0 0' }}>View</Link>
              </article>
            </div>
          </div>
          <div className={cx("col-md-3")}>
          { proposal.speaker_ids.map((speaker, i) => {
              let email = isReversimTeamMember ? speaker.email : undefined;
            return (<Speaker key={i} name={speaker.name} email={email} imageUrl={speaker.picture || defaultSpeakerPic} oneLiner={speaker.oneLiner} linkedin={speaker.linkedin} twitter={speaker.twitter} stackOverflow={speaker.stackOverflow} isReversimTeamMember={isReversimTeamMember} />);
          })  }
          </div>
        </section>
      );
    }

    renderAllProposals() {
      const { proposals } = this.props;

      if (proposals.map !== undefined) {
        return proposals.map((proposal, i) => this.renderSingleProposal(proposal, i));
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
                  {this.props.proposals[tag].map((proposal, index) => this.renderSingleProposal(proposal, index))}
                </Element>
              )
            }) }
          </div>
      )
    }

    render() {
      let mainSection;

      if (features('proposalsPageGroupedByTags', false)) {
        let tags = Object.keys(this.props.proposals);

        mainSection =
          <StickyContainer>
            <Sticky style={{backgroundColor: '#fff', zIndex: 4}}>
              <div style={{padding: '15px 0'}}>
                { tags.map((tag, index) => <ScrollLink activeClass={cx('active-tag')} to={tag} key={index} className={cx('label', 'label-info', 'session-tag')} spy={true} smooth={true} offset={-200} duration={250}>{tag}</ScrollLink>) }
              </div>
            </Sticky>

            { this.renderProposalsGroupedByTags() }
          </StickyContainer>
      } else {
        mainSection = this.renderAllProposals()
      }

      return (
          <BaseLayout currentPath={this.props.location.pathname} name="all-proposals">

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
