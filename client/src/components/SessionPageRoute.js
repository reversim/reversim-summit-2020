import React from 'react';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';

const NoSessionFound = props => (
  <Page title="Whoops" {...props}>
    <Container>
      <Row>
        <Col>
          <h1 className="text-center my-12">Whoops, nothing here :/</h1>
        </Col>
      </Row>
    </Container>
  </Page>
);

export default Component => props => {
  const {
    match: {
      params: {id},
    },
    user,
    users,
    proposals,
    fetchComplete,
  } = props;
  let session = proposals[id];
  if (!fetchComplete) return null;
  if (!session) return <NoSessionFound user={user} {...props} />;

  const speakers = session.speaker_ids.map(id => users[id]);

  return <Component session={session} sessionSspeakers={speakers} {...props} />;
};
