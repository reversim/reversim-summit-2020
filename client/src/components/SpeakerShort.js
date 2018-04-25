import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import cn from 'classnames';
import s from './SpeakerPage.css';
import SpeakerSocialLinks from "./SpeakerSocialLinks";
import {Link} from "react-router-dom";
import { getHref } from '../utils';

const SpeakerShort = ({ speaker, editable, hasLink }) => {
  const { name, picture, oneLiner } = speaker;

  const nameEl = <h3>{name}{editable && <Link to={`/speaker/${speaker._id}/edit`}><Button color="primary" size="sm" className="ml-3"><i className="fa fa-pencil"/></Button></Link>}</h3>;

  return <Row className={cn("align-items-center my-4", s.speakerShort)}>
    <Col md="auto">
      <div className={cn(s.speakerImg, 'mx-auto mx-lg-0 mb-4 mb-lg-0')} style={{backgroundImage: `url('${picture}')`}}/>
    </Col>
    <Col className="text-center text-md-left">
      { hasLink ? <Link to={`/speaker/${getHref(speaker)}`}>{nameEl}</Link> :
        <span>{nameEl}</span> }
      <div className="text-muted mb-2">{oneLiner}</div>
      <SpeakerSocialLinks {...speaker} className={cn(s.socialLinks, 'justify-content-center justify-content-md-start')}/>
    </Col>
  </Row>
};

export default SpeakerShort;