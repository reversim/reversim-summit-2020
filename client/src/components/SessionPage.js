import React from 'react';
import Page from "./Page";
import heroImg from '../images/session.png';
import { Container, Row, Col } from 'reactstrap';
import {getSessionTypeStr} from "../utils";
import Tag from './Tag';
import SpeakerShort from "./SpeakerShort";
import ReactMarkdown from 'react-markdown';


const SessionPage = ({ sessions, match: { params: { id }}}) => {
  const session = sessions.find(s => s.id === id);

  if (!session) return null;

  const { title, abstract, type, tags } = session;
  const speakers = session.speaker_ids;

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
                <i className="fa fa-calendar-o mr-3"/><span className="mr-4">October 15, 2017</span> {/* TODO */}
                <i className="fa fa-clock-o mr-3"/><span>14:15 - 15:00</span> {/* TODO */}
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