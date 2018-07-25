import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import footerLogoImg from '../images/reversim_logo_footer.png';

const Footer = () => (
  <footer className="bg-indigo text-white py-9 font-size-md">
    <Container>
      <Row className="justify-content-between align-items-center" noGutters>
        <div className="d-flex">
          <a className="text-white mr-6" href="mailto:rs18-team@googlegroups.com">
            Contact
          </a>
          <a className="text-white" href="http://confcodeofconduct.com/">
            Code of Conduct
          </a>
        </div>
        <div className="d-flex align-items-center">
          <a
            className="mr-5 text-cyan font-size-lg"
            href="https://twitter.com/reversim"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fa fa-twitter" />
          </a>
          <a
            className="mr-7 text-cyan font-size-lg"
            href="https://www.facebook.com/groups/806177629478248/"
            target="_blank"
            rel="noopener noreferrer">
            <i className="fa fa-facebook" />
          </a>
          <span>All Rights Reserved © 2018</span>
        </div>
      </Row>
    </Container>
  </footer>
);

export default Footer;
