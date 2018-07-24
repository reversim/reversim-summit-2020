import React from 'react';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';

const NoUserFound = props => (
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
    fetchComplete,
  } = props;
  let speaker = users[id];
  if (!fetchComplete) return null;
  if (!speaker) return <NoUserFound user={user} {...props} />;

  const isUser = id === (user && user._id);

  return <Component speaker={speaker} isUser={isUser} {...props} />;
};
