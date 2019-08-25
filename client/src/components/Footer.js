import React from 'react';
import styled from 'styled-components';
import {faEnvelope, faEnvelopeSquare} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Container} from 'reactstrap'; //was imported to check its behavior

library.add(faFacebook, faTwitter, faEnvelope);


const Footer = styled.footer`
  padding: 50px;
  background-color: ${props => props.theme.bgColor3};
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
  color: ${props => props.theme.textColor1};
`;

const Link = styled.a`
  color: ${props => props.theme.textColor1};
  font-size: 16px;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.textColor1};
  }

  @media (max-width: 1200px) {
    font-size: 14px;
  }
`;



const FooterContainer = () => (
<Footer>
  <Container>
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
  </Container>
</Footer>
);

export default FooterContainer;
