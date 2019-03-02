import React from 'react';
import {Container, Row} from 'reactstrap';
import {getLoginUrl} from './Redirect';

const Footer = () => (
  <footer className="bg-purple3 py-6 font-size-md mt-13">
    <Container>
      <Row
        className="justify-content-center justify-content-lg-between align-items-center"
        noGutters>
        <div className="d-flex">
          <a className="mr-10 text-white" href="mailto:rs19team@googlegroups.com">
            Contact
          </a>
          <a className="text-white" href="http://confcodeofconduct.com/">
            Code of Conduct
          </a>
        </div>
        <span className="d-flex align-items-center text-white">All Rights Reserved © 2019</span>
      </Row>
    </Container>
  </footer>
);

export default Footer;
