import React from 'react';
import Section from './Section';
import {Col, Row} from 'reactstrap';
import Timeline from './Timeline';

const TimelineSection = () => (
  <Section title="Timeline">
    <Row>
      <Col>
        <Timeline />
      </Col>
    </Row>
  </Section>
);

export default TimelineSection;
