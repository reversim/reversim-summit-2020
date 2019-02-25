import React from 'react';
import Page from './Page';
import {Container, Row, Col} from 'reactstrap';

const NoSponsorFound = props => (
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
      params: {name},
    },
    sponsors
  } = props;
  let sponsor = sponsors.filter(sponsor => sponsor.name === name)[0];
  if (!sponsor) return <NoSponsorFound {...props} />;
  return <Component sponsor={sponsor} {...props} />;
};
