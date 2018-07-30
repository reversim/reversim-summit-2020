import React from 'react';
import {Container, Row, Button} from 'reactstrap';
import IconLink from './IconLink';
import {getLoginUrl} from './Redirect';

const Footer = ({user}) => (
  <footer className="bg-darkblue2 py-9 font-size-md">
    <Container>
      <Row className="justify-content-between align-items-center" noGutters>
        <div className="d-flex">
          <a className="text-white mr-6" href="mailto:rs18-team@googlegroups.com">
            Contact
          </a>
          <a className="text-white" href="http://confcodeofconduct.com/">
            Code of Conduct
          </a>
          {!user && (
            <a href={getLoginUrl()} className="text-white ml-6">
              Login
            </a>
          )}
        </div>
        <div className="d-flex align-items-center">
          <IconLink href="https://twitter.com/reversim" icon="twitter" isLarge className="mr-5" />
          <IconLink
            href="https://www.facebook.com/groups/806177629478248/"
            icon="facebook"
            isLarge
            className="mr-7"
          />
          <span>All Rights Reserved © 2018</span>
        </div>
      </Row>
    </Container>
  </footer>
);

export default Footer;
