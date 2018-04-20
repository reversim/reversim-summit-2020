import React from 'react';
import SpeakerForm from './SpeakerForm';
import Page from "./Page";
import { Container, Row, Col } from 'reactstrap';
import SpeakerPageRoute from './SpeakerPageRoute';

class SpeakerEditPage extends React.Component {
  render() {
    const { speaker, user, updateUserData } = this.props;
    const { name } = speaker;

    return <Page title={`Edit ${name}`} user={user} {...this.props}>
      <Container className="my-8">
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <h1 className="my-4">Edit <b>{speaker.name}'s</b> details</h1>
            <SpeakerForm user={speaker} updateUserData={updateUserData} />
          </Col>
        </Row>
      </Container>
    </Page>
  };
}

export default SpeakerPageRoute(SpeakerEditPage);