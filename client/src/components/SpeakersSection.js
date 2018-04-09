import React from 'react';
import Section from "./Section";
import { Container, Row, Col } from 'reactstrap';
import Speaker from './Speaker';
import { colors } from '../utils';

const SpeakerItem = (speaker, i) => {
  return <Col xs="12" sm="6" md="4" lg="3" className="mb-4" key={i}>
    <Speaker speaker={speaker} color={colors[i%colors.length]}/>
  </Col>
};

const SpeakersSection = ({speakers}) => {
  return <Section title="Speakers">
    <Container>
      <Row>
        {speakers.map(SpeakerItem)}
      </Row>
    </Container>
  </Section>
};

export default SpeakersSection;