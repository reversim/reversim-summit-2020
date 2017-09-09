import React from 'react';
import Section from "./Section";
import { Container, Row, Col } from 'reactstrap';
import Speaker from './Speaker';
import shuffle from 'lodash/shuffle';

const colors = [
  'purple',
  'gold',
  'cyan',
  'blue',
  'pink',
  'yellow',
  'green',
  'orange'
];

const SpeakerItem = (speaker, i) => {
  return <Col xs="12" sm="6" lg="4" className="mb-4">
    <Speaker {...speaker} color={colors[i%colors.length]}/>
  </Col>
};

const Speakers = ({speakers}) => {
  return <Section title="Speakers">
    <Container>
      <Row>
        {shuffle(speakers.toJS()).map(SpeakerItem)}
      </Row>
    </Container>
  </Section>
};

export default Speakers;