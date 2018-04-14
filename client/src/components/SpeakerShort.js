import React from 'react';
import { Col, Row } from 'reactstrap';
import cn from 'classnames';
import s from './SpeakerPage.css';
import SpeakerSocialLinks from "./SpeakerSocialLinks";
import {Link} from "react-router-dom";
import { getSpeakerHref } from '../utils';

const SpeakerShort = ({ speaker, editable, hasLink }) => {
  const { name, picture, oneLiner } = speaker;

  const nameEl = [<h3 key="1">{name}</h3>,
    editable && <Link key="2" to={`/speaker/${speaker._id}/edit`}>Edit</Link> ];

  return <Row className={cn("align-items-center my-4", s.speakerShort)}>
    <Col sm="auto">
      <div className={s.speakerImg} style={{backgroundImage: `url('${picture}')`}}/>
    </Col>
    <Col>
      { hasLink ? <Link to={`/speaker/${getSpeakerHref(speaker)}`}>{nameEl}</Link> :
        <span>{nameEl}</span> }
      <div className="text-muted mb-2">{oneLiner}</div>
      <SpeakerSocialLinks {...speaker} className={cn(s.socialLinks, 'ml-0')}/>
    </Col>
  </Row>
};

export default SpeakerShort;