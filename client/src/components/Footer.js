import React from "react";
import { Container, Row } from "reactstrap";
import { getLoginUrl } from "./Redirect";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import cn from "classnames";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faFacebook, faTwitter, faEnvelope);

const Footer = ({ isSmallScreen }) => (
  <footer className="bg-purple3 py-6 font-size-md mt-13">
    <Container>
      <div className={isSmallScreen ? "d-flex justify-content-center" : ""}>
        <Row
          className={cn(
            "justify-content-center justify-content-lg-between text-white",
            isSmallScreen
              ? "d-flex flex-column w-max-content"
              : "align-items-center"
          )}
          noGutters
        >
          <div className={cn("d-flex", isSmallScreen ? "flex-column" : "")}>
            <div className="d-flex">
              <div>Contact us:</div>
              <a href="mailto:rs19team@googlegroups.com">
                <FontAwesomeIcon
                  className="ml-2"
                  color={"white"}
                  icon={faEnvelope}
                />
              </a>
            </div>
            <div className={cn("d-flex", !isSmallScreen ? "ml-7" : "")}>
              <div>Stay in touch:</div>
              <a href="https://www.facebook.com/groups/reversim/">
                <FontAwesomeIcon
                  className="ml-2"
                  color={"white"}
                  icon={faFacebook}
                />
              </a>
              <a href="https://twitter.com/reversim/">
                <FontAwesomeIcon
                  className="ml-2"
                  color={"white"}
                  icon={faTwitter}
                />
              </a>
            </div>
            <a
              className={cn("text-white", !isSmallScreen ? "ml-12" : "")}
              href="http://confcodeofconduct.com/"
            >
              Code of Conduct
            </a>
          </div>
          <div className="d-flex align-items-center text-white">
            All Rights Reserved © 2019
          </div>
        </Row>
      </div>
    </Container>
  </footer>
);

export default Footer;
