import React from 'react';
import {Col, Row} from "reactstrap";
import cn from 'classnames';
import s from './SpeakerPage.css';
import SpeakerSocialLinks from "./SpeakerSocialLinks";
import {Link} from "react-router-dom";

const SpeakerShort = (speaker) => {
  const { _id, name, picture, oneLiner } = speaker;

  return <Row className={cn("align-items-center my-4", s.speakerShort)}>
    <Col sm="auto">
      <div className={s.speakerImg} style={{backgroundImage: `url('${picture}')`}}/>
    </Col>
    <Col>
      <Link to={`/speaker/${_id}.html`}><h3>{name}</h3></Link>
      <div className="text-muted mb-2">{oneLiner}</div>
      <SpeakerSocialLinks {...speaker} className={cn(s.socialLinks, 'ml-0')}/>
    </Col>
  </Row>
};

export default SpeakerShort;