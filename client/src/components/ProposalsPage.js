import React from 'react';
import Page from './Page';
import values from 'lodash/values';
import heroImg from '../images/session.png';
import { Col, Container, Row } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import { getSessionTypeStr } from '../utils';

import cn from 'classnames';
import s from './SpeakerPage.css';
import { Link } from 'react-router-dom';
import { getHref } from '../utils';
import SpeakerSocialLinks from "./SpeakerSocialLinks";

const SpeakerVertical = (speaker) => {
  const { name, picture, oneLiner } = speaker;
  return <div className={cn("align-items-center my-4", s.speakerShort)}>
    <div className={s.speakerImg} style={{ backgroundImage: `url('${picture}')` }} />
    <Link to={`/speaker/${getHref(speaker)}`}><h3>{name}</h3></Link>
    <div className="text-muted mb-2">{oneLiner}</div>
    <SpeakerSocialLinks {...speaker} className={cn(s.socialLinks, 'ml-0')}/>
  </div>
};


const Proposal = ({ proposal: { title, type, speaker_ids, tags, abstract }, speakers }) => (
  <Row>
    <Col xs="10" sm={{ size: 7, offset: 1 }} className="mb-5">
      <h4>{title}</h4>
      <p>{getSessionTypeStr(type)}</p>
      <div className="text-muted d-flex mb-3">{tags.map(tag => <span>{tag}</span>)}</div>
      <ReactMarkdown source={abstract}/>
    </Col>
    <Col xs="2" sm="3" className="mb-4 ml-4">
      {console.log('s', speakers)}
      {speakers.map(speaker => <SpeakerVertical key={speaker._id} speaker={speaker} />)}
    </Col>
  </Row>
);

const ProposalsPage = (props) => (
  <Page title="Proposals" {...props}>
    <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
    <Container>
      <Row>
        <Col>
          {values(props.proposals).map(proposal => (
            <Proposal
              key={proposal._id}
              proposal={proposal}
              speakers={proposal.speaker_ids.map(speakerId => props.users[speakerId])} />
          ))}
        </Col>
      </Row>
    </Container>
  </Page>
);

export default ProposalsPage;