import React from 'react';
import styled from 'styled-components';
import {Container} from './GlobalStyledComponents/Container';
import {faEnvelope, faEnvelopeSquare} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(faFacebook, faTwitter, faEnvelope);

const Footer = styled.footer`
  padding: ${props => props.theme.space.xxl};
  background-color: ${props => props.theme.color.background_3};
  font-family: Source Code Pro, monospace;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and ${props => props.theme.mq.tablet_landscape} {
    min-height: 300px;
    flex-direction: column;
    justify-content: space-evenly;
  };
`;

const ListItem = styled.li`
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: ${props => props.theme.color.text_1};
  @media only screen and ${props => props.theme.mq.tablet_landscape} {
    display: flex;
    width: 100%;
    min-height: ${props => props.theme.space.xxl};
    flex-direction: column;
    justify-content: space-between;
    margin: 0 ${props => props.theme.space.l};
  };
  @media only screen and ${props => props.theme.mq.tablet} {
    width: 100%;
    justify-content: space-between;
    margin: ${props => props.theme.space.xl} 0;
  };
`;

const FontAwsomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  @media only screen and ${props => props.theme.mq.tablet_landscape} {
    width: 30%;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.color.text_1};
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
              color="white"
              icon={faEnvelopeSquare}
            />
          </a>
        </ListItem>

        <ListItem>
          <h6>Stay in touch:</h6>
          <FontAwsomeContainer>
            <a href="https://www.facebook.com/groups/reversim/">
              <FontAwesomeIcon
                color="white"
                icon={faFacebook}
              />
            </a>
            <a href="https://twitter.com/reversim/">
              <FontAwesomeIcon
                color="white"
                icon={faTwitter}
              />
            </a>
            <a href="https://groups.google.com/forum/#!forum/reversim-summit">
              <FontAwesomeIcon
                color="white"
                icon={faEnvelope}
              />
            </a>
          </FontAwsomeContainer>
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
