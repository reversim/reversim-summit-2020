/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components';

import { faEnvelope, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AlignCenter } from './GlobalStyledComponents/ReversimStyledComps'
import mediaQueryMin from '../styles/MediaQueriesMixin';

library.add(faFacebook, faTwitter, faEnvelope);

const Footer = styled.footer`
  ${({ theme: { space, color, font }}) =>`
      width: 100%;
      margin: 0 auto;
      padding: ${space.xl};
      
      display: flex;

      background-color: ${color.background_3};
      font-family: ${font.main};

    `};
`;
const MainAligner = styled(AlignCenter)`
  flex-wrap: wrap;
  justify-content: center;
`
const List = styled.ul`
  width: 100%;
  display: flex; 
  justify-content: space-between;

  ${mediaQueryMin.xs`
    ${({ theme: { space } }) => `
      margin-bottom: ${space.xl};
    `}`}

  ${mediaQueryMin.l`
    ${({ theme: { space } }) => `
      margin-left: -${space.l};
      margin-bottom: 0;
      justify-content: space-between;
    `}`}
`;

const ListItem = styled.li`
    ${({ theme: {space} }) => `
      margin: 0 ${space.xl} 0  0;
    `}

    ${mediaQueryMin.l`
      ${({ theme: { space }}) =>`
      display: flex;
      margin: 0 ${space.m};
      `}
    `}
`;

const ListItemText = styled.h6`
${({ theme: { space, color } }) => `
  margin-right: ${space.m};
  color: ${color.text_1};
  `}

  ${mediaQueryMin.m`
    width: max-content;
  `}
`;

const AllRightsReserved = styled.h6`
  ${({ theme: { color } }) => `
    color: ${color.text_1};
  `}

  ${mediaQueryMin.xs`
    ${({ theme: { space } }) => `
      padding: 0 ${space.l};
    `}`}

  ${mediaQueryMin.l`
    ${({ theme: { space } }) => `
      margin-top: ${space.xl};
      flex-basis: 40%;
    `}`}
`;

const FontAwsomeContainer = styled.div`
  width: 30%;

  display: flex;
  justify-content: space-between;
  
  ${mediaQueryMin.xs`
    flex-wrap: wrap;
    width: fit-content;
  `}
  ${mediaQueryMin.m`
    flex-wrap: nowrap;
  `}
`;

const FooterIcon = styled(FontAwesomeIcon)`
 ${({theme: { space }}) =>`
  margin-right: ${space.m};
  `}
`;

const Link = styled.a`
  ${ ({ theme: { color }}) =>`
    color: ${color.text_1};
    font-size: 1rem;
    cursor: pointer;
    
    &:hover {
      text-decoration: none;
      color: ${color.text_1};
    };
  `}
`;

const FooterContainer = () => (
  <Footer>
    <MainAligner>
      <List>
        <ListItem>
          <ListItemText>Contact us:</ListItemText>
          <a href="mailto:rs19team@googlegroups.com">
            <FooterIcon
              color="white"
              icon={faEnvelopeSquare}
            />
          </a>
        </ListItem>

        <ListItem>
          <ListItemText>Stay in touch:</ListItemText>
          <FontAwsomeContainer>
            <a href="https://www.facebook.com/groups/reversim/">
              <FooterIcon
                color="white"
                icon={faFacebook}
              />
            </a>
            <a href="https://twitter.com/reversim/">
              <FooterIcon
                color="white"
                icon={faTwitter}
              />
            </a>
            <a href="https://groups.google.com/forum/#!forum/reversim-summit">
              <FooterIcon
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
        </List>
        <AllRightsReserved>All Rights Reserved © 2020</AllRightsReserved>
      </MainAligner>
  </Footer>
);

export default FooterContainer;
