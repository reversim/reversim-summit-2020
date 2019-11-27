import React from "react";
import styled from "styled-components";

import mediaQueryMin from '../styles/MediaQueriesMixin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import { Container } from "reactstrap";
import { ButtonStyledLink } from './GlobalStyledComponents/ReversimStyledComps';

import logoImg from "../images/SVG/logo.svg";
import backgroundImg from "../images/home-reg-bg.png";


library.add(faMapMarkerAlt, faCalendarAlt);

//styled-components components

const StyledSection = styled.section`
  ${({ theme: { color } }) =>`
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(${backgroundImg}) center white;
      background-size: cover;
      height: 100vh;
      background-color: ${color.background_2};
      border-top: 100px solid ${color.background_2};
  `}
`;

const HeroInner = styled.div`
  ${({ theme: { color }}) =>`
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: ${color.text_1};
    `}

      ${mediaQueryMin.m`
        text-align: left;      
      `}
      
      ${mediaQueryMin.m`
        margin-right: 0;
      `}

      ${mediaQueryMin.l`
        margin-right: -80px;
      `}

      ${mediaQueryMin.xl`
       flex-direction: column;
      `}
`;

const HeroContent = styled.div`
  ${({ theme: { space, color } }) =>`
      display: flex !important;
      flex-direction: column;
      margin-bottom: ${space.xxl} !important;
      background-color: ${color.background_2} !important;
      box-shadow: 0 0 30px 15px ${color.box_shadow_1};
  `}
`;

const LogoImg = styled.img`
  width: 250px;

  ${mediaQueryMin.xs`
    width: 350px;
  `}
  ${mediaQueryMin.m`
    width: 400px;
  `}
`;

const Subtitle = styled.div`
  ${({ theme: { space } }) =>`
    flex-direction: column;
    margin-top: ${space.xl};
  `}

  ${mediaQueryMin.m`
    ${({ theme: { font, space } }) =>`
    letter-spacing: 0.6px;
    font-size: ${font.size_md};
    font-weight: 400;
    background-color: #451deb;
    
    padding: ${space.m};
    display: flex;
    justify-content: space-between;
  `}`};
`;

const IconAligner = styled.div`
  ${({ theme: { space } }) =>`
    width: max-content;
    display: flex;
    justify-content: space-between;
    margin: 0 ${space.m} !important;

    svg {
    margin-right: 10px
    }
  `};
`;

const ButtonContainer = styled.div`
  ${({ theme: { space } }) => `
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${space.xl};
  `}

  ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
    flex-direction: row;
    justify-content: space-around;
    margin-right: ${space.m};
    padding-top: ${space.xl};
  `}`};
`;

const VoteContainer = styled(ButtonContainer)`
  ${({ theme: { space } }) => `
    margin-top: calc(-3 * ${space.m});
    padding-top: calc(6 * ${space.m});
  `}

    ${mediaQueryMin.m`
    ${({ theme: { space } }) => `
      margin-top: ${space.xl};
      padding-top: calc(6 * ${space.m});
    `}`}
`;

// React components

const Hero = ({ eventConfig }) => (
  <StyledSection>
    <Container>
      <HeroInner>
        <HeroContent>
          <LogoImg src={logoImg} alt="rs19" />

          <Subtitle>
            <IconAligner>
              <FontAwesomeIcon icon="calendar-alt" />
              16-17.6.2019
            </IconAligner>
            <IconAligner>
              <FontAwesomeIcon icon="map-marker-alt" />
              TLV Convention center
            </IconAligner>
          </Subtitle>

          {eventConfig.voting && (
            <VoteContainer>
              <ButtonStyledLink href="/proposals">
                {"VOTE FOR SESSIONS"}
              </ButtonStyledLink>
            </VoteContainer>
          )}

          <ButtonContainer>
            <ButtonStyledLink href="https://ti.to/reversim-summit/2019">
              {"Get Tickets"}
            </ButtonStyledLink>
            <ButtonStyledLink href="/agenda">
              {"View Agenda"}
            </ButtonStyledLink>
          </ButtonContainer>
        </HeroContent>
      </HeroInner>
    </Container>
  </StyledSection>
);

export default Hero;
