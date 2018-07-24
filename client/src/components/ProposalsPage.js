import React, {Fragment} from 'react';
import Page from './Page';
import values from 'lodash/values';
import heroImg from '../images/session.png';
import {Col, Container, Row} from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import {getSessionTypeStr, REVERSIM_SUMMIT} from '../utils';

import cn from 'classnames';
import s from './SpeakerPage.css';
import {Link} from 'react-router-dom';
import {getHref} from '../utils';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import Tag from './Tag';
import VoteButton from './VoteButton';

const SpeakerVertical = ({speaker}) => {
  const {name, picture, oneLiner} = speaker;

  const nameEl = <h3>{name}</h3>;

  return (
    <Row className={cn('align-items-center', s.speakerShort)}>
      <Col xs="auto" sm="12">
        <div
          className={cn(s.speakerImg, 'mx-auto mb-4')}
          style={{backgroundImage: `url('${picture}')`, height: 100, width: 100}}
        />
      </Col>
      <Col className="text-sm-center">
        <Link to={`/speaker/${getHref(speaker)}`}>{nameEl}</Link>
        <div className="text-muted mb-2">{oneLiner}</div>
        <SpeakerSocialLinks
          {...speaker}
          className={cn(s.socialLinks, 'justify-content-sm-center')}
        />
      </Col>
    </Row>
  );
};

const Proposal = props => {
  const {proposal, speakers, isSmallScreen, attended, attendProposal, user, eventConfig} = props;
  const {voting} = eventConfig;
  const {_id, title, type, tags, abstract} = proposal;
  return (
    <Row className={cn({'proposal mb-8 mx-3 pt-3 bg-gray-200': isSmallScreen})}>
      <Col xs="12" sm={{size: 7, offset: 1}} className="mb-6 mb-sm-12">
        <Link className="unstyled-link" to={`/session/${getHref(proposal)}`}>
          <h4>{title}</h4>
        </Link>
        <Row className="d-flex font-size-sm" noGutters>
          <Col xs="12" lg="auto" className="mb-1 mr-10">
            {getSessionTypeStr(type)}
          </Col>
          <Col className="text-muted d-flex mb-3">{tags.map(Tag)}</Col>
        </Row>
        <ReactMarkdown source={abstract} />
        {voting && (
          <div>
            <VoteButton
              user={user}
              attended={attended}
              proposalId={_id}
              attendProposal={attendProposal}
            />
          </div>
        )}
        {user && user.isReversimTeamMember && <span>Total: {proposal.total}</span>}
      </Col>
      <Col xs="12" sm="3" className="ml-sm-4">
        {speakers.map(speaker => <SpeakerVertical key={speaker._id} speaker={speaker} />)}
      </Col>
    </Row>
  );
};

const TagFilter = ({text, isSelected, onClick}) => (
  <div
    onClick={onClick}
    className={cn(
      'font-size-sm letter-spacing cursor-pointer mr-2 mb-2 px-2 border-radius border',
      {'border-blue text-blue': !isSelected, 'bg-blue text-white border-transparent': isSelected},
    )}>
    {text}
  </div>
);

class ProposalsPage extends React.Component {
  state = {
    tagFilters: [],
    orderByTotal: false,
  };

  static defaultProps = {
    eventConfig: {},
  };

  onTagClick = tag => {
    this.setState(state => {
      const index = state.tagFilters.indexOf(tag);
      if (index > -1) {
        return {
          tagFilters: state.tagFilters.slice(0, index).concat(state.tagFilters.slice(index + 1)),
        };
      } else {
        return {tagFilters: state.tagFilters.concat(tag)};
      }
    });
  };

  render() {
    const proposals = values(this.props.proposals);
    const {
      allTags,
      isSmallScreen,
      fetchComplete,
      users,
      attendProposal,
      user,
      eventConfig,
    } = this.props;
    const {tagFilters} = this.state;
    const showProposals = proposals.length || !fetchComplete;
    const tags = allTags
      .map(tag => ({text: tag, count: proposals.filter(p => p.tags.includes(tag)).length}))
      .sort((a, b) => (a.count > b.count ? -1 : 1));
    const tagStrs = tags.map(tag => `${tag.text} (${tag.count})`);
    const tagfilteredProposals = tagFilters.length
      ? proposals.filter(proposal => proposal.tags.some(tag => tagFilters.includes(tag)))
      : proposals;
    const filteredProposals = this.props.myVotes
      ? tagfilteredProposals.filter(proposal => proposal.attended)
      : tagfilteredProposals;
    const sortedProposals = this.state.orderByTotal
      ? filteredProposals.sort((a, b) => b.total - a.total)
      : filteredProposals;
    const showCount = sortedProposals.length;
    return (
      <Page title="Proposals" {...this.props}>
        <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}} />
        <Container>
          <Row>
            <Col>
              <h1 className="text-center mt-6 mb-12">Proposals to {REVERSIM_SUMMIT}</h1>
              {!this.props.myVotes && (
                <Fragment>
                  <div className="pt-4 border-top mb-3">Filter by tag:</div>

                  <div className="d-flex flex-wrap pb-2 mb-6 border-bottom">
                    {tagStrs.map((tagStr, i) => (
                      <TagFilter
                        key={tagStr}
                        text={tagStr}
                        isSelected={tagFilters.includes(tags[i].text)}
                        onClick={() => this.onTagClick(tags[i].text)}
                      />
                    ))}
                  </div>
                </Fragment>
              )}
              {showProposals ? (
                <div>
                  <div className="mb-6">Showing {showCount} proposals</div>
                  {user &&
                    user.isReversimTeamMember && (
                      <Fragment>
                        <input
                          type="checkbox"
                          id="order"
                          onChange={() => this.setState(s => ({orderByTotal: !s.orderByTotal}))}
                        />
                        <label htmlFor="order" className="text-info">
                          Order by score (Admin only)
                        </label>
                      </Fragment>
                    )}
                  {sortedProposals.map(proposal => (
                    <Proposal
                      isSmallScreen={isSmallScreen}
                      key={proposal._id}
                      proposal={proposal}
                      speakers={proposal.speaker_ids.map(speakerId => users[speakerId])}
                      attended={proposal.attended}
                      attendProposal={attendProposal}
                      user={user}
                      eventConfig={eventConfig}
                    />
                  ))}
                </div>
              ) : (
                <h2 className="text-center mb-6 bg-gray-200 py-3 line-height-17">
                  Nothing yet :-( <br /> Be the first to{' '}
                  <Link to="/cfp" className="text-underline">
                    <b>submit!</b>
                  </Link>
                </h2>
              )}
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

export default ProposalsPage;
