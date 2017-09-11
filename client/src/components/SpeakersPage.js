import React from 'react';
import { colors } from '../utils';
import Page from "./Page";
import {Col, Container, Row} from "reactstrap";
import shuffle from "lodash/shuffle";
import Speaker from "./Speaker";

const SpeakerItem = (speaker, i) => {
  return <Col xs={{ size: 6, offset: 0}} className="mb-4" key={i}>
    <Speaker {...speaker} color={colors[i%colors.length]} isFull={true}/>
  </Col>
};

const SpeakesPage = ({ speakers, ...props}) => (
  <Page title="" {...props}>
    <Container>
      <h1 className="text-center my-5">Meet our speakers</h1>
      <Row>
        {shuffle(speakers.toJS()).map(SpeakerItem)}
      </Row>
    </Container>

  </Page>
);

export default SpeakesPage;