import React from 'react';
import styled from 'styled-components';
import {Container} from './GlobalStyledComponents/ReversimStyledComps';
import {faEnvelope, faEnvelopeSquare} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(faFacebook, faTwitter, faEnvelope);

const Footer = styled.footer`
  ${props => {
    const {
      space,
      color,
      font,
    } = props.theme;

    return (`
      padding: ${space.xxl};
      background-color: ${color.background_3};
      font-family: ${font.main};
    `)
  }};
`;

const List = styled.ul`
  ${props => {
    return(`
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      @media (max-width: ${props.theme.mq.xl}) {
        min-height: 300px;
        flex-direction: column;
        justify-content: space-evenly;
      };    
    `)
  }}
  
`;

const ListItem = styled.li`
  ${props => {
    const {
      color,
      mq,
      space,
    } = props.theme;

    return (`
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    color: ${color.text_1};
    
    @media (max-width: ${mq.xl}) {
      display: flex;
      width: 100%;
      min-height: ${space.xxl};
      flex-direction: column;
      justify-content: space-between;
      margin: 0 ${space.l};
    };

    @media (max-width: ${mq.m}) {
      width: 100%;
      justify-content: space-between;
      margin: ${space.xl} 0;
    };
    `);
  }}
`;

const FontAwsomeContainer = styled.div`
  ${props => {
    return (`
      display: flex;
      justify-content: space-between;
      width: 30%;
      @media (max-width: ${props.theme.mq.xl}) {
        width: 30%;
      }
    `)
  }}
`;

const Link = styled.a`
  ${props => {
    const {
      color: {
        text_1,
      },
    } = props.theme;

    return (`
    color: ${text_1};
    font-size: 1rem;
    cursor: pointer;
    &:hover {
      text-decoration: none;
      color: ${text_1};
    };
    `);
  }}
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
