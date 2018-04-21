import React from 'react';
import Page from "./Page";
import { Container, Row, Col } from 'reactstrap';
import SessionPageRoute from './SessionPageRoute';
import Redirect from './Redirect';

const SessionEditPage = ({ session, ...props }) => (
  <Page title={`Edit ${session.title}`} {...props}>
    <Container className="my-8">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h1 className="my-4">Edit <b>{session.title}</b></h1>
        </Col>
      </Row>
    </Container>
  </Page>
);

export default Redirect(SessionPageRoute(SessionEditPage));