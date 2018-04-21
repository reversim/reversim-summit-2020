import React from 'react';
import Page from './Page';
import TeamMember from './TeamMember';
import { Col, Container, Row } from 'reactstrap';

const TeamPage = ({ team, ...props }) => (
  <Page title="Team" {...props}>
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mb-10">Meet the team</h1>
          { team.map(member => <TeamMember key={member._id} {...member} className="mb-8"/>)}
        </Col>
      </Row>
    </Container>
  </Page>
);

export default TeamPage;