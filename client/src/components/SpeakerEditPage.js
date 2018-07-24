import React from 'react';
import SpeakerForm from './SpeakerForm';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';
import SpeakerPageRoute from './SpeakerPageRoute';
import Redirect from './Redirect';

const SpeakerEditPage = ({speaker, user, updateUserData, ...props}) => (
  <Page title={`Edit ${speaker.name}`} user={user} {...props}>
    <Container className="my-8">
      <Row>
        <Col sm={{size: 8, offset: 2}}>
          <h1 className="my-4">
            Edit <b>{speaker.name}'s</b> details
          </h1>
          <SpeakerForm user={speaker} updateUserData={updateUserData} {...props} />
        </Col>
      </Row>
    </Container>
  </Page>
);

export default Redirect(SpeakerPageRoute(SpeakerEditPage));
