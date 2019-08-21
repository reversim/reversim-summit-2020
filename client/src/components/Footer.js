import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'
import { Container, Row } from "reactstrap";
import { getLoginUrl } from "./Redirect";
import { faEnvelope, faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import cn from "classnames";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProposalForm from "./ProposalForm";
library.add(faFacebook, faTwitter, faEnvelope);

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
`;

const FooterStyle = styled.footer`
  padding: 50px;
  background-color: ${props => props.theme.bkgr};
  font-family: Source Code Pro, monospace;
`;

const List = styled.ul`
  display: flex;
  felx-direction: row;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ListItem = styled.li`
  display: flex;
  felx-direction: row;
  color: ${props => props.theme.color};
`;

const Link = styled.a`
  color: ${props => props.theme.color};
  font-size: 16px;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.color};
  }

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;

const theme = {
  bkgr: '#3312bc',
  color: 'white',
};

const Footer = () => (
  <ThemeProvider theme={theme}>
    <FooterStyle>
      <GlobalStyle />
      <List>
        <ListItem>
          <h6>Contact us:</h6>
          <a href="mailto:rs19team@googlegroups.com">
            <FontAwesomeIcon
              className="ml-2"
              color="white"
              icon={faEnvelopeSquare}
            />
          </a>
        </ListItem>

        <ListItem>
          <h6>Stay in touch:</h6>
          <a href="https://www.facebook.com/groups/reversim/">
            <FontAwesomeIcon
              className="ml-2"
              color="white"
              icon={faFacebook}
            />
          </a>
          <a href="https://twitter.com/reversim/">
            <FontAwesomeIcon
              className="ml-2"
              color="white"
              icon={faTwitter}
            />
          </a>
          <a href="https://groups.google.com/forum/#!forum/reversim-summit">
            <FontAwesomeIcon
              className="ml-2"
              color="white"
              icon={faEnvelope}
            />
          </a>
        </ListItem>

        <ListItem>
          <Link href="http://confcodeofconduct.com/">
          Code of Conduct
          </Link>
        </ListItem>

        <ListItem>
          <h6>All Rights Reserved © 2019</h6>
        </ListItem>
      </List>
    </FooterStyle>
  </ThemeProvider>
);

export default Footer;
