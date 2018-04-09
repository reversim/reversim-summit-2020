import React from 'react';
import { colors } from '../utils';
import Page from "./Page";
import {Col, Container, Row} from "reactstrap";
import Speaker from "./Speaker";

const SpeakerItem = (speaker, i) => {
  return <Col xs="12" sm="6" className="mb-4" key={i}>
    <Speaker speaker={speaker} color={colors[i%colors.length]} isFull={true}/>
  </Col>
};

const SpeakesPage = ({ speakers, ...props}) => (
  <Page title="Speakers" {...props}>
    <Container>
      <h1 className="text-center my-5">Meet our speakers</h1>
      <Row>
        {speakers.map(SpeakerItem)}
      </Row>
    </Container>

  </Page>
);

export default SpeakesPage;