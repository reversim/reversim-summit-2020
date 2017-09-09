import React from 'react';
import {Col, Row} from "reactstrap";
import cn from 'classnames';
import s from './SpeakerPage.css';
import SpeakerSocialLinks from "./SpeakerSocialLinks";

const SpeakerShort = (speaker) => {
  const { name, picture, oneLiner, bio, session } = speaker;

  return <Row className="align-items-center my-4">
    <Col sm="auto">
      <div className={s.speakerImg} style={{backgroundImage: `url('${picture}')`}}/>
    </Col>
    <Col>
      <h3>{name}</h3>
      <div className="text-muted mb-2">{oneLiner}</div>
      <SpeakerSocialLinks {...speaker} className={cn(s.socialLinks, 'ml-0')}/>
    </Col>
  </Row>
};

export default SpeakerShort;