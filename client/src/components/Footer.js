import React from "react";
import { Container, Row } from "reactstrap";
import { getLoginUrl } from "./Redirect";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faFacebook, faTwitter, faEnvelope);

const Footer = () => (
  <footer className="bg-purple3 py-6 font-size-md mt-13">
    <Container>
      <Row
        className="justify-content-center justify-content-lg-between align-items-center"
        noGutters
      >
        <div className="d-flex">
          <div className="mr-10 text-white d-flex">
            <div className="mr-2">Contact us:</div>
            <a href="mailto:rs19team@googlegroups.com">
              <FontAwesomeIcon
                className="mr-2"
                color={"white"}
                icon={faEnvelope}
              />
            </a>
            <div className="mr-2 ml-5">Stay in touch:</div>
            <a href="https://www.facebook.com/groups/reversim/">
              <FontAwesomeIcon
                className="mr-2"
                color={"white"}
                icon={faFacebook}
              />
            </a>
            <a href="https://twitter.com/reversim/">
              <FontAwesomeIcon
                className="mr-2"
                color={"white"}
                icon={faTwitter}
              />
            </a>
          </div>
          <a className="text-white" href="http://confcodeofconduct.com/">
            Code of Conduct
          </a>
        </div>
        <span className="d-flex align-items-center text-white">
          All Rights Reserved © 2019
        </span>
      </Row>
    </Container>
  </footer>
);

export default Footer;
