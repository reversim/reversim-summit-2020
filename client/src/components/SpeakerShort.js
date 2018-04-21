import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import cn from 'classnames';
import s from './SpeakerPage.css';
import SpeakerSocialLinks from "./SpeakerSocialLinks";
import {Link} from "react-router-dom";
import { getHref } from '../utils';

const SpeakerShort = ({ speaker, editable, hasLink }) => {
  const { name, picture, oneLiner } = speaker;

  const nameEl = <h3>{name}{editable && <Button color="primary" size="sm" className="ml-3"><Link to={`/speaker/${speaker._id}/edit`}><i className="fa fa-pencil"/></Link></Button>}</h3>;

  return <Row className={cn("align-items-center my-4", s.speakerShort)}>
    <Col sm="auto">
      <div className={s.speakerImg} style={{backgroundImage: `url('${picture}')`}}/>
    </Col>
    <Col>
      { hasLink ? <Link to={`/speaker/${getHref(speaker)}`}>{nameEl}</Link> :
        <span>{nameEl}</span> }
      <div className="text-muted mb-2">{oneLiner}</div>
      <SpeakerSocialLinks {...speaker} className={cn(s.socialLinks, 'ml-0')}/>
    </Col>
  </Row>
};

export default SpeakerShort;