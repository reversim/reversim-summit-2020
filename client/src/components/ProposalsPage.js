import React from 'react';
import Page from './Page';
import values from 'lodash/values';
import heroImg from '../images/session.png';
import { Col, Container, Row } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import { getSessionTypeStr, REVERSIM_SUMMIT } from '../utils';

import cn from 'classnames';
import s from './SpeakerPage.css';
import { Link } from 'react-router-dom';
import { getHref } from '../utils';
import SpeakerSocialLinks from "./SpeakerSocialLinks";
import Tag from './Tag';

const SpeakerVertical = ({ speaker }) => {
  const { name, picture, oneLiner } = speaker;

  const nameEl = <h3>{name}</h3>;

  return <Row className={cn("align-items-center", s.speakerShort)}>
    <Col xs="auto" sm={{size:true}}>
      <div className={cn(s.speakerImg, 'mx-auto mb-4')} style={{backgroundImage: `url('${picture}')`, height: 100, width: 100}}/>
    </Col>
    <Col className="text-sm-center">
      <Link to={`/speaker/${getHref(speaker)}`}>{nameEl}</Link>
      <div className="text-muted mb-2">{oneLiner}</div>
      <SpeakerSocialLinks {...speaker} className={cn(s.socialLinks, 'justify-content-sm-center')}/>
    </Col>
  </Row>
};


const Proposal = (props) => {
  const { proposal, speakers,isSmallScreen } = props;
  const { title, type, tags, abstract } = proposal;
  return <Row className={cn({'mb-8 mx-3 pt-3 bg-gray-200': isSmallScreen })}>
    <Col xs="12" sm={{ size: 7, offset: 1 }} className="mb-6 mb-sm-12">
      <Link className="unstyled-link" to={`/session/${getHref(proposal)}`}><h4>{title}</h4></Link>
      <div className="d-flex mb-3 font-size-sm">
        <div className="mr-10">{getSessionTypeStr(type)}</div>
        <div className="text-muted d-flex">{tags.map(Tag)}</div>
      </div>
      <ReactMarkdown source={abstract} />
    </Col>
    <Col xs="12" sm="3" className="ml-sm-4">
      {speakers.map(speaker => <SpeakerVertical key={speaker._id} speaker={speaker}/>)}
    </Col>
  </Row>;
};

const ProposalsPage = (props) => (
  <Page title="Proposals" {...props}>
    <div className="hero-page-img" style={{backgroundImage: `url('${heroImg}')`}}/>
    <Container>
      <Row>
        <Col>
          <h1 className="text-center my-6">Proposals to {REVERSIM_SUMMIT}</h1>
          {values(props.proposals).map(proposal => (
            <Proposal
              isSmallScreen={props.isSmallScreen}
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