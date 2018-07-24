import React from 'react';
import Page from './Page';
import Timeline from './Timeline';
import {Col, Container, Row} from 'reactstrap';
import {REVERSIM_SUMMIT} from '../utils';

const TimelinePage = props => (
  <Page title="Timeline" {...props}>
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">{REVERSIM_SUMMIT} timeline</h1>
          <Timeline />
        </Col>
      </Row>
    </Container>
  </Page>
);

export default TimelinePage;
