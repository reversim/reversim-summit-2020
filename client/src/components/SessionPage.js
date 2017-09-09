import React from 'react';
import Page from "./Page";
import heroImg from '../images/session.png';
import { Container, Row, Col } from 'reactstrap';
import {getSessionTypeStr} from "../utils";
import Tag from './Tag';
import SpeakerShort from "./SpeakerShort";
import ReactMarkdown from 'react-markdown';
import { agenda1, agenda2 } from '../data/agenda';

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
    } else if (typeof slot.sessions === "string") {
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
      })
    }
  });

  if (time) {
    return { day, time };
  }
};

const getDateAndTime = id => {
  let dayTime;
  if (dayTime = _getDateAndTime(0, id)) return dayTime;
  else return _getDateAndTime(1, id);
};

const dates = [
  "October 15, 2017",
  "October 16, 2017"
];


const SessionPage = ({ sessions, match: { params: { id }}}) => {
  const session = sessions.find(s => s.id === id);

  if (!session) return null;

  const { title, abstract, type, tags } = session;
  const speakers = session.speaker_ids;

  const dayTime = getDateAndTime(id);

  return (
    <Page title={`${session.title} · Reversim Summit 2017`}>
      <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
      <Container className="mt-4">
        <Row>
          <Col sm={{size: 8, offset: 2}}>
            <h4>{title}</h4>
            <p>{getSessionTypeStr(type)}</p>
            <div className="d-flex text-muted mb-3">{tags.map(Tag)}</div>
            <Row className="align-items-center my-4">
              <Col>
                <i className="fa fa-calendar-o mr-3"/><span className="mr-4">{dates[dayTime.day]}</span> {/* TODO */}
                <i className="fa fa-clock-o mr-3"/><span>{`${dayTime.time.substr(0,2)}:${dayTime.time.substr(2)}`}</span> {/* TODO */}
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="auto">
                {speakers.map(SpeakerShort)}
              </Col>
              <Col>
                <ReactMarkdown source={abstract}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Page>
  )
};

export default SessionPage;