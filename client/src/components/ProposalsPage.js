import React from 'react';
import Page from './Page';
import cn from 'classnames';
import {Col, Container, Row} from 'reactstrap';
import Session from './Session';
import values from 'lodash/values';

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
  componentDidMount() {
    if (!this.props.gotAllProposals) {
      this.props.getAllProposals();
    }
  }

  state = {
    tagFilters: [],
    orderByTotal: false,
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
    const {allTags, isSmallScreen, users, gotAllProposals} = this.props;

    const {tagFilters} = this.state;
    const showProposals = !!gotAllProposals;
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
        <Container>
          <h1 className="mt-6 mb-12">Proposals</h1>

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
          {showProposals ? (
            <React.Fragment>
              <div className="mb-4">Showing {showCount} proposals</div>
              <Row>
                <Col>
                  {sortedProposals.map(proposal => (
                    <Session
                      isSmallScreen={isSmallScreen}
                      key={proposal._id}
                      proposal={proposal}
                      speakers={proposal.speaker_ids.map(speakerId => users[speakerId])}
                    />
                  ))}
                </Col>
              </Row>
            </React.Fragment>
          ) : (
            <span className="font-mono font-size-xl">Nothing to show :-(</span>
          )}
        </Container>
      </Page>
    );
  }
}

export default ProposalsPage;
