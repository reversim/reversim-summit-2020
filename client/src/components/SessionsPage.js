import React, {Fragment} from 'react';
import Page from './Page';
import values from 'lodash/values';
import {Container, Row, Col} from 'reactstrap';
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

          <div className='row d-flex mobile-flex-column-reverse'>
            <Col lg="9">
              {proposals.length ? (
                proposals.map(proposal => (
                  <Session
                    key={proposal._id}
                    proposal={proposal}
                    speakers={proposal.speaker_ids.map(speakerId => users[speakerId])}
                    eventConfig={eventConfig}
                  />
                ))
              ) : (
                <span className="font-mono font-size-xl">...</span>
              )}
            </Col>
            <Col lg="3">
              <FilterHeader
                text="Day"
                isCollapsed={this.state.dayCollapsed}
                onClick={() => this.setState(state => ({dayCollapsed: !state.dayCollapsed}))}
              />
              {
                <Fragment>
                  <div style={{transition: 'max-height 0.3s ease-in-out', maxHeight:(this.state.dayCollapsed ? 0: 1000), overflow:'auto'}} >
                  <div className="mb-4">
                    <DayFilter index={0} onChange={setExcludedDay} excludedDays={excludedDays} />
                  </div>
                  <div className="mb-8">
                    <DayFilter index={1} onChange={setExcludedDay} excludedDays={excludedDays} />
                  </div>
                  </div>
                </Fragment>
              }
              <FilterHeader
                text="Class"
                isCollapsed={this.state.hallCollapsed}
                onClick={() => this.setState(state => ({hallCollapsed: !state.hallCollapsed}))}
              />
              {
                <Fragment>
                  <div style={{transition: 'max-height 0.3s ease-in-out', maxHeight:(this.state.hallCollapsed ? 0: 1000), overflow:'auto'}} >
                  <div className="mb-4">
                    <HallFilter
                      index={0}
                      onChange={setExcludedHall}
                      excludedHalls={excludedHalls}
                    />
                  </div>
                  <div className="mb-4">
                    <HallFilter
                      index={1}
                      onChange={setExcludedHall}
                      excludedHalls={excludedHalls}
                    />
                  </div>
                  <div className="mb-4">
                    <HallFilter
                      index={2}
                      onChange={setExcludedHall}
                      excludedHalls={excludedHalls}
                    />
                  </div>
                  <div className="mb-8">
                    <HallFilter
                      index={3}
                      onChange={setExcludedHall}
                      excludedHalls={excludedHalls}
                    />
                  </div>
                  </div>
                </Fragment>
              }
              <FilterHeader
                text="Session type"
                isCollapsed={this.state.sessionTypeCollapsed}
                onClick={() =>
                  this.setState(state => ({sessionTypeCollapsed: !state.sessionTypeCollapsed}))
                }
              />
              {
                <Fragment>
                  <div style={{transition: 'max-height 0.3s ease-in-out', maxHeight:(this.state.sessionTypeCollapsed ? 0: 1000), overflow:'auto'}} >

                  <div className="mb-4">
                    <SessionTypeFilter
                      sessionType="full"
                      onChange={setExcludedSessionTypes}
                      excludedSessionTypes={excludedSessionTypes}
                    />
                  </div>
                  <div className="mb-4">
                    <SessionTypeFilter
                      sessionType="postmortem"
                      onChange={setExcludedSessionTypes}
                      excludedSessionTypes={excludedSessionTypes}
                    />
                  </div>
                  <div className="mb-4">
                    <SessionTypeFilter
                      sessionType="lightning"
                      onChange={setExcludedSessionTypes}
                      excludedSessionTypes={excludedSessionTypes}
                    />
                  </div>
                  <div className="mb-4">
                    <SessionTypeFilter
                      sessionType="ossil"
                      onChange={setExcludedSessionTypes}
                      excludedSessionTypes={excludedSessionTypes}
                    />
                  </div>
                  <div className="mb-8">
                    <SessionTypeFilter
                      sessionType="keynote"
                      onChange={setExcludedSessionTypes}
                      excludedSessionTypes={excludedSessionTypes}
                    />
                  </div>
                  </div>
                </Fragment>
              }
              <FilterHeader
                text="Tags"
                isCollapsed={this.state.tagCollapsed}
                onClick={() => this.setState(state => ({tagCollapsed: !state.tagCollapsed}))}
              />
              {
                <Fragment>
                  <div style={{transition: 'max-height 0.3s ease-in-out', maxHeight:(this.state.tagCollapsed ? 0: 1000), overflow:'auto'}} >
                  {Object.keys(TAG_COLORS).map(tag => (
                    <div className="mb-4" key={tag}>
                      <TagFilter tag={tag} onChange={setExcludedTags} excludedTags={excludedTags} />
                    </div>
                  ))}
                  </div>
                </Fragment>
              }
            </Col>
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
