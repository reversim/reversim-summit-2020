import React from 'react';
import {Col, Container, Row} from "reactstrap";
import footerLogoImg from '../images/reversim_logo_footer.png';

const Footer = () => (
  <footer className="bg-gray-900 text-white p-5">
    <Container>
      <Row className="align-items-start mb-5">
        <Col xs="12" sm="auto">
          <img src={footerLogoImg} alt="Reversim"/>
        </Col>
        <Col>
          <h2 className="mb-5">About Reversim</h2>
          <p>
            <a href="http://reversim.com/">Reversim</a> (רברס עם פלטפורמה) is a Hebrew podcast by <a href="https://twitter.com/orilahav">Ori Lahav</a> and <a href="http://tavory.com/">Ran Tavory</a> which brings together software developers and product, with over 300 recorded episodes and a few thousands listeners.
          </p>
          <p>
            The summit is our intention to create a conference for developers by developers. Like in the podcast, we bring you the content we are interested in, and we hope you will be too.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="auto">
          <a href="mailto:rs17team@googlegroups.com">Contact</a>
        </Col>
        <Col xs="12" sm="auto">
          <a href="http://confcodeofconduct.com/">Code of Conduct</a>
        </Col>
        <Col xs="12" sm="auto" className="ml-sm-auto">
          <a className="mr-4" href="https://twitter.com/reversim" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"/></a>
          <a href="https://www.facebook.com/groups/806177629478248/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"/></a>
        </Col>
        <Col xs="12" sm="auto">
          <small className="text-muted">All Rights Reserved © 2018</small>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;