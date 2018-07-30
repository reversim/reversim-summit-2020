import React from 'react';
import Page from './Page';
import {Container, Row, Col, Button} from 'reactstrap';
import {getHref, getSessionTypeStr} from '../utils';
import Tag from './Tag';
import ReactMarkdown from 'react-markdown';
import {agenda1, agenda2} from '../data/agenda';
import {Link} from 'react-router-dom';
import SessionPageRoute from './SessionPageRoute';
import VoteButton from './VoteButton';

import cn from 'classnames';
import SpeakerSocialLinks from './SpeakerSocialLinks';
import {img, body} from './Speaker2.css';

const Speaker = ({speaker}) => {
  const {name, oneLiner, picture, twitter, github, linkedin, stackOverflow} = speaker;
  return (
    <Link to={`/speaker/${getHref(speaker)}`} className="text-white unstyled-link">
      <div className="d-flex align-items-start">
        <div style={{backgroundImage: `url('${picture}')`}} alt={name} className={img} />
        <div className={cn('pt-8 pb-4 pl-8 pr-4 mt-4 bg-emph')} style={{marginLeft: -20}}>
          <div className="font-size-md font-weight-bold mb-4">{name}</div>
          <div className="font-size-sm mb-7">{oneLiner}</div>
          <SpeakerSocialLinks {...{twitter, github, linkedin, stackOverflow}} />
        </div>
      </div>
    </Link>
  );
};

const agenda = [agenda1, agenda2];

const _getDateAndTime = (index, id) => {
  let day, time;
  agenda[index].forEach(slot => {
    if (time) return;

    if (Array.isArray(slot.sessions)) {
      slot.sessions.forEach(ss => {
        if (ss === id) {
          day = index;
          time = slot.time;
        } else if (ss && ss.sessions) {
          ss.sessions.forEach(sss => {
            if (sss === id) {
              day = index;
              time = slot.time;
            }
          });
        }
      });
    } else if (typeof slot.sessions === 'string') {
      if (slot.sessions === id) {
        day = index;
        time = slot.time;
      }
    } else if (slot.shortSessions) {
      slot.shortSessions.forEach(ss => {
        if (ss === id) {
          day = index;
          time = slot.time;
        }
      });
    }
  });

  if (time) {
    return {day, time};
  }
};

const getDateAndTime = id => {
  return _getDateAndTime(0, id) || _getDateAndTime(1, id);
};

const dates = ['October 8, 2018', 'October 9, 2018'];

const SessionPage = props => {
  const {
    user,
    session,
    sessionSspeakers,
    attendProposal,
    eventConfig,
    match: {
      params: {id},
    },
  } = props;
  const {voting} = eventConfig;
  const {title, abstract, type, tags, outline, categories, attended} = session;
  const isAuthor = user && session.speaker_ids.includes(user._id);
  const isTeamMember = user && user.isReversimTeamMember;
  const canEdit = isAuthor || isTeamMember;

  const dayTime = getDateAndTime(id);

  return (
    <Page title={session.title} {...props}>
      <Container className="mt-4">
        <div className="bg-emph p-5 mb-8">
          <h3 className="font-weight-heavy">
            {title}
            {canEdit && (
              <Link className="unstyled-link" to={`/session/${getHref(session)}/edit`}>
                <Button color="primary" size="sm" className="ml-3">
                  <i className="fa fa-pencil" />
                </Button>
              </Link>
            )}
          </h3>
          <div className="d-flex mb-2">
            <div className="mr-8">{getSessionTypeStr(type)}</div>
            <div className="d-flex">{tags.map(Tag)}</div>
          </div>
          {dayTime && (
            <Row className="align-items-center my-4">
              <Col>
                <i className="fa fa-calendar-o mr-3" />
                <span className="mr-4">{dates[dayTime.day]}</span>
                <i className="fa fa-clock-o mr-3" />
                <span>{`${dayTime.time.substr(0, 2)}:${dayTime.time.substr(2)}`}</span>
              </Col>
            </Row>
          )}
          {voting ? (
            <VoteButton
              user={user}
              attended={attended}
              proposalId={id}
              attendProposal={attendProposal}
            />
          ) : (
            undefined
          )}
          <div className="font-size-sm">
            <ReactMarkdown source={abstract} />
          </div>
          {categories && (
            <div>
              <h4>Categories</h4>
              <ul>
                {categories.map(cat => (
                  <li key={cat} className="mr-2">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {outline && (
            <div>
              <h4>Outline</h4>
              <ReactMarkdown source={outline.replace(/\n/g, '<br/>\n')} />{' '}
              {/* consolidate line breaks */}
            </div>
          )}
        </div>
        <div className="mb-10">
          {sessionSspeakers.map(speaker => <Speaker key={speaker._id} speaker={speaker} />)}
        </div>
      </Container>
    </Page>
  );
};

export default SessionPageRoute(SessionPage);
