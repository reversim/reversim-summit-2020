import React from 'react';
import Page from "./Page";
import { Container, Row, Col } from 'reactstrap';
import {getSessionTypeStr} from "../utils";
import heroImg from '../images/speaker.png';
import {Link} from "react-router-dom";
import Tag from './Tag';
import SpeakerShort from "./SpeakerShort";

const SpeakerPage = ({ speakers, match: { params: { id } }, ...props}) => {
  const speaker = speakers.toJS().find(x => x._id === id);
  if (!speaker || !speaker.sessions) return null;

  const { name, bio, sessions } = speaker;

  return <Page title={`${name} · Reversim Summit 2017`} {...props}>
    <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
    <Container>
      <Row>
        <Col sm={{size: 8, offset: 2}}>
          <SpeakerShort {...speaker}/>
          <Row noGutters={true} className="mb-5">
            <p>{bio}</p>
          </Row>
          <h4 className="mb-4">{`${name.split(" ")[0]}'s Session`}</h4>
          {sessions.map(session =>
            <div className="bg-faded p-3 mb-4">
              <p>{getSessionTypeStr(session.type)}</p>
              <div className="d-flex text-muted mb-3">{session.tags.map(Tag)}</div>
              <Link to={`/session/${session.id}`}><h5>{session.title}</h5></Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  </Page>
};

export default SpeakerPage;