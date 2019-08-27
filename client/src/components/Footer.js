import React from 'react';
import styled from 'styled-components';
import {Container} from './GlobalStyledComponents/Container';
import {faEnvelope, faEnvelopeSquare} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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
  };
`;

const ListItem = styled.li`
  display: flex;
  felx-direction: row;
  color: ${props => props.theme.textColor1};
  
  @media (min-width: 768px) {
    margin: 0 1rem;
  };
  @media (min-width: 360px){
    margin: 0.3rem 0;
  };
`;

const Link = styled.a`
  color: ${props => props.theme.textColor1};
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.textColor1};
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
          <h6>All Rights Reserved © 2020</h6>
        </ListItem>
      </List>
  </Container>
</Footer>
);

export default FooterContainer;
