import React, {Fragment} from 'react';
import Page from './Page';
import values from 'lodash/values';
import {Container} from 'reactstrap';
import {TAG_COLORS} from '../data/proposals';
import {getDateAndTime} from './SessionDayTime';
import withFilters from './withFilters';
import intersection from 'lodash/intersection';
import Session from './Session';
import cn from "classnames";

const FilterHeader = ({text, isCollapsed, onClick}) => (
  <div
    className="border-purple2 font-size-md pb-2 mb-4 d-flex justify-content-between cursor-pointer"
    style={{borderBottomWidth: 2, borderBottomStyle: 'solid'}}
    onClick={onClick}>
    {text}
    <i className={`fa fa-chevron-${isCollapsed ? 'up' : 'down'} text-cyan`} />
  </div>
);

class SessionsPage extends React.Component {
  state = {
    dayCollapsed: false,
    hallCollapsed: false,
    sessionTypeCollapsed: false,
    tagCollapsed: false,
  };

  render() {
    const {
      isSmallScreen,
      users,
      setExcludedDay,
      excludedDays,
      setExcludedHall,
      excludedHalls,
      setExcludedSessionTypes,
      excludedSessionTypes,
      setExcludedTags,
      excludedTags,
      eventConfig
    } = this.props;

    const proposals = values(this.props.acceptedProposals).filter(proposal => {
      const {day, hall} = getDateAndTime(proposal._id);

      return (
        !excludedDays.includes(day) &&
        !excludedHalls.includes(hall) &&
        !excludedSessionTypes.includes(proposal.type) &&
        !intersection(excludedTags, proposal.tags.map(tag => tag.toLowerCase())).length
      );
    });

    return (
      <Page title="Sessions" {...this.props}>
        <div className='navbar-margin'>
        <Container>
          <h1 className="mt-6 mb-12">Sessions</h1>

          <div className="mb-4">
            {proposals.length ? `Showing ${proposals.length} sessions` : '\u00A0'}
          </div>

          <div className='d-flex mobile-flex-column-reverse'>
            <div>
              {proposals.length ? (
                proposals.map(proposal => (
                  <Session
                    key={proposal._id}
                    proposal={proposal}
                    speakers={proposal.speaker_ids.map(speakerId => users[speakerId])}
                    eventConfig={eventConfig}
                    location={getDateAndTime(proposal._id)}
                  />
                ))
              ) : (
                <span className="font-mono font-size-xl">...</span>
              )}
            </div>
          </div>
        </Container>
        </div>
      </Page>
    );
  }
}

const {
  Comp: SessionsPageWithFilters,
  HallFilter,
  DayFilter,
  SessionTypeFilter,
  TagFilter,
} = withFilters(SessionsPage, 'sessions');

export default SessionsPageWithFilters;
