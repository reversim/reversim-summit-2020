import React from 'react';
import Page from './Page';
import {Button, Col, Container, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {REVERSIM_SUMMIT} from '../utils';

// TODO change dates

const RegisterPage = props => (
  <Page title="Register" {...props}>
    <Container className="line-height-17">
      <Row>
        <Col xl={{size: 8, offset: 2}}>
          <h1 className="text-center my-5">Register to {REVERSIM_SUMMIT}</h1>
          <h4 className="line-height-17 mb-5">
            Registration is for each day separately. Please check the{' '}
            <Link to="/schedule.html">schedule</Link> before you register. You are encouraged to
            register to both days.
          </h4>
          <h4 className="line-height-17 mb-5">
            We charge a symbolic sum of 50 ILS per day to prevent no-shows. All proceeds from
            ticketing will be donated to{' '}
            <a target="_blank" rel="noopener noreferrer" href="http://www.hasadna.org.il/">
              The Public Knowledge Workshop NGO (הסדנא לידע ציבורי)
            </a>. Receipts will be issued by the NGO.
          </h4>
          <p className="text-center my-5">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.eventbrite.com/e/reversim-2017-summit-tickets-37818245390">
              <Button size="lg">Register now</Button>
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  </Page>
);

export default RegisterPage;
