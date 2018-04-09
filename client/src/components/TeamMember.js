import React from 'react';
import { Col, Row } from 'reactstrap';
import cn from 'classnames';
import { teamMember, teamImg } from './Team.css';

const TeamMember = ({ _id, name, oneLiner, picture, bio, className }) => (
  <Row className={cn(teamMember, className)}>
    <Col sm="auto" className="pb-8">
      <div className={cn(teamImg)} style={{ backgroundImage: `url('${picture}')` }}/>
    </Col>
    <Col className="border-bottom pb-8">
      <h4>{name}</h4>
      <p>{oneLiner}</p>
      <p>{bio}</p>
    </Col>
  </Row>
);

export default TeamMember;