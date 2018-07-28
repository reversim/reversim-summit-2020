import React from 'react';
import values from 'lodash/values';
import {Container, Row, Col} from 'reactstrap';

const Speaker = ({speaker: {name, bio, oneLiner, picture}}) => (
  <div>
    <img src={picture} alt={name} />
  </div>
);

const SpeakerItem = (speaker, i) => {
  return (
    <Col xs="12" sm="6" md="4" lg="3" className="mb-4" key={i}>
      <Speaker speaker={speaker} />
    </Col>
  );
};

const SpeakersSection = props => {
  const speakers = values(props.speakers);
  return (
    <section>
      <Container>
        <h1>Speakers</h1>
        <Row>{speakers.map(SpeakerItem)}</Row>
      </Container>
    </section>
  );
};

export default SpeakersSection;
